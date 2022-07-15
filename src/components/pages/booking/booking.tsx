import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import PageHeader from '../../elements/controllers/pageHeader';
import BackButton from '../../../assets/svg/angle-left-solid.svg';
import {getData} from '../../api/userInfo';
import BasicButton from '../../elements/button';
import {makeBooking} from '../../api/booking';

const bookingStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  BookingButton: {
    width: '50%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  ButtonList: {
    margin: 10,
  },
  cardInput: {
    borderWidth: 1,
    borderColor: 'grey',
    minWidth: 100,
    borderRadius: 10,
  },
  bookingSelector: {
    alignItems: 'center',
  },
  cardInfoContainer: {
    width: '80%',
    alignSelf: 'center',
  },
  cardInfoDate: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export class BookingScreen extends React.Component<Props> {
  state = {
    params: this.props.route.params,
    bookingInfo: {
      user_id: 0,
      room_id: 0,
      number_seats: 1,
      price: 0,
    },
    paymentInfo: {
      number: 0,
      cvc: 0,
      exp_month: 0,
      exp_year: 0,
    },
    cardExp: '',
  };

  async updateBookingInfo() {
    const rawUserInfo = await getData('userInfo');
    if (rawUserInfo === undefined || rawUserInfo === null) {
      throw 'userInfo not found';
    }
    const userInfo = JSON.parse(rawUserInfo);

    this.state.bookingInfo.user_id = userInfo.id;
    this.state.bookingInfo.room_id = this.state.params.id;
    this.state.bookingInfo.price = this.state.params.price;
  }

  componentDidMount() {
    this.updateBookingInfo();
  }

  BookingSelector = () => {
    return (
      <View style={bookingStyle.bookingSelector}>
        <Text>Choisissez votre plage horaire</Text>
        <ScrollView style={bookingStyle.ButtonList}>
          {this.state.params.open_hours.map((slot: string) => {
            const slotDateStart: number = new Date(Date.now()).setUTCHours(
              parseInt(slot.split('-')[0], 10),
            );
            const slotDateEnd: number = new Date(Date.now()).setUTCHours(
              parseInt(slot.split('-')[1], 10),
            );
            const isOutdated: boolean = Date.now() - slotDateStart > 0;

            return (
              <View style={bookingStyle.ButtonList} key={slot}>
                <Button
                  title={slot}
                  onPress={() =>
                    makeBooking(
                      {
                        room_id: this.state.bookingInfo.room_id,
                        date_start: slotDateStart,
                        date_end: slotDateEnd,
                        price: this.state.bookingInfo.price * 100,
                        number_seats: 1,
                        user_id: this.state.bookingInfo.user_id,
                      },
                      this.state.paymentInfo,
                    )
                  }
                  disabled={__DEV__ ? false : isOutdated}
                />
              </View>
            );
          })}
          {/* <Button title='' onPress={() => undefined} /> */}
        </ScrollView>
      </View>
    );
  };

  render() {
    return (
      <View style={bookingStyle.mainContainer}>
        <PageHeader
          headerText="Réservation"
          callback={() => this.props.navigation?.goBack()}
          icon={BackButton}
          linePercentage="55%"
        />
        <this.BookingSelector />
        <View style={bookingStyle.cardInfoContainer}>
          <TextInput
            style={bookingStyle.cardInput}
            placeholder="Numéro de Carte"
            onChangeText={newText => {
              this.state.paymentInfo.number = parseInt(newText, 10);
            }}
          />
          <View style={bookingStyle.cardInfoDate}>
            <TextInput
              placeholder="MM / YY"
              style={bookingStyle.cardInput}
              maxLength={7}
              onChangeText={cardExp => {
                if (cardExp.length === 2) {
                  cardExp += ' / ';
                } else if (cardExp.length === 4) {
                  cardExp = cardExp.substring(0, cardExp.length - 2);
                }
                this.setState({cardExp});
                this.state.paymentInfo.exp_month = parseInt(
                  cardExp.split('/')[0],
                  10,
                );
                this.state.paymentInfo.exp_year = parseInt(
                  cardExp.split('/')[1],
                  10,
                );
              }}
              value={this.state.cardExp}
            />
            <TextInput
              placeholder="CVC"
              style={bookingStyle.cardInput}
              onChangeText={newText =>
                (this.state.paymentInfo.cvc = parseInt(newText, 10))
              }
            />
          </View>
        </View>
        <View style={bookingStyle.BookingButton}>
          <BasicButton
            style={bookingStyle.BookingButton}
            // callback={() => makeBooking(this.state.bookingInfo)}
            callback={() => this.props.navigation.navigate('PaymentScreen')}
            txt="Confirmer la Réservation"
          />
        </View>
      </View>
    );
  }
}
