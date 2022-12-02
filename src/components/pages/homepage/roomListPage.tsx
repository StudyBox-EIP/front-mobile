import React from 'react';
import {ReactNode} from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
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
    },
    scrollView: {
      marginBottom: '15%',
    },
  });

  state = {
    rooms: [],
    filteredRooms: [],
    favorites: [],
    refreshing: false,
  };

  loadRoomList() {
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

  componentDidMount() {
    this.loadRoomList();
  }

  roomRender = ({props}: any) => {
    const roomRenderStyle = StyleSheet.create({
      container: {
        alignItems: 'center',
      },
    });

    return (
      <View style={roomRenderStyle.container}>
        <RoomCard
          key={props.id}
          id={props.id}
          title={props.name}
          desc={props.desc}
          adress={props.address}
          score={props.average}
          price={props.price}
          nb_note={props.nb_note}
          image={props.image}
          latitude={props.latitude}
          longitude={props.longitude}
          favorite={props.favorite}
          seats_available={props.seats_available}
          seats_total={props.seats_total}
          open_hours={props.open_hours}
          navigation={this.props.navigation}
          onFavorite={() => {
            this.setState({
              rooms: this.state.rooms.map(room => {
                if (room.id === props.id) {
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
      <View>
        <ScrollView
          style={this.style.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.loadRoomList();
              }}
            />
          }>
          <View style={this.style.baseContainer}>
            <BasicSearchBar
              placeholder="Rechercher une salle"
              onChangeText={(newText: string) => this.filterRooms(newText)}
            />
            {this.state.filteredRooms.map(room => {
              return (
                <View style={this.style.listContainer}>
                  <this.roomRender props={room} />
                </View>
              );
            })}
          </View>
        </ScrollView>
        <BottomHomePageController navigation={this.props.navigation} />
      </View>
    );
  }
}
