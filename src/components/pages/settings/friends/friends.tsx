import React from 'react';
import {
  Modal,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
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
import PageHeader from '../../../elements/controllers/pageHeader';
import {addButton, card, friendViewStyle, modal} from './style';
import BackButton from '../../../../assets/svg/angle-left-solid.svg';
import AddLogo from '../../../../assets/svg/plus.svg';
import TrashIcon from '../../../../assets/svg/trash-can-solid.svg';
import CheckIcon from '../../../../assets/svg/check-mark.svg';
import {COLORS_STUDYBOX} from '../../../elements/colors';

export class FriendsView extends React.Component {
  state = {
    modalVisible: false,
    modalText: '',
    friendList: [],
    pendingList: [],
    userInfo: {},
    refreshing: false,
  };

  Friend = (item: any) => {
    item = item.value;
    if (item.target && item.target.id === this.state.userInfo.id) {
      return (
        <View style={friendViewStyle.friendView}>
          <Text style={card.text}>
            {item.sender.first_name} {item.sender.last_name}
          </Text>
          <View style={friendViewStyle.actionButtons}>
            <TouchableOpacity
              style={card.leftTouchableOpacity}
              onPress={async () => {
                await answerFriendRequest(item.id, true);
                await this.refreshFriend();
              }}>
              <CheckIcon
                width={'100%'}
                height={'100%'}
                fill={COLORS_STUDYBOX.GREEN}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={card.rightTouchableOpacity}
              onPress={async () => {
                await answerFriendRequest(item.id, false);
                await this.refreshFriend();
              }}>
              <TrashIcon
                width={'100%'}
                height={'100%'}
                fill={COLORS_STUDYBOX.CONFIRM_RED}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (item.sender && item.sender.id === this.state.userInfo.id) {
      return (
        <View style={friendViewStyle.friendView}>
          <Text style={card.text}>
            {item.target.first_name} {item.target.last_name} (en attente)
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
            style={card.rightTouchableOpacity}
            onPress={async () => {
              await removeFriend(item.id);
              await this.refreshFriend();
            }}>
            <TrashIcon
              width={'100%'}
              height={'100%'}
              fill={COLORS_STUDYBOX.CONFIRM_RED}
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
        <PageHeader
          headerText="Vos Amis"
          callback={() => this.props.navigation?.goBack()}
          icon={BackButton}
          linePercentage="55%"
        />
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
                <CheckIcon
                  width={'100%'}
                  height={'100%'}
                  fill={COLORS_STUDYBOX.GREEN}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <ScrollView
          contentContainerStyle={friendViewStyle.container}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={async () => {
                await this.refreshFriend();
              }}
            />
          }>
          <View style={friendViewStyle.viewShareMail}>
            <Text>Vôtre Email à partager:</Text>
            <Text>{this.state.userInfo.email}</Text>
          </View>
          {this.state.friendList.map((key, value) => {
            return <this.Friend key={value} value={key} />;
          })}
          {this.state.pendingList.map((value, key) => {
            return <this.Friend value={value} key={key} />;
          })}
        </ScrollView>
        <View style={addButton.view}>
          <TouchableOpacity
            style={addButton.touchableOpacity}
            onPress={() => this.setModalVisible(!modalVisible)}>
            <AddLogo width={60} height={60} fill={COLORS_STUDYBOX.GREEN} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
