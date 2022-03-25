import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {BottomHomePageController} from '../../elements/controllers/homePageController';
import {getPictureObject} from '../../../tools/images';

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
  const picture = getPictureObject(props.image);
  return (
    <Pressable
      style={cardStyle.container}
      onPress={() => {
        console.log('Join: ' + props.title);
        props.navigation.navigate('RoomScreen', {
          name: props.title,
          desc: props.desc,
          adress: props.adress,
          score: props.score,
          pic: picture,
        });
      }}>
      <Text style={cardStyle.title}>{props.title}</Text>
      <Image style={cardStyle.imageCover} resizeMode="cover" source={picture} />
    </Pressable>
  );
};

export class HomePageScreen extends React.Component<Props> {
  render() {
    const rooms: Array<Any> = [
      {
        title: 'Université Bordeaux',
        desc: 'Hello this is the place',
        adress: '25 rue Victor Hugo, Bordeaux',
        score: 3.4,
        image:
          'https://i.f1g.fr/media/eidos/805x453_crop/2020/02/05/XVMfe599c10-3219-11ea-84ed-e882884db677.jpg',
      },
      {
        title: 'Uni',
        desc: 'Hello this is the place',
        adress: '25 rue Victor Hugo, Bordeaux',
        score: 3.1,
        image: undefined,
      },
      {
        title:
          'Université Bordeaux Montesquieux Université Bordeaux Montesquieux',
        desc: 'Hello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the placeHello this is the place',
        adress: '25 rue Victor Hugo, Bordeaux',
        score: 5,
        image: 'https://pbs.twimg.com/media/FLvY4QWaIAEJUAV.jpg',
      },
      {
        title: 'C',
        desc: 'Hello this is the place',
        adress: '25 rue Victor Hugo, Bordeaux',
        score: 0,
        image: undefined,
      },
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
                desc={val.desc}
                adress={val.adress}
                score={val.score}
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
