import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
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
    height: 36,
    bottom: 8,
    left: 4,
    fontSize: 24,
    overflow: 'scroll',
    marginLeft: 4,
    marginTop: 8,
  },
  score: {
    position: 'absolute',
    left: 4,
    top: 4,
    backgroundColor: COLORS_STUDYBOX.LIGHT_BLUE,
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
      fill: COLORS_STUDYBOX.YELLOW,
    },
    text: {
      color: 'white',
      fontSize: 15,
    },
  });

  return (
    <View style={cardStyle.score}>
      <Text style={elements.text}>{props.score}/5</Text>
      <StarIcon
        style={elements.star}
        height={elements.star.size}
        width={elements.star.size}
      />
    </View>
  );
};

function RoomCard(props: any) {
  const smallObject = StyleSheet.create({
    imageCover: {
      position: 'absolute',
      alignSelf: 'baseline',
      width: 250,
      height: 200,
      borderTopLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
    favorite: {
      fill: COLORS_STUDYBOX.CONFIRM_RED,
      position: 'absolute',
      top: 8,
      right: 8,
      size: 32,
      zIndex: -2,
    },
  });
  const picture = getPictureObject(props.image);

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
          price: props.price,
          latitude: props.latitude,
          longitude: props.longitude,
          seats_available: props.seats_available,
          seats_total: props.seats_total,
          open_hours: props.open_hours,
          pic: picture,
        });
      }}>
      <Image style={smallObject.imageCover} source={picture} />
      <Text style={cardStyle.title}>{props.title}</Text>
      <Pressable
        style={smallObject.favorite}
        onPress={() => {
          props.onFavorite(!props.favorite);
          console.log('click', Date.now());
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
      <Score score={props.score} />
    </TouchableOpacity>
  );
}
