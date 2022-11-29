import React from 'react';
import {
  StyleSheet,
  View,
  PermissionsAndroid,
  RefreshControl,
  Text,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {BottomHomePageController} from '../../elements/controllers/homePageController';
import {getRooms, getRoomsNearby} from '../../api/rooms';
import Geolocation from 'react-native-geolocation-service';
import RoomCard from '../../elements/roomcard';
import BasicSearchBar from '../../elements/searchbar';
import {addFavorite, getFavorites, removeFavorite} from '../../api/favorites';
import PageHeader from '../../elements/controllers/pageHeader';
import {Header} from '../../elements/header';

import MapboxGL from '@rnmapbox/maps';
import { API } from '../../../../config';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: '100%',
    width: '100%',
  },
  map: {
    flex: 1,
  },
});

const HomePageScreenStyle = StyleSheet.create({
  base: {
    flex: 1,
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
    backgroundColor: 'white',
    shadowColor: 'black',
    color: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 8,
  },
});

export class HomePageScreen extends React.Component {
  state = {
    nearbyRooms: [{}], // Storing all nearby Rooms from current Device
    favoriteRooms: [{}],
    latitude: 0,
    longitude: 0,
    refreshing: false,
  };

  async applyRoomState(remoteRooms: Array<any>) {
    const newRooms = [];

    const roomsWithFavorites = await this.loadFavoriteRooms(remoteRooms);

    for (const remoteRoom of roomsWithFavorites) {
      newRooms.push({
        id: remoteRoom.id,
        name: remoteRoom.name,
        desc: remoteRoom.desc,
        address: remoteRoom.address,
        score: remoteRoom.average,
        nb_note: remoteRoom.nb_note,
        price: remoteRoom.price,
        latitude: remoteRoom.latitude,
        longitude: remoteRoom.longitude,
        favorite: remoteRoom.favorite,
        seats_available: remoteRoom.seats_available,
        open_hours: remoteRoom.open_hours,
        seats_total: remoteRoom.seats_total,
        image: remoteRoom.image,
      });
    }
    this.setState({nearbyRooms: newRooms});
  }

  // FAVORITES LOADING
  async loadFavoriteRooms(defaultRooms: Array<Object>) {
    const favoriteRooms: Array<any> = await getFavorites();

    return defaultRooms.map(room => {
      favoriteRooms.forEach(favoriteRoom => {
        if (room.id === favoriteRoom.id) {
          room.favorite = true;
        }
      });
      return room;
    });
  }

  async checkGeolocation() {
    let havePermission: Boolean =
      (await PermissionsAndroid.check(
        'android.permission.ACCESS_COARSE_LOCATION',
      )) === true &&
      (await PermissionsAndroid.check(
        'android.permission.ACCESS_FINE_LOCATION',
      )) === true;

    if (havePermission === false) {
      const granted = await PermissionsAndroid.requestMultiple([
        'android.permission.ACCESS_COARSE_LOCATION',
        'android.permission.ACCESS_FINE_LOCATION',
      ]);
      if (
        granted['android.permission.ACCESS_COARSE_LOCATION'] === 'granted' &&
        granted['android.permission.ACCESS_FINE_LOCATION'] === 'granted'
      ) {
        havePermission = true;
      }
    }

    if (havePermission) {
      Geolocation.getCurrentPosition(
        async info => {
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
    } else {
      const defaultRooms = await getRooms();
      this.applyRoomState(defaultRooms);
    }
  }

  async componentDidMount() {
    // GEOLOCATION ACCESS
    this.checkGeolocation();
  }

  // sk.eyJ1IjoibmF0aGFuMzMyOSIsImEiOiJjbGIxb2Q4YWkwOXgwM3FwY2J0aWo4Ym0xIn0.gsdf5vmpq617bknw5o_sTQ

  render() {
    MapboxGL.setWellKnownTileServer('Mapbox');
    MapboxGL.setAccessToken(API.MAPBOX_TOKEN);

    return (
      <View style={HomePageScreenStyle.base}>
        <Header />
        <View style={{height: '80%'}}>
          <View style={styles.page}>
            <View style={styles.container}>
              <MapboxGL.MapView style={styles.map} />
              <MapboxGL.Camera />
              {/* <MapboxGL.Camera followUserLocation={true} /> */}
              {/* <MapboxGL.UserLocation
                ref={location => {
                  console.log({location});
                }}
              /> */}
            </View>
          </View>
        </View>
        <BottomHomePageController navigation={this.props.navigation} />
      </View>
    );
  }
}
