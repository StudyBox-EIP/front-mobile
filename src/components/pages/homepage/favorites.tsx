import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {BottomHomePageController} from '../../elements/controllers/homePageController';
import {getRooms} from '../../api/rooms';
import RoomCard from '../../elements/roomcard';
import {getData, storeData} from '../../api/userInfo';

const FavoritesPageScreenStyle = StyleSheet.create({
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

export class FavoritesPageScreen extends React.Component {
  state = {
    nearbyRooms: [{}], // Storing all nearby Rooms from current Device
    favoriteRooms: [{}],
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
        favorite: remoteRoom.favorite, // FAVORITE NEEDS TO BE IMPLEMENTED IN API || LOCALSTORAGE IMPLEMENTATION CURRENTLY
        seats_available: remoteRoom.seats_available,
        open_hours: remoteRoom.open_hours,
        seats_total: remoteRoom.seats_total,
        image: undefined,
      });
    }
    this.setState({nearbyRooms: newRooms});
  }

  async loadFavoriteRooms(defaultRooms: Array<Object>) {
    const stringFavorites = await getData('favorites');
    if (typeof stringFavorites === 'string') {
      const favorites: Array<number> = JSON.parse(stringFavorites);

      this.state.favoriteRooms = defaultRooms.filter((room: Object) =>
        favorites.includes(room.id),
      );
      this.state.favoriteRooms = this.state.favoriteRooms.map(
        (room: Object) => {
          if (favorites.includes(room.id)) {
            room.favorite = true;
          }
          return room;
        },
      );
    }
  }

  async componentDidMount() {
    const defaultRooms = await getRooms();
    await this.loadFavoriteRooms(defaultRooms);
    this.applyRoomState(this.state.favoriteRooms);
  }

  render() {
    return (
      <View style={FavoritesPageScreenStyle.base}>
        <ScrollView
          style={FavoritesPageScreenStyle.cardContainer}
          contentContainerStyle={FavoritesPageScreenStyle.cardContentContainer}
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
