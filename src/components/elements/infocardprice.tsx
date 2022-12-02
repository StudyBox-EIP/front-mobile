import React from 'react';
import {StyleSheet, Text, View, Image, Pressable, Alert} from 'react-native';
import {getPictureObject} from '../../tools/images';
import PlusIcon from '../../assets/svg/plus.svg';
import {COLORS_STUDYBOX} from './colors';
import {cancelReservation} from '../api/booking';

function InfoCardPrice(props: any) {
  const style = StyleSheet.create({
    container: {
      flexDirection: 'column',
      backgroundColor: 'white',
      width: '90%',
      marginVertical: 8,
      paddingBottom: 16,
      alignSelf: 'center',
      alignItems: 'center',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.9,
      shadowRadius: 1,
      elevation: 8,
    },
    title: {
      fontSize: 22,
      textDecorationLine: 'underline',
      paddingBottom: 4,
    },
    subtitle: {
      fontSize: 15,
      fontWeight: 'bold',
      marginTop: 8,
      // textDecorationLine: 'underline',
    },
    txt: {
      fontSize: 12,
      textAlign: 'center',
    },
    time: {
      fontSize: 20,
      textAlign: 'center',
    },
    info: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    desc: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 4,
      marginBottom: 8,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    imageCover: {
      // backgroundColor: COLORS_STUDYBOX.STUDYBOX_BLACK,
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      height: 180,
    },
    favorite: {
      fill: COLORS_STUDYBOX.STUDYBOX_GREEN,
      size: 40,
    },
    favPos: {
      position: 'absolute',
      right: 8,
      bottom: 8,
    },
    cancel: {
      fill: COLORS_STUDYBOX.STUDYBOX_RED,
      size: 40,
      transform: [{rotate: '45deg'}],
    },
    cancelPos: {
      position: 'absolute',
      left: 8,
      bottom: 8,
    },
  });

  const errorPicture = require('../../assets/img/NoPicture.png');
  const picture = getPictureObject(props?.image?.hash);
  const container =
    props.style == null
      ? StyleSheet.compose(props.style, style.container)
      : style.container;
  const currentDate = new Date(
    new Date().setHours(new Date().getHours() - 1),
  ).getTime();
  const dateStart = new Date(props.date_start).getTime();

  return (
    <View style={container}>
      <Image
        style={style.imageCover}
        source={picture === null ? errorPicture : {uri: picture}}
      />
      <Text style={style.title}>{props.room}</Text>
      <View style={style.desc}>
        <Text style={style.txt}>{props.desc}</Text>
      </View>
      <View style={style.info}>
        <Text style={style.txt}>{props.date}</Text>
      </View>
      <View style={style.info}>
        <Text style={style.time}>{props.time}</Text>
      </View>
      <View style={style.info}>
        <Text style={style.txt}> {props.adresse}</Text>
      </View>
      <View style={style.info}>
        <Text style={style.subtitle}> {props.price}€</Text>
      </View>
      <Pressable
        style={style.favPos}
        onPress={() => {
          props.navigation.navigate('RoomScreen', {
            id: props.info.id,
            name: props.info.name,
            desc: props.info.desc,
            adress: props.info.adress,
            score: props.info.average,
            nb_note: props.info.nb_note,
            price: props.info.price,
            latitude: props.info.latitude,
            longitude: props.info.longitude,
            seats_available: props.info.seats_available,
            seats_total: props.info.seats_total,
            open_hours: props.info.open_hours,
            pic: picture === null ? errorPicture : {uri: picture},
          });
        }}>
        <PlusIcon
          opacity={'100%'}
          style={style.favorite}
          height={style.favorite.size}
          width={style.favorite.size}
        />
      </Pressable>
      {currentDate - dateStart < 0 ? (
        <Pressable
          style={style.cancelPos}
          onPress={() => {
            Alert.alert(
              'Annulé Réservation',
              'Êtes-vous sure de vouloir annuler votre réservation ?',
              [
                {
                  text: 'Oui',
                  onPress: () =>
                    cancelReservation(props.paymentId)
                      .then(() => {
                        props.updateList();
                        Alert.alert(
                          "Réservation Annulée', 'Votre demande d'annulation a bien été prise en compte",
                        );
                      })
                      .catch((error: string) => Alert.alert('Erreur', error)),
                },
                {
                  text: 'Retour',
                  style: 'cancel',
                },
              ],
            );
          }}>
          <PlusIcon
            style={style.cancel}
            height={style.cancel.size}
            width={style.cancel.size}
          />
        </Pressable>
      ) : (
        <View />
      )}
    </View>
  );
}

export default InfoCardPrice;
