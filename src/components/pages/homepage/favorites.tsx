import React from 'react';
import {RefreshControl, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {BottomHomePageController} from '../../elements/controllers/homePageController';
import RoomCard from '../../elements/roomcard';
import {addFavorite, getFavorites, removeFavorite} from '../../api/favorites';

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
    refreshing: false,
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
        favorite: remoteRoom.favorite,
        seats_available: remoteRoom.seats_available,
        open_hours: remoteRoom.open_hours,
        seats_total: remoteRoom.seats_total,
        image: undefined,
      });
    }
    this.setState({nearbyRooms: newRooms});
  }

  async loadFavoriteRooms() {
    const favoriteRooms: Array<Object> = await getFavorites();

    console.info(favoriteRooms);

    this.setState({favoriteRooms});

    return favoriteRooms.map(room => {
      room.favorite = true;
      return room;
    });
  }

  async componentDidMount() {
    this.applyRoomState(await this.loadFavoriteRooms());
  }

  render() {
    return (
      <View style={FavoritesPageScreenStyle.base}>
        <ScrollView
          style={FavoritesPageScreenStyle.cardContainer}
          contentContainerStyle={FavoritesPageScreenStyle.cardContentContainer}
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
                    this.loadFavoriteRooms().then(res =>
                      this.applyRoomState(res),
                    );
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
