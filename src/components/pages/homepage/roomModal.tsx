import React, {ReactNode} from 'react';
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getPictureObject} from '../../../tools/images';
import {COLORS_STUDYBOX} from '../../elements/colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBookmark as faBookmark} from '@fortawesome/free-regular-svg-icons';
import {
  faBookmark as fasBookmark,
  faMap,
} from '@fortawesome/free-solid-svg-icons';
import {addFavorite, getFavorites, removeFavorite} from '../../api/favorites';
import getDirections from 'react-native-google-maps-directions';
import {
  getReservations,
  getSeatAvailibility,
  noteRoom,
  openLocker,
} from '../../api/booking';
import StarSVG from '../../../assets/svg/star.svg';
import {BasicInfo} from './roomModalComponents';
import moment from 'moment';
import CalendarStrip from 'react-native-calendar-strip';
import {style} from './room/roomStyle';
import Unlock from '../../../assets/svg/unlocked.svg';
import {BasicIcon} from '../../elements/button';

export class RoomModal extends React.Component<Props> {
  state = {
    favorite: this.props.favorite ? this.props.favorite : false,
    reservations: [{}],
    reservationsNote: [{}],
    canRate: false,
    selectedDate: {
      date: 0,
      seatsAvailable: [],
    },
  };

  style = StyleSheet.create({
    container: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modal: {
      backgroundColor: COLORS_STUDYBOX.BG_WHITE,
      width: '80%',
      height: '98%',
    },
    roomImageContainer: {
      backgroundColor: COLORS_STUDYBOX.DARK_WHITE,
      width: '100%',
      height: '30%',
    },
    roomImage: {
      width: '100%',
      height: '100%',
    },
    roomInfoContainer: {
      backgroundColor: COLORS_STUDYBOX.BG_WHITE,
      width: '100%',
      height: '15%',
    },
    roomInfoNameContainer: {
      marginLeft: '10%',
      marginTop: '2%',
      height: '50%',
    },
    roomInfoName: {
      fontSize: 18,
      fontFamily: 'RopaSans-Regular',
    },
    roomInfoDesc: {
      fontSize: 12,
      fontFamily: 'RopaSans-Regular',
    },
    roomInfoNotesContainer: {
      flexDirection: 'row',
    },
    roomInfoNotesFeedbacks: {
      marginLeft: '10%',
      flexDirection: 'row',
    },
    roomBooking: {
      width: '100%',
      height: '70%',
    },
    roomSeparator: {
      height: 1,
      backgroundColor: '#EEF0F1',
    },
    roomBookingButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignSelf: 'center',
      marginVertical: '5%',
      height: '10%',
      width: '75%',
    },
    roomInfoPriceContainer: {
      flexDirection: 'row',
    },
    price: {
      right: 70,
      fontFamily: 'RopaSans-Regular',
    },
  });

  goToRoom() {
    const data = {
      destination: {
        latitude: this.props.user.latitude,
        longitude: this.props.user.longitude,
      },
      params: [
        {
          key: 'travelmode',
          value: 'walking',
        },
      ],
    };
    getDirections(data);
  }

  InfoButton = (props: any) => {
    const styleButton = StyleSheet.create({
      container: {
        backgroundColor: COLORS_STUDYBOX.BG_GREY,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
      },
      text: {
        alignSelf: 'auto',
        fontFamily: 'RopaSans-Regular',
      },
    });

    return (
      <View>
        <TouchableOpacity
          style={styleButton.container}
          onPress={() => {
            if (props.text === 'Favoris') {
              if (this.state.favorite) {
                removeFavorite(this.props.room.id).then(() =>
                  this.setState({favorite: false}),
                );
              } else {
                addFavorite(this.props.room.id).then(() =>
                  this.setState({favorite: true}),
                );
              }
            } else if (props.text === 'Itinéraire') {
              this.goToRoom();
            }
          }}>
          <FontAwesomeIcon
            icon={props.icon}
            size={20}
            color={COLORS_STUDYBOX.BLUE_FOOTER}
          />
        </TouchableOpacity>
        <Text style={styleButton.text}>{props.text}</Text>
      </View>
    );
  };

  checkReservations() {
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
  }

  async prepareRoomNote() {
    this.state.reservations = await getReservations();
    this.state.reservationsNote = this.state.reservations.filter(
      (res: any) =>
        res.has_noted === false && this.props.room.id === res.room_id.id,
    );
    if (this.state.reservationsNote.length > 0) {
      this.setState({canRate: true});
    }
  }

  StarComponent = (props: any) => {
    return (
      <TouchableOpacity
        onPress={() =>
          noteRoom(
            this.props.room.id,
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
          height={20}
          width={20}
          fill={COLORS_STUDYBOX.STUDYBOX_YELLOW}
        />
      </TouchableOpacity>
    );
  };

  async checkRoomAvailibility(bookingDate: number) {
    this.state.selectedDate.seatsAvailable = await getSeatAvailibility(
      this.props.room.id,
      bookingDate,
    );

    this.forceUpdate();
  }

  Calendar = () => {
    const styles = StyleSheet.create({
      container: {width: '90%', minHeight: 100, alignSelf: 'center'},
      calendar: {height: 100, paddingTop: 20},
    });

    // Change Calendar Language to French
    moment.locale('fr');

    return (
      <View style={styles.container}>
        <CalendarStrip
          scrollable
          style={styles.calendar}
          daySelectionAnimation={{
            type: 'border',
            duration: 200,
            borderWidth: 1,
            borderHighlightColor: 'black',
          }}
          selectedDate={new Date()}
          onDateSelected={(date: any) => {
            console.log(date);
            console.debug(new Date(date).getDate());

            this.state.selectedDate.date = new Date(
              this.state.selectedDate.date,
            ).setDate(new Date(date).getDate());

            this.checkRoomAvailibility(date);
          }}
        />
      </View>
    );
  };

  async checkFavorites() {
    const favorites: Array<Object> = await getFavorites();
    for (const room of favorites) {
      if (room.id === this.props?.room?.id) {
        console.log(room.id, this.props.room.id);
        this.setState({favorite: true});
        break;
      }
    }
  }

  BasicInfoStyle = StyleSheet.create({
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
      bottom: 0,
      right: '2%',
    },
  });

  componentDidMount() {
    this.checkFavorites();
    this.prepareRoomNote().then(() => this.checkReservations());
    this.state.selectedDate.date = Date.now();
    this.checkRoomAvailibility(this.state.selectedDate.date);
  }

  render(): ReactNode {
    return (
      <View style={this.style.container}>
        <View style={this.style.modal}>
          <View style={this.style.roomImageContainer}>
            <Image
              style={this.style.roomImage}
              resizeMode="cover"
              source={
                this.props?.room?.image?.hash
                  ? {uri: getPictureObject(this.props.room.image.hash)}
                  : require('../../../assets/img/NoPicture.png')
              }
            />
            {(__DEV__ ? true : this.state.canOpen) ? (
              <BasicIcon
                Icon={Unlock}
                size={24}
                style={this.BasicInfoStyle.icon}
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
          <View style={this.style.roomInfoContainer}>
            <View style={this.style.roomInfoNameContainer}>
              <Text style={this.style.roomInfoName}>
                {this.props?.room?.name}
              </Text>
              <Text style={this.style.roomInfoDesc}>
                {this.props?.room?.desc}
              </Text>
            </View>
            <View style={this.style.roomInfoPriceContainer}>
              <BasicInfo
                name={this.props.room.name}
                score={this.props.room.score}
                noted={this.props.room.nb_note}
              />
              <Text style={this.style.price}>
                Prix: {this.props.room.price * 100}c
              </Text>
            </View>
          </View>
          <View style={this.style.roomSeparator} />
          <View style={this.style.roomBooking}>
            <View style={this.style.roomBookingButtons}>
              <this.InfoButton icon={faMap} text="Itinéraire" />
              {this.state.favorite ? (
                <this.InfoButton icon={fasBookmark} text="Favoris" />
              ) : (
                <this.InfoButton icon={faBookmark} text="Favoris" />
              )}
            </View>
            <this.Calendar />
            <Button
              title="Réserver"
              onPress={() =>
                this.props.navigation.navigate('BookingScreen', {
                  room: this.props.room,
                  selectedDate: this.state.selectedDate,
                })
              }
              color={COLORS_STUDYBOX.STUDYBOX_BLUE}
            />
            {this.state.canRate ? (
              <View style={style.notationContainer}>
                <View style={style.textContainer}>
                  <Text style={style.text}>
                    Souhaitez-vous noter la salle ?
                  </Text>
                </View>
                <View style={style.starContainer}>
                  <this.StarComponent starNumber={1} />
                  <this.StarComponent starNumber={2} />
                  <this.StarComponent starNumber={3} />
                  <this.StarComponent starNumber={4} />
                  <this.StarComponent starNumber={5} />
                </View>
              </View>
            ) : (
              <TouchableOpacity />
            )}
          </View>
        </View>
      </View>
    );
  }
}
