import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const HomePageScreenStyle = StyleSheet.create({
  base: {
    flex: 1,
    alignItems: 'center',
  },
});

const cardStyle = StyleSheet.create({
  container: {
    width: 300,
    height: 250,
    color: '#737373',
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'grey',
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    shadowColor: '#000',
    elevation: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  imageCover: {
    flex: 0.8,
    position: 'absolute',
    alignSelf: 'baseline',
    width: 250,
    height: 200,
  },
  title: {
    position: 'absolute',
    alignSelf: 'baseline',
    bottom: 25,
    left: 25,
  },
});

const Card = (props: any) => {
  return (
    <SafeAreaView style={cardStyle.container}>
      <Text style={cardStyle.title}>{props.title}</Text>
      {/* <Button title={props.title} onPress={() => {}}></Button> */}
      <Image
        style={cardStyle.imageCover}
        source={{
          uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
        }}
      />
    </SafeAreaView>
  );
};

export class HomePageScreen extends React.Component {
  render() {
    return (
      <View style={HomePageScreenStyle.base}>
        <Card title="1ère vignette" />
      </View>
    );
  }
}
