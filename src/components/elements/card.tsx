import React from 'react';
import { Pressable, StyleSheet, Text, Image, View } from 'react-native';
import { getPictureObject } from '../../tools/images';

export default RoomCard;

function RoomCard(props: any) {
  const cardStyle = StyleSheet.create({
    container: {
      width: '85%',
      height: 250,
      color: '#737373',
      alignItems: 'center',
      backgroundColor: 'grey',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.1,
      shadowRadius: 1,
      shadowColor: '#000',
      elevation: 8,
      borderTopLeftRadius: 10,
      borderBottomRightRadius: 10,
      marginVertical: 10,
    },
    imageCover: {
      flex: 0.8,
      position: 'absolute',
      alignSelf: 'baseline',
      width: 250,
      height: 200,
      borderTopLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
    title: {
      position: 'absolute',
      alignSelf: 'baseline',
      bottom: 15,
      left: 25,
      fontSize: 20,
    },
  });
  const picture = getPictureObject(props.image);

  return (
      <Pressable
        style={cardStyle.container}
        onPress={() => {
          props.navigation.navigate('RoomScreen', {
            name: props.title,
            desc: props.desc,
            adress: props.adress,
            score: props.score,
            latitude: props.latitude,
            longitude: props.longitude,
            pic: picture,
          });
        }}>
        <Text style={cardStyle.title}>{props.title}</Text>
        <Image style={cardStyle.imageCover} resizeMode="cover" source={picture} />
      </Pressable>
  );
};