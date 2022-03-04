import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {addFriend, getFriendList} from '../../../api/friends';

const friendViewStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  friendView: {
    backgroundColor: 'grey',
    width: '85%',
    height: 50,
    marginVertical: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  friendText: {
    marginLeft: '10%',
  },
});

export class FriendsView extends React.Component {
  state = {
    friendList: [],
  };

  Friend({item}: any) {
    console.log(item);
    return (
      <View style={friendViewStyle.friendView}>
        <Text style={friendViewStyle.friendText} onPress={() => addFriend(0)}>
          {item.first_name} {item.last_name}
        </Text>
      </View>
    );
  }

  async displayFriendList() {
    const friendList = await getFriendList();

    this.setState({friendList: friendList});
  }

  componentDidMount() {
    this.displayFriendList();
    // addFriend(2);
  }

  render() {
    return (
      <SafeAreaView style={friendViewStyle.container}>
        <FlatList
          data={this.state.friendList}
          renderItem={this.Friend}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
  }
}
