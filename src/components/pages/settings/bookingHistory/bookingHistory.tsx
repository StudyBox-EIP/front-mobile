import React from 'react';
import {View, ScrollView} from 'react-native';
import {getBooking} from '../../../api/booking';
import PageHeader from '../../../elements/controllers/pageHeader';
import BackButton from '../../../../assets/svg/angle-left-solid.svg';
import InfoCardPrice from '../../../elements/infocardprice';
import {historyStyle} from './style';

export class BookingHistory extends React.Component<Props> {
  state = {
    bookingHistory: [],
  };

  componentDidMount() {
    getBooking()
      .then(res => this.setState({bookingHistory: res}))
      .catch(console.error);
  }

  render() {
    var options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    console.log(this.state.bookingHistory);
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
                Number(new Date(b?.date_start)) -
                Number(new Date(a?.date_start)),
            )
            .map((payment: any) => {
              let myDate = new Date(payment?.date_start);
              // console.log(payment);
              return (
                <InfoCardPrice
                  key={payment?.createdAt}
                  time={myDate.toLocaleTimeString()}
                  date={myDate.toLocaleDateString('fr')}
                  room={payment?.room_id.name}
                  adresse={payment?.room_id.address}
                  price={payment?.room_id.price.toFixed(2)}
                />
              );
            })}
        </ScrollView>
      </View>
    );
  }
}
