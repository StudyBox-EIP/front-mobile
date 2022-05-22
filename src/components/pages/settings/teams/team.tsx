import React from 'react';
import {View, Text, TouchableOpacity, Image, Modal} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {getFriendList} from '../../../api/friends';
import {sendTeamRequest} from '../../../api/teams';
import {addButton, friendViewStyle, imageButton, modal} from '../friends/style';

export class TeamPage extends React.Component<Props> {
  state = {
    team: {},
    memberList: [],
    friendList: [],
    modalState: true,
    modalText: '',
  };

  async componentDidMount() {
    this.setState({team: this.props.route.params.team});

    this.setState({friendList: await getFriendList()});

    console.log(this.props.route.params.team);
  }

  AddMemberModal = () => {
    const FriendCard = (item: any) => {
      item = item.item;
      return (
        <View
          style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text>
            {item.first_name} {item.last_name}
          </Text>
          <TouchableOpacity
            style={modal.touchableopacity}
            onPress={async () => {
              await sendTeamRequest(this.state.team.id, item.id);
              this.setState({modalState: !this.state.modalState});
            }}>
            <Image
              style={imageButton.round}
              source={require('../../../../assets/img/checked.png')}
            />
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalState}
        onRequestClose={() =>
          this.setState({modalState: !this.state.modalState})
        }>
        <View style={modal.viewContainer}>
          <Text style={modal.text}>
            Ajouter un ami à votre Groupe de Travail
          </Text>
          <View style={modal.viewContent}>
            <FlatList
              data={this.state.friendList}
              renderItem={FriendCard}
              keyExtractor={item => item.id}
            />
            {/* <TouchableOpacity
              style={modal.touchableopacity}
              onPress={async () => {
                await sendTeamRequest(this.state.team.id, );
                this.setState({modalState: !this.state.modalState})
              }}>
              <Image
                style={imageButton.round}
                source={require('../../../../assets/img/checked.png')}
              />
            </TouchableOpacity> */}
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <View style={friendViewStyle.container}>
        <Text>{this.state.team.name}</Text>
        <this.AddMemberModal />
        <View style={addButton.view}>
          <TouchableOpacity
            style={addButton.touchableOpacity}
            onPress={() => this.setState({modalState: !this.state.modalState})}>
            <Image
              style={imageButton.square}
              source={require('../../../../assets/img/add-friend.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
