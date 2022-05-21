import React from 'react';
import {
  FlatList,
  Modal,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
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
import {addButton, card, friendViewStyle, imageButton, modal} from './style';

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
          <Text style={card.text}>
            {item.sender.first_name} {item.sender.last_name}
          </Text>
          <TouchableOpacity
            style={card.touchableopacity}
            onPress={async () => {
              await answerFriendRequest(item.id, true);
              await this.refreshFriend();
            }}>
            <Image
              style={imageButton.round}
              source={require('../../../../assets/img/checked.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={card.touchableopacity}
            onPress={async () => {
              await answerFriendRequest(item.id, false);
              await this.refreshFriend();
            }}>
            <Image
              style={imageButton.square}
              source={require('../../../../assets/img/trash.png')}
            />
          </TouchableOpacity>
        </View>
      );
    } else if (item.sender && item.sender.id === this.state.userInfo.id) {
      return (
        <View style={friendViewStyle.friendView}>
          <Text style={card.text}>
            {item.sender.first_name} {item.sender.last_name} (en attente)
          </Text>
        </View>
      );
    } else {
      return (
        <View style={friendViewStyle.friendView}>
          <Text style={card.text}>
            {item.first_name} {item.last_name}
          </Text>
          <TouchableOpacity
            style={card.touchableopacity}
            onPress={async () => {
              await removeFriend(item.id);
              await this.refreshFriend();
            }}>
            <Image
              style={imageButton.square}
              source={require('../../../../assets/img/trash.png')}
            />
          </TouchableOpacity>
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
          <View style={modal.viewContainer}>
            <Text style={modal.text}>Ajouter un nouvel Ami</Text>
            <View style={modal.viewContent}>
              <TextInput
                placeholder="Email"
                onChangeText={text => this.editModalText(text)}
              />
              <TouchableOpacity
                style={modal.touchableopacity}
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                  addFriend(modalText);
                }}>
                <Image
                  style={imageButton.round}
                  source={require('../../../../assets/img/checked.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={friendViewStyle.viewShareMail}>
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
        <View style={addButton.view}>
          <TouchableOpacity
            style={addButton.touchableOpacity}
            onPress={() => this.setModalVisible(!modalVisible)}>
            <Image
              style={imageButton.square}
              source={require('../../../../assets/img/add-friend.png')}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
