import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import getDirections from 'react-native-google-maps-directions';
import BasicButton from '../../../elements/button';
import {COLORS_STUDYBOX} from '../../..//elements/colors';

const scoreMax = 5;

const RoomScreenStyle = StyleSheet.create({
  base: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  cardContentContainer: {
    alignItems: 'center',
  },
  subtitle: {
    textAlign: 'left',
    fontSize: 20,
  },
  txt: {
    textAlign: 'left',
    fontSize: 12,
    marginBottom: 12,
  },
  imageCover: {
    width: '100%',
    height: '30%',
    resizeMode: 'contain',
    backgroundColor: 'grey',
    flex: 1.5,
  },
  cardContainer: {
    borderTopColor: COLORS_STUDYBOX.GREEN,
    borderTopWidth: 3,
    width: '100%',
    paddingBottom: 80,
    flex: 10,
  },
  button: {
    flex: 0.8,
  },
});

const BasicInfoStyle = StyleSheet.create({
  base: {
    marginBottom: 24,
    width: '100%',
    height: '12%',
    alignItems: 'center',
    paddingVertical: 8,
  },
  title: {
    fontSize: 35,
    textAlign: 'center',
    marginHorizontal: 4,
    marginVertical: 2,
  },
  score: {
    fontSize: 12,
    marginVertical: 2,
    padding: 2,
  },
});

const BasicInfo = (props: any) => {
  return (
    <View style={BasicInfoStyle.base}>
      <Text style={BasicInfoStyle.title} adjustsFontSizeToFit>
        {props.name}
      </Text>
      <Text style={BasicInfoStyle.score} adjustsFontSizeToFit>
        Score: {props.score}/{scoreMax}
      </Text>
    </View>
  );
};

export class RoomScreen extends React.Component<Props> {
  goToRoom = () => {
    const data = {
      destination: {
        latitude: this.props.route.params.latitude,
        longitude: this.props.route.params.longitude,
      },
      params: [
        {
          key: 'travelmode',
          value: 'walking',
        },
      ],
    };
    getDirections(data);
  };

  render(): React.ReactNode {
    let props: any = this.props.route.params;
    return (
      <View style={RoomScreenStyle.base}>
        <Image style={RoomScreenStyle.imageCover} source={props.pic} />
        <BasicInfo name={props.name} score={props.score} />
        <ScrollView
          style={RoomScreenStyle.cardContainer}
          contentContainerStyle={RoomScreenStyle.cardContentContainer}
          showsVerticalScrollIndicator={true}>
          <Text style={RoomScreenStyle.subtitle}>Descritpion:</Text>
          <Text style={RoomScreenStyle.txt}>{props.desc}</Text>
          <Text style={RoomScreenStyle.subtitle}>Adresse:</Text>
          <Text style={RoomScreenStyle.txt}>{props.adress}</Text>
        </ScrollView>
        <BasicButton
          style={RoomScreenStyle.button}
          callback={() =>
            this.props.navigation.navigate('BookingScreen', props)
          }
          txt="Réserver"
        />
        <BasicButton
          style={RoomScreenStyle.button}
          callback={this.goToRoom}
          txt="En route !"
        />
      </View>
    );
  }
}
