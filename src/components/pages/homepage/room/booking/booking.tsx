import React from 'react';
import {Alert, Text, TextInput, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import PageHeader from '../../../../elements/controllers/pageHeader';
import BackButton from '../../../../../assets/svg/angle-left-solid.svg';
import {getData} from '../../../../api/userInfo';
import BasicButton from '../../../../elements/button';
import {makeBooking} from '../../../../api/booking';
import {bookingStyle} from './style';
import {BookingButton} from './bookingButton';

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
    slotDateStart: 0,
    slotDateEnd: 0,
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
    this.setState({cardExp: __DEV__ ? '12/30' : ''});

    if (__DEV__) {
      this.state.paymentInfo.number = 4242424242424242;
      this.state.paymentInfo.exp_month = 12;
      this.state.paymentInfo.exp_year = 30;
      this.state.paymentInfo.cvc = 333;
    }
  }

  componentDidMount() {
    this.updateBookingInfo();
  }

  BookingSelector = () => {
    return (
      <View style={bookingStyle.bookingSelector}>
        <Text style={bookingStyle.title}>Choisissez votre plage horaire</Text>
        <ScrollView style={bookingStyle.ButtonList}>
          {this.state.params.open_hours.map((slot: string) => {
            return (
              <BookingButton
                title={slot}
                key={slot}
                callback={(newDate: Array<number>) => {
                  [this.state.slotDateStart, this.state.slotDateEnd] = newDate;
                }}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  };

  BankingSetting = () => {
    return (
      <View style={bookingStyle.cardInfoContainer}>
        <Text style={bookingStyle.title}>Information Banquaire</Text>
        <TextInput
          placeholder="Numéro de Carte"
          defaultValue={__DEV__ ? '4242424242424242' : ''}
          style={bookingStyle.cardInputLarge}
          onChangeText={newText => {
            this.state.paymentInfo.number = parseInt(newText, 10);
          }}
        />
        <View style={bookingStyle.zoneInput}>
          <TextInput
            placeholder="MM/YY"
            style={bookingStyle.cardInputSmall}
            maxLength={7}
            onChangeText={cardExp => {
              if (cardExp.length === 2) {
                cardExp += '/';
              } else if (cardExp.length === 3) {
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
            defaultValue={__DEV__ ? '777' : ''}
            style={bookingStyle.cardInputSmall}
            onChangeText={newText =>
              (this.state.paymentInfo.cvc = parseInt(newText, 10))
            }
          />
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={bookingStyle.back}>
        <PageHeader
          headerText="Réservation"
          callback={() => this.props.navigation?.goBack()}
          icon={BackButton}
          linePercentage="55%"
        />
        <View style={bookingStyle.base}>
          <this.BankingSetting />
          <this.BookingSelector />
          <BasicButton
            style={bookingStyle.BookingButton}
            txt="Confirmer la Réservation"
            callback={async () => {
              const paymentStatus: boolean = await makeBooking(
                {
                  room_id: this.state.bookingInfo.room_id,
                  date_start: this.state.slotDateStart,
                  date_end: this.state.slotDateEnd,
                  price: this.state.bookingInfo.price * 100,
                  number_seats: 1,
                  user_id: this.state.bookingInfo.user_id,
                },
                this.state.paymentInfo,
              );
              if (paymentStatus === true) {
                this.props.navigation.navigate('HomePageScreen');
              } else {
                Alert.alert('Paiement Refusé');
              }
            }}
          />
        </View>
      </View>
    );
  }
}
