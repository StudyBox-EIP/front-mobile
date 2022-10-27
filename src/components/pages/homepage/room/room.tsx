import React from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import getDirections from 'react-native-google-maps-directions';
import {BasicButton, BasicIcon} from '../../../elements/button';
import {COLORS_STUDYBOX} from '../../..//elements/colors';
import {getReservations, noteRoom} from '../../../api/booking';
import StarSVG from '../../../../assets/svg/star.svg';
import {style} from './roomStyle';
import Unlock from '../../../../assets/svg/unlocked.svg';
import {openLocker} from '../../../api/booking';

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
    borderTopColor: COLORS_STUDYBOX.STUDYBOX_GREEN,
    borderTopWidth: 3,
    width: '100%',
    paddingBottom: 80,
    flex: 10,
  },
  button: {},
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
  icon: {
    position: 'absolute',
    top: '20%',
    right: '15%',
  },
});

const BasicInfo = (props: any) => {
  const basicStyle = StyleSheet.create({
    basicContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    starBarHider: {
      position: 'absolute',
      backgroundColor: COLORS_STUDYBOX.DARK_WHITE,
      width: (5 - props.score) * 15,
      height: 15,
      right: 0,
    },
  });

  return (
    <View style={BasicInfoStyle.base}>
      <Text style={BasicInfoStyle.title} adjustsFontSizeToFit>
        {props.name}
      </Text>
      <View style={basicStyle.basicContainer}>
        <Text style={BasicInfoStyle.score} adjustsFontSizeToFit>
          Score: {props.score}/{scoreMax}
        </Text>
        <StarSVG
          height={15}
          width={15}
          fill={COLORS_STUDYBOX.STUDYBOX_YELLOW}
        />
        <StarSVG
          height={15}
          width={15}
          fill={COLORS_STUDYBOX.STUDYBOX_YELLOW}
        />
        <StarSVG
          height={15}
          width={15}
          fill={COLORS_STUDYBOX.STUDYBOX_YELLOW}
        />
        <StarSVG
          height={15}
          width={15}
          fill={COLORS_STUDYBOX.STUDYBOX_YELLOW}
        />
        <StarSVG
          height={15}
          width={15}
          fill={COLORS_STUDYBOX.STUDYBOX_YELLOW}
        />
        <View style={basicStyle.starBarHider} />
      </View>
    </View>
  );
};

export class RoomScreen extends React.Component {
  state = {
    reservations: [{}],
    reservationsNote: [{}],
    canRate: false,
    canOpen: false,
  };

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

  async prepareRoomNote() {
    this.state.reservations = await getReservations();
    this.state.reservationsNote = this.state.reservations.filter(
      (res: any) =>
        res.has_noted === false &&
        this.props.route.params.id === res.room_id.id,
    );
    if (this.state.reservationsNote.length > 0) {
      this.setState({canRate: true});
    }
  }

  componentDidMount() {
    this.prepareRoomNote().then(() => {
      const tempReservations: Array<any> = [];
      this.state.reservations.forEach((res: any) => {
        const dateNow = new Date();

        // Fixing Phone Internal Delay
        dateNow.setHours(dateNow.getHours() + 2);

        if (
          dateNow >= new Date(res.date_start) &&
          dateNow <= new Date(res.date_end)
        ) {
          tempReservations.push(res);
        }
      });

      if (tempReservations.length > 0) {
        this.setState({canOpen: true});
      }

      this.setState({reservations: tempReservations});
    });
  }

  StarComponent = (props: any) => {
    return (
      <TouchableOpacity
        onPress={() =>
          noteRoom(
            this.props.route.params.id,
            this.state.reservationsNote[0].id,
            props.starNumber,
          ).then(() => {
            this.setState({canRate: false});
            Alert.alert(
              'Merci pour votre Avis',
              `Vous avez donné ${props.starNumber} Étoile${
                props.starNumber > 1 ? 's' : ''
              }`,
            );
          })
        }>
        <StarSVG
          height={40}
          width={40}
          fill={COLORS_STUDYBOX.STUDYBOX_YELLOW}
        />
      </TouchableOpacity>
    );
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
          <Text style={RoomScreenStyle.subtitle}>Description:</Text>
          <Text style={RoomScreenStyle.txt}>{props.desc}</Text>
          <Text style={RoomScreenStyle.subtitle}>Adresse:</Text>
          <Text style={RoomScreenStyle.txt}>{props.adress}</Text>
        </ScrollView>
        {this.state.canRate ? (
          <View style={style.notationContainer}>
            <View style={style.starContainer}>
              <this.StarComponent starNumber={1} />
              <this.StarComponent starNumber={2} />
              <this.StarComponent starNumber={3} />
              <this.StarComponent starNumber={4} />
              <this.StarComponent starNumber={5} />
            </View>
            <View style={style.textContainer}>
              <Text style={style.text}>Souhaitez-vous noter la salle ?</Text>
            </View>
          </View>
        ) : (
          <TouchableOpacity />
        )}
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
        {(__DEV__ ? true : this.state.canOpen) ? (
          <BasicIcon
            Icon={Unlock}
            size={24}
            style={BasicInfoStyle.icon}
            callback={() => {
              if (this.state.reservations[0]) {
                console.info(
                  'Opening Door...',
                  this.state.reservations[0].room_id.name,
                );
                openLocker(this.state.reservations[0].id)
                  .then(() =>
                    Alert.alert(
                      'Porte Ouverte',
                      'Porte déverouillée, vous pouvez rentrer !',
                    ),
                  )
                  .catch(errorCode => {
                    if (errorCode === 400) {
                      Alert.alert(
                        'Erreur Salle',
                        'La salle reservée ne possède pas de boîtier',
                      );
                    }
                  });
              } else {
                console.error('No Reservation in range');
              }
            }}
          />
        ) : (
          <TouchableOpacity />
        )}
      </View>
    );
  }
}
