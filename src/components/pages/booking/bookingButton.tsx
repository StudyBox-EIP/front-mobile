import React from 'react';
import {Button, View} from 'react-native';
import {COLORS_STUDYBOX} from '../../elements/colors';
import {bookingStyle} from './style';

export class BookingButton extends React.Component<Props> {
  state = {
    title: '',
    buttonColor: COLORS_STUDYBOX.GREY,
    slotDateStart: 0,
    slotDateEnd: 0,
    isOutdated: false,
  };

  componentDidMount() {
    this.state.title = this.props.title;
    this.setState({title: this.state.title});
    this.state.slotDateStart = new Date(
      new Date(Date.now()).setHours(
        parseInt(this.state.title.split('-')[0], 10),
        0,
        0,
        0,
      ),
    ).getTime();
    this.state.slotDateEnd = new Date(Date.now()).setUTCHours(
      parseInt(this.state.title.split('-')[1], 10),
      0,
      0,
      0,
    );
    this.state.isOutdated = Date.now() - this.state.slotDateStart > 0;
  }

  render() {
    return (
      <View style={bookingStyle.ButtonList} key={this.state.title}>
        <Button
          title={this.state.title}
          color={this.state.buttonColor}
          onPress={() => {
            this.setState({
              buttonColor:
                this.state.buttonColor === COLORS_STUDYBOX.GREEN
                  ? COLORS_STUDYBOX.GREY
                  : COLORS_STUDYBOX.GREEN,
            });
            this.props.callback([
              this.state.slotDateStart,
              this.state.slotDateEnd,
            ]);
          }}
          disabled={__DEV__ ? false : this.state.isOutdated}
        />
      </View>
    );
  }
}
