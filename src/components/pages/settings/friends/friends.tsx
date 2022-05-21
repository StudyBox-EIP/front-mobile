import React from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  addFriend,
  answerFriendRequest,
  getFriendList,
  getFriendRequests,
  removeFriend,
} from '../../../api/friends';
import {getData} from '../../../api/userInfo';

const friendViewStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  friendView: {
    flexDirection: 'row',
    backgroundColor: 'grey',
    width: '80%',
    height: 50,
    marginVertical: 8,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
  },
});

export class FriendsView extends React.Component {
  state = {
    modalVisible: false,
    modalText: '',
    friendList: [],
    pendingList: [],
    userInfo: {},
  };

  Friend = ({item}: any) => {
    if (item.target && item.target.id === this.state.userInfo.id) {
      return (
        <View style={friendViewStyle.friendView}>
          <Text>
            {item.sender.first_name} {item.sender.last_name}
          </Text>
          <TouchableOpacity
            style={{backgroundColor: 'green', width: 40, height: 40}}
            onPress={async () => {
              await answerFriendRequest(item.id, true);
              await this.refreshFriend();
            }}
          />
          <TouchableOpacity
            style={{backgroundColor: 'red', width: 40, height: 40}}
            onPress={async () => {
              await answerFriendRequest(item.id, false);
              await this.refreshFriend();
            }}
          />
        </View>
      );
    } else if (item.sender && item.sender.id === this.state.userInfo.id) {
      return (
        <View style={friendViewStyle.friendView}>
          <Text>
            {item.sender.first_name} {item.sender.last_name} (en attente)
          </Text>
        </View>
      );
    } else {
      return (
        <View style={friendViewStyle.friendView}>
          <Text>
            {item.first_name} {item.last_name}
          </Text>
          <TouchableOpacity
            style={{backgroundColor: 'red', width: 40, height: 40}}
            onPress={async () => {
              await removeFriend(item.id);
              await this.refreshFriend();
            }}
          />
        </View>
      );
    }
  };

  async refreshFriend() {
    const newFriendList = [];
    const newPendingList = [];

    const friendList = await getFriendList();
    if (friendList) {
      for (const friend of friendList) {
        newFriendList.push(friend);
      }
    }
    this.setState({friendList: newFriendList});

    const pendingRequests: Array<any> = await getFriendRequests();
    if (pendingRequests) {
      for (const request of pendingRequests) {
        newPendingList.push(request);
      }
    }
    this.setState({pendingList: newPendingList});
  }

  componentDidMount = async () => {
    const rawUserInfo: any = await getData('userInfo');

    if (rawUserInfo) {
      const userInfo = JSON.parse(rawUserInfo);
      this.setState({userInfo: userInfo});
    }
    this.refreshFriend();
  };

  setModalVisible = (visible: Boolean) => {
    this.setState({modalVisible: visible});
    this.refreshFriend();
  };

  editModalText = (newText: string) => {
    this.setState({modalText: newText});
  };

  render() {
    const {modalVisible, modalText} = this.state;
    return (
      <SafeAreaView style={friendViewStyle.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => this.setModalVisible(!modalVisible)}>
          <View
            style={{
              alignItems: 'center',
              alignSelf: 'center',
              top: '50%',
              height: 100,
              backgroundColor: 'grey',
              width: '75%',
              borderRadius: 10,
            }}>
            <Text style={{marginTop: 10}}>Ajouter un nouvel Ami</Text>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: '100%',
                paddingHorizontal: 10,
              }}>
              <TextInput
                placeholder="Email"
                onChangeText={text => this.editModalText(text)}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: 'green',
                  height: 50,
                  width: 50,
                  borderRadius: 10,
                }}
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                  addFriend(modalText);
                }}
              />
            </View>
          </View>
        </Modal>
        <View
          style={{
            width: '80%',
            height: '10%',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'pink',
            borderRadius: 10,
            marginVertical: 10,
          }}>
          <Text>Vôtre Email à partager:</Text>
          <Text>{this.state.userInfo.email}</Text>
        </View>
        <FlatList
          data={this.state.friendList}
          renderItem={this.Friend}
          keyExtractor={item => item.id}
        />
        <FlatList
          data={this.state.pendingList}
          renderItem={this.Friend}
          keyExtractor={item => item.id}
        />
        <View
          style={{
            backgroundColor: 'grey',
            position: 'absolute',
            bottom: 0,
            right: 0,
            marginRight: '5%',
            marginBottom: '5%',
            width: 50,
            height: 50,
            borderRadius: 100,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'black',
              width: '100%',
              height: '100%',
              borderRadius: 100,
            }}
            onPress={() => this.setModalVisible(!modalVisible)}
          />
        </View>
      </SafeAreaView>
    );
  }
}
