import React from 'react';
import {StyleSheet, View, PermissionsAndroid} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {BottomHomePageController} from '../../elements/controllers/homePageController';
import {getRooms, getRoomsNearby} from '../../api/rooms';
import Geolocation from 'react-native-geolocation-service';
import RoomCard from '../../elements/roomcard';
import BasicSearchBar from '../../elements/searchbar';
import {getData, storeData} from '../../api/userInfo';

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
        price: remoteRoom.price,
        latitude: remoteRoom.latitude,
        longitude: remoteRoom.longitude,
        favorite: false, // FAVORITE NEEDS TO BE IMPLEMENTED IN API
        seats_available: remoteRoom.seats_available,
        open_hours: remoteRoom.open_hours,
        seats_total: remoteRoom.seats_total,
        image: undefined,
      });
    }
    this.setState({nearbyRooms: newRooms});
  }

  async componentDidMount() {
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

  render() {
    let contextFilter: String = '';
    return (
      <View style={HomePageScreenStyle.base}>
        <BasicSearchBar
          placeholder="Chercher une salle"
          onEndEditing={async v => {
            contextFilter = v.nativeEvent.text;
            const filteredRooms = await getRooms(contextFilter);
            this.applyRoomState(filteredRooms);
          }}
        />
        <ScrollView
          style={HomePageScreenStyle.cardContainer}
          contentContainerStyle={HomePageScreenStyle.cardContentContainer}
          showsVerticalScrollIndicator={false}>
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
                  getData('favorites')
                    .then(res => {
                      if (newFavorite === true) {
                        if (res === null && res !== undefined) {
                          storeData('favorites', JSON.stringify([val.id]));
                        } else if (res !== undefined) {
                          const oldValues = JSON.parse(res);
                          oldValues.push(val.id);
                          storeData('favorites', JSON.stringify(oldValues));
                        }
                      } else {
                        if (res !== null && res !== undefined) {
                          const oldValues = JSON.parse(res);
                          storeData(
                            'favorites',
                            JSON.stringify(
                              oldValues.filter((id: any) => id !== val.id),
                            ),
                          );
                        }
                      }
                    })
                    .catch(console.error);

                  console.log(this.state.nearbyRooms);
                  console.log('favorite');
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
