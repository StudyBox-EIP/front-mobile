import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function InfoCardPrice(props: any) {
  const style = StyleSheet.create({
    container: {
      flexDirection: 'column',
      backgroundColor: 'white',
      width: '100%',
      marginVertical: 8,
      paddingVertical: 8,
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
      fontSize: 18,
      textDecorationLine: 'underline',
      paddingBottom: 4,
    },
    subtitle: {
      fontSize: 14,
      textDecorationLine: 'underline',
    },
    txt: {
      fontSize: 12,
    },
    info: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    price: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

  const container =
    props.style == null
      ? StyleSheet.compose(props.style, style.container)
      : style.container;
  return (
    <View style={container}>
      <Text style={style.title}>{props.room}</Text>
      <View style={style.info}>
        <Text style={style.subtitle}>Réservation:</Text>
        <Text style={style.txt}>
          {' '}
          {props.time} - {props.date}
        </Text>
      </View>
      <View style={style.info}>
        <Text style={style.subtitle}>Adresse:</Text>
        <Text style={style.txt}> {props.adresse}</Text>
      </View>
      <View style={style.price}>
        <Text style={style.subtitle}>Prix:</Text>
        <Text style={style.txt}> {props.price}€</Text>
      </View>
    </View>
  );
}

export default InfoCardPrice;
