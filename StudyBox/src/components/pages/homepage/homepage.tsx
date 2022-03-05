import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomHomePageController } from '../../elements/controllers/homePageController';

const HomePageScreenStyle = StyleSheet.create({
  base: {
    flex: 1,
    alignItems: 'center',
  },
  cardContainer: {
    width: '100%',
    marginBottom: '20%',
  },
  cardContentContainer: {
    alignItems: 'center',
  },
});

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
    elevation: 2,
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

const Card = (props: any) => {
  return (
    <Pressable
      style={cardStyle.container}
      onPress={() => {
        console.log('Join: ' + props.title);
        props.navigation.navigate('RoomScreen', { name: props.title });
      }}>
      <Text style={cardStyle.title}>{props.title}</Text>
      <Image
        style={cardStyle.imageCover}
        resizeMode="cover"
        source={
          props.image === undefined
            ? require('../../../assets/img/NoPicture.png')
            : { uri: props.image }
        }
      />
    </Pressable>
  );
};

export class HomePageScreen extends React.Component<Props> {
  render() {
    const rooms: Array<Any> = [
      { title: 'A', image: 'https://pbs.twimg.com/media/FLvY4QWaIAEJUAV.jpg' },
      { title: 'B', image: undefined },
      { title: 'C', image: undefined },
      { title: 'C', image: undefined },
    ];

    return (
      <View style={HomePageScreenStyle.base}>
        <ScrollView
          style={HomePageScreenStyle.cardContainer}
          contentContainerStyle={HomePageScreenStyle.cardContentContainer}
          showsVerticalScrollIndicator={false}>
          {rooms.map((val, key) => {
            return (
              <Card
                key={key}
                title={val.title}
                image={val.image}
                navigation={this.props.navigation}
              />
            );
          })}
        </ScrollView>
        <BottomHomePageController navigation={this.props.navigation} />
      </View>
    );
  }
}
