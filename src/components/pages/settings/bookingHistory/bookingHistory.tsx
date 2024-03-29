import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {getBooking} from '../../../api/booking';
import PageHeader from '../../../elements/controllers/pageHeader';
import BackButton from '../../../../assets/svg/angle-left-solid.svg';

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
    return (
      <ScrollView>
        <PageHeader
          headerText="Historique de Paiements"
          callback={() => this.props.navigation?.goBack()}
          icon={BackButton}
          linePercentage="90%"
        />
        {this.state.bookingHistory.map(payment => {
          return (
            <View>
              <Text>{JSON.stringify(payment)}</Text>
            </View>
          );
        })}
      </ScrollView>
    );
  }
}
