import React from 'react';
import {ReactNode} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {addFavorite, getFavorites, removeFavorite} from '../../api/favorites';
import {getRooms} from '../../api/rooms';
import {BottomHomePageController} from '../../elements/controllers/homePageController';
import RoomCard from '../../elements/roomcard';
import BasicSearchBar from '../../elements/searchbar';

export class RoomListPageScreen extends React.Component<Props> {
  style = StyleSheet.create({
    baseContainer: {
      flex: 1,
      alignItems: 'center',
    },
    listContainer: {
      width: '100%',
      marginBottom: '20%',
    },
  });

  state = {
    rooms: [],
    filteredRooms: [],
    favorites: [],
  };

  componentDidMount() {
    getFavorites()
      .then(favorites =>
        this.setState({favorites: favorites.map(favorite => favorite.id)}),
      )
      .then(() => {
        getRooms().then(rooms => {
          this.setState({
            rooms: rooms.map(room => {
              room.favorite = this.state.favorites.includes(room.id);
              return room;
            }),
          });
          this.setState({filteredRooms: rooms});
        });
      });
  }

  roomRender = ({item}: any) => {
    const roomRenderStyle = StyleSheet.create({
      container: {
        alignItems: 'center',
      },
    });

    return (
      <View style={roomRenderStyle.container}>
        <RoomCard
          key={item.id}
          id={item.id}
          title={item.name}
          desc={item.desc}
          adress={item.address}
          score={item.average}
          price={item.price}
          nb_note={item.nb_note}
          image={item.image}
          latitude={item.latitude}
          longitude={item.longitude}
          favorite={item.favorite}
          seats_available={item.seats_available}
          seats_total={item.seats_total}
          open_hours={item.open_hours}
          navigation={this.props.navigation}
          onFavorite={() => {
            this.setState({
              rooms: this.state.rooms.map(room => {
                if (room.id === item.id) {
                  if (room.favorite === true) {
                    removeFavorite(room.id);
                  } else {
                    addFavorite(room.id);
                  }
                  room.favorite = !room.favorite;
                }
                return room;
              }),
            });
          }}
        />
        <View />
      </View>
    );
  };

  filterRooms(searchedWord: string) {
    this.setState({
      filteredRooms: this.state.rooms.filter(
        room =>
          room.name?.toLowerCase()?.includes(searchedWord.toLowerCase()) ||
          room.desc.toLowerCase()?.includes(searchedWord.toLowerCase()),
      ),
    });
  }

  render(): ReactNode {
    return (
      <View style={this.style.baseContainer}>
        <BasicSearchBar
          placeholder="Rechercher une salle"
          onChangeText={(newText: string) => this.filterRooms(newText)}
        />
        <FlatList
          style={this.style.listContainer}
          data={this.state.filteredRooms}
          renderItem={this.roomRender}
          keyExtractor={room => room?.id}
        />
        <BottomHomePageController navigation={this.props.navigation} />
      </View>
    );
  }
}
