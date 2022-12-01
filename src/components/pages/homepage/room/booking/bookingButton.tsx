import React from 'react';
import {Button, View} from 'react-native';
import {COLORS_STUDYBOX} from '../../../../elements/colors';
import {bookingStyle} from './style';

export class BookingButton extends React.Component {
  state = {
    title: '',
    seats_total: 0,
    buttonColor: COLORS_STUDYBOX.STUDYBOX_BLACK,
    slotDateStart: 0,
    slotDateEnd: 0,
    isOutdated: false,
  };

  componentDidUpdate() {
    if (
      this.props?.seatsAvailable?.hour_start !== undefined &&
      this.state.slotDateStart !==
        new Date(this.props.seatsAvailable.hour_start).getTime()
    ) {
      this.setState({
        slotDateStart: new Date(
          this.props?.seatsAvailable?.hour_start,
        ).getTime(),
      });
    }

    if (
      this.props?.seatsAvailable?.hour_end !== undefined &&
      this.state.slotDateEnd !==
        new Date(this.props.seatsAvailable.hour_end).getTime()
    ) {
      this.setState({
        slotDateEnd: new Date(this.props?.seatsAvailable?.hour_end).getTime(),
      });
    }

    if (
      !this.state.isOutdated &&
      this.props.seatsAvailable?.avaible_seat <= 0
    ) {
      this.setState({isOutdated: true});
    }
  }

  componentDidMount() {
    this.state.title = this.props.title.hour_start.split('T')[1].split('.')[0];
    this.setState({seats_total: this.props.seats_total});
    this.setState({title: this.state.title});
    this.state.slotDateStart = new Date(
      this.props?.seatsAvailable?.hour_start,
    ).getTime();
    this.state.slotDateEnd = new Date(
      this.props?.seatsAvailable?.hour_end,
    ).getTime();
    this.state.isOutdated =
      new Date(Date.now()).setHours(new Date().getHours() + 2) -
        this.state.slotDateStart >
      0;
    console.log(
      new Date(Date.now()).setHours(new Date().getHours() + 2),
      this.state.slotDateStart,
      new Date(Date.now()).setHours(new Date().getHours() + 2) -
        this.state.slotDateStart,
    );
  }

  render() {
    return (
      <View style={bookingStyle.buttonTime} key={this.state.title}>
        <Button
          title={`${this.state.title}  -  ${this.props.seatsAvailable?.avaible_seat}/${this.state.seats_total}`}
          color={this.state.buttonColor}
          onPress={() => {
            this.setState({
              buttonColor:
                this.state.buttonColor === COLORS_STUDYBOX.STUDYBOX_GREEN
                  ? COLORS_STUDYBOX.STUDYBOX_BLACK
                  : COLORS_STUDYBOX.STUDYBOX_GREEN,
            });
            this.props.callback([
              this.state.slotDateStart,
              this.state.slotDateEnd,
            ]);
          }}
          disabled={this.state.isOutdated}
        />
      </View>
    );
  }
}
