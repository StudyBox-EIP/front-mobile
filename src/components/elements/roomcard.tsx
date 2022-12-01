import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {getPictureObject} from '../../tools/images';
import {COLORS_STUDYBOX} from '../elements/colors';
import HeartEmptyIcon from '../../assets/svg/heart.svg';
import HeartFullIcon from '../../assets/svg/heart(1).svg';
import StarIcon from '../../assets/svg/star.svg';

export default RoomCard;

const cardStyle = StyleSheet.create({
  container: {
    width: '85%',
    height: 250,
    alignItems: 'center',
    backgroundColor: COLORS_STUDYBOX.DARK_WHITE,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    shadowColor: 'black',
    elevation: 8,
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    position: 'absolute',
    bottom: 2 * Dimensions.get('screen').fontScale,
    left: 4 * Dimensions.get('screen').fontScale,
    fontSize: 16 * Dimensions.get('screen').fontScale,
    overflow: 'scroll',
    marginLeft: 4,
    marginTop: 8,
  },
  score: {
    position: 'absolute',
    left: 4,
    top: 4,
    backgroundColor: COLORS_STUDYBOX.STUDYBOX_BLUE,
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const Score = (props: any) => {
  const elements = StyleSheet.create({
    star: {
      size: 16,
      padding: 2,
      marginLeft: 4,
      fill: COLORS_STUDYBOX.STUDYBOX_YELLOW,
    },
    text: {
      color: 'white',
      fontSize: 15,
    },
  });

  if (props.noted > 0) {
    return (
      <View style={cardStyle.score}>
        <Text style={elements.text}>{props.score + '/5'}</Text>
        <StarIcon
          style={elements.star}
          height={elements.star.size}
          width={elements.star.size}
        />
      </View>
    );
  } else {
    return (
      <View style={cardStyle.score}>
        <Text style={elements.text}>Aucune Note</Text>
      </View>
    );
  }
};

function RoomCard(props: any) {
  const smallObject = StyleSheet.create({
    imageCover: {
      // backgroundColor: COLORS_STUDYBOX.STUDYBOX_BLACK,
      position: 'absolute',
      alignSelf: 'center',
      width: '100%',
      height: 200,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    favorite: {
      fill: COLORS_STUDYBOX.STUDYBOX_GREEN,
      size: 32,
      zIndex: -2,
      position: 'absolute',
      top: 2,
      right: 4,
    },
    favPos: {
      position: 'absolute',
      right: 8,
    },
  });
  const errorPicture = require('../../assets/img/NoPicture.png');
  const picture = getPictureObject(props?.image?.hash);

  return (
    <TouchableOpacity
      style={cardStyle.container}
      onPress={() => {
        props.navigation.navigate('RoomScreen', {
          id: props.id,
          name: props.title,
          desc: props.desc,
          adress: props.adress,
          score: props.score,
          nb_note: props.nb_note,
          price: props.price,
          latitude: props.latitude,
          longitude: props.longitude,
          seats_available: props.seats_available,
          seats_total: props.seats_total,
          open_hours: props.open_hours,
          pic: picture === null ? errorPicture : {uri: picture},
        });
      }}>
      <Image
        style={smallObject.imageCover}
        source={picture === null ? errorPicture : {uri: picture}}
      />
      <Text style={cardStyle.title}>{props.title}</Text>
      <Pressable
        style={smallObject.favPos}
        onPress={() => {
          props.onFavorite(!props.favorite);
        }}>
        <HeartEmptyIcon
          style={smallObject.favorite}
          height={smallObject.favorite.size}
          width={smallObject.favorite.size}
        />
        <HeartFullIcon
          opacity={props.favorite ? '100%' : '0'}
          style={smallObject.favorite}
          height={smallObject.favorite.size}
          width={smallObject.favorite.size}
        />
      </Pressable>
      <Score score={props.score} noted={props.nb_note} />
    </TouchableOpacity>
  );
}
