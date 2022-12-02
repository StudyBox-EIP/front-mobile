import React from 'react';
import {View, ScrollView} from 'react-native';
import {getBooking} from '../../../api/booking';
import PageHeader from '../../../elements/controllers/pageHeader';
import BackButton from '../../../../assets/svg/angle-left-solid.svg';
import InfoCardPrice from '../../../elements/infocardprice';
import {historyStyle} from './style';

export class BookingHistory extends React.Component {
  state = {
    bookingHistory: [],
  };

  componentDidMount() {
    getBooking()
      .then(res => this.setState({bookingHistory: res}))
      .catch(console.error);
  }
  days = [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ];
  months = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ];

  render() {
    return (
      <View>
        <PageHeader
          headerText="Historique de Paiements"
          callback={() => this.props.navigation?.goBack()}
          icon={BackButton}
          linePercentage="90%"
        />
        <ScrollView style={historyStyle.view} snapToEnd>
          {this.state.bookingHistory
            .sort(
              (a, b) =>
                Number(new Date(b?.createdAt)) - Number(new Date(a?.createdAt)),
            )
            .map((payment: any) => {
              // Adjust Server Delay
              let hourBegin = new Date(
                new Date(payment?.date_start).setHours(
                  new Date(payment?.date_start).getHours() - 2,
                ),
              );
              let hourFinish = new Date(
                new Date(payment?.date_end).setHours(
                  new Date(payment?.date_end).getHours() - 2,
                ),
              );

              return (
                <InfoCardPrice
                  key={payment?.createdAt}
                  time={
                    hourBegin.getHours() + 'H - ' + hourFinish.getHours() + 'H'
                  }
                  date={
                    this.days[hourBegin.getDay()] +
                    ' ' +
                    hourBegin.getDate() +
                    ' ' +
                    this.months[hourBegin.getMonth()]
                  }
                  room={payment?.room_id.name}
                  desc={payment?.room_id.desc}
                  adresse={payment?.room_id.address}
                  price={payment?.room_id.price.toFixed(2)}
                  image={payment?.room_id.image}
                  info={payment?.room_id}
                  navigation={this.props.navigation}
                  paymentId={payment?.id}
                  date_start={payment?.date_start}
                  updateList={() =>
                    getBooking()
                      .then(res => this.setState({bookingHistory: res}))
                      .catch(console.error)
                  }
                />
              );
            })}
        </ScrollView>
      </View>
    );
  }
}
