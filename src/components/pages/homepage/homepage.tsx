import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {BottomHomePageController} from '../../elements/controllers/homePageController';
import {getPictureObject} from '../../../tools/images';
import {getRooms, getRoomsNearby} from '../../api/rooms';
import Geolocation from 'react-native-geolocation-service';

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
  textInput: {
    marginTop: 8,
    marginBottom: 2,
    width: '92%',
    borderRadius: 7,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    color: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 8,
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
  state = {
    nearbyRooms: [], // Storing all nearby Rooms from current Device
    latitude: 0,
    longitude: 0,
  };

  applyRoomState(remoteRooms: Array<any>) {
    const newRooms = [];

    for (const remoteRoom of remoteRooms) {
      newRooms.push({
        id: remoteRoom.id,
        name: remoteRoom.name,
        desc: remoteRoom.desc,
        address: remoteRoom.address,
        score: remoteRoom.average,
        image: undefined,
      });
    }
    this.setState({nearbyRooms: newRooms});
  }

  async componentDidMount() {
    Geolocation.getCurrentPosition(
      async info => {
        console.log(info);
        this.setState({latitude: info.coords.latitude});
        this.setState({longitude: info.coords.longitude});
        const remoteRooms = await getRoomsNearby(
          this.state.latitude,
          this.state.longitude,
        );
        this.applyRoomState(remoteRooms);
      },
      (e: any) => console.error(e),
      {enableHighAccuracy: true},
    );
  }

  render() {
    let contextFilter: String = '';
    return (
      <View style={HomePageScreenStyle.base}>
        <TextInput
          style={HomePageScreenStyle.textInput}
          onEndEditing={async v => {
            contextFilter = v.nativeEvent.text;
            console.log('Search : ' + contextFilter);
            const filteredRooms = await getRooms(contextFilter);
            this.applyRoomState(filteredRooms);
            console.info(filteredRooms);
          }}
        />
        <ScrollView
          style={HomePageScreenStyle.cardContainer}
          contentContainerStyle={HomePageScreenStyle.cardContentContainer}
          showsVerticalScrollIndicator={false}>
          {this.state.nearbyRooms.map((val: any, key) => {
            return (
              <Card
                key={key}
                title={val.name}
                desc={val.desc}
                adress={val.address}
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
