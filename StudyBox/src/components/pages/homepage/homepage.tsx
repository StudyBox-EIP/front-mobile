import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import { BottomHomePageController } from '../../elements/controllers/homePageController';

const HomePageScreenStyle = StyleSheet.create({
  base: {
    flex: 1,
    alignItems: 'center',
  },
  cardContainer: {
    width: '100%',
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

const pageBottomMargin = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: 75,
    bottom: 0,
  },
});

const pageController = StyleSheet.create({
  container: {
    paddingHorizontal: '10%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    height: 75,
    backgroundColor: 'white',
    bottom: 0,
  },
});

const Card = (props: any) => {
  return (
    <SafeAreaView style={cardStyle.container}>
      <Text style={cardStyle.title}>{props.title}</Text>
      {/* <Button title={props.title} onPress={() => {}}></Button> */}
      <Image
        style={cardStyle.imageCover}
        resizeMode="cover"
        source={require('../../../assets/Places/Desktop1.jpg')}
      />
    </SafeAreaView>
  );
};

export class HomePageScreen extends React.Component<Props> {
  render() {
    return (
      <View style={HomePageScreenStyle.base}>
        <ScrollView
          style={HomePageScreenStyle.cardContainer}
          contentContainerStyle={HomePageScreenStyle.cardContentContainer}
          showsVerticalScrollIndicator={false}>
          <Card title="1ère vignette" imageSource="IMAGE URL" />
          <Card title="2ème vignette" imageSource="IMAGE URL" />
          <Card title="3ème vignette" imageSource="IMAGE URL" />
        </ScrollView>
        {/* <View style={pageBottomMargin.container} />
        <View style={pageController.container}>
          
          <Text>1</Text>
          <Text>2</Text>
          <Text>3</Text>
        </View> */}
        <BottomHomePageController navigation={this.props.navigation} />
      </View>
    );
  }
}
