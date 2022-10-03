import React from 'react';
import {
  StyleSheet,
  View,
  PermissionsAndroid,
  RefreshControl,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {BottomHomePageController} from '../../elements/controllers/homePageController';
import {getRooms, getRoomsNearby} from '../../api/rooms';
import Geolocation from 'react-native-geolocation-service';
import RoomCard from '../../elements/roomcard';
import BasicSearchBar from '../../elements/searchbar';
import {addFavorite, getFavorites, removeFavorite} from '../../api/favorites';

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
        price: remoteRoom.price,
        latitude: remoteRoom.latitude,
        longitude: remoteRoom.longitude,
        favorite: remoteRoom.favorite,
        seats_available: remoteRoom.seats_available,
        open_hours: remoteRoom.open_hours,
        seats_total: remoteRoom.seats_total,
        image: undefined,
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

  render() {
    let contextFilter: String = '';
    return (
      <View style={HomePageScreenStyle.base}>
        <BasicSearchBar
          placeholder="Chercher une salle"
          onEndEditing={async (v: any) => {
            contextFilter = v.nativeEvent.text;
            const filteredRooms = await getRooms(contextFilter);
            this.applyRoomState(filteredRooms);
          }}
        />
        <ScrollView
          style={HomePageScreenStyle.cardContainer}
          contentContainerStyle={HomePageScreenStyle.cardContentContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={async () => {}}
            />
          }>
          {this.state.nearbyRooms.map((val: any, key) => {
            return (
              <RoomCard
                key={key}
                id={val.id}
                title={val.name}
                desc={val.desc}
                adress={val.address}
                score={val.score}
                price={val.price}
                image={val.image}
                latitude={val.latitude}
                longitude={val.longitude}
                favorite={val.favorite}
                seats_available={val.seats_available}
                seats_total={val.seats_total}
                open_hours={val.open_hours}
                navigation={this.props.navigation}
                onFavorite={(newFavorite: boolean) => {
                  this.setState({
                    nearbyRooms: this.state.nearbyRooms.map((v: any) => {
                      if (v.name === val.name) {
                        v.favorite = !val.favorite;
                      }
                      return v;
                    }),
                  });

                  if (newFavorite === true) {
                    addFavorite(val.id);
                  } else {
                    removeFavorite(val.id);
                  }
                }}
              />
            );
          })}
        </ScrollView>
        <BottomHomePageController navigation={this.props.navigation} />
      </View>
    );
  }
}
