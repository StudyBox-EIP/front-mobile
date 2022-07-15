import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {getFriendList} from '../../../api/friends';
import {
  getOutboundTeamRequest,
  getTeams,
  removeUserFromTeam,
  sendTeamRequest,
} from '../../../api/teams';
import {getData} from '../../../api/userInfo';
import {addButton, card, friendViewStyle, modal} from '../friends/style';
import {member, members, team} from './style';
import CheckIcon from '../../../../assets/svg/check-mark.svg';
import TrashIcon from '../../../../assets/svg/trash-can-solid.svg';
import AddLogo from '../../../../assets/svg/plus.svg';
import {COLORS_STUDYBOX} from '../../../elements/colors';

export class TeamPage extends React.Component<Props> {
  state = {
    userInfo: {},
    team: {},
    memberList: [],
    friendList: [],
    modalState: false,
    modalText: '',
    outboundRequests: [],
    refreshing: false,
  };

  async componentDidMount() {
    const rawUserInfo: any = await getData('userInfo');

    if (rawUserInfo) {
      const userInfo = JSON.parse(rawUserInfo);
      this.setState({userInfo: userInfo});
    }
    this.setState({team: this.props.route.params.team});

    await this.refreshTeamStatus();
  }

  async refreshTeamStatus() {
    this.setState({friendList: await getFriendList()});

    const outboundRequests: Array<any> = await getOutboundTeamRequest();
    const filteredOutboundRequests = outboundRequests.filter(
      request => request.team.id === this.state.team.id,
    );
    this.setState({outboundRequests: filteredOutboundRequests});

    const newTeam = await getTeams(this.state.team.id);
    this.setState({memberList: newTeam.people});
  }

  AddMemberModal = () => {
    const FriendCard = (item: any) => {
      item = item.value;
      return (
        <View style={member.container}>
          <Text>
            {item.first_name} {item.last_name}
          </Text>
          <TouchableOpacity
            style={modal.touchableopacity}
            onPress={async () => {
              await sendTeamRequest(this.state.team.id, item.email);
              await this.refreshTeamStatus();
              this.setState({modalState: !this.state.modalState});
            }}>
            <CheckIcon
              width={'100%'}
              height={'100%'}
              fill={COLORS_STUDYBOX.GREEN}
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
            {this.state.friendList.map((value, key) => {
              return <FriendCard value={value} key={key} />;
            })}
          </View>
        </View>
      </Modal>
    );
  };

  Request = (item: any) => {
    item = item.value;
    return (
      <View style={friendViewStyle.friendView}>
        <Text style={card.text}>
          {item.target.first_name} {item.target.last_name} (en attente)
        </Text>
      </View>
    );
  };

  Member = (item: any) => {
    item = item.value;
    return (
      <View style={friendViewStyle.friendView}>
        <Text style={team.text}>
          {item?.first_name} {item?.last_name}
        </Text>
        {this.state.userInfo.id === this.state.team?.creator?.id &&
        this.state.userInfo.id !== item?.id ? (
          <View style={friendViewStyle.actionButtons}>
            <TouchableOpacity
              style={card.rightTouchableOpacity}
              onPress={async () => {
                await removeUserFromTeam(this.state.team.id, item.id);
                this.refreshTeamStatus();
              }}>
              <TrashIcon
                width={'100%'}
                height={'100%'}
                fill={COLORS_STUDYBOX.CONFIRM_RED}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity />
        )}
      </View>
    );
  };

  TeamHeader = () => {
    const style = StyleSheet.create({
      container: {
        backgroundColor: 'white',
        borderColor: COLORS_STUDYBOX.GREEN,
        borderWidth: 2,
        margin: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        height: '5%',
        justifyContent: 'center',
      },
      text: {
        alignSelf: 'center',
        fontSize: 24,
        fontFamily: 'RopaSans-Regular',
      },
    });

    return (
      <View style={style.container}>
        <Text style={style.text}>{this.state.team.name}</Text>
      </View>
    );
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={friendViewStyle.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={async () => {
              await this.refreshTeamStatus();
            }}
          />
        }>
        <this.TeamHeader />
        {this.state.outboundRequests.map((value, key) => {
          return <this.Request value={value} key={key} />;
        })}
        <this.Member
          style={members.container}
          value={this.state.team.creator}
        />
        {this.state.memberList?.map((value, key) => {
          return (
            <this.Member style={members.container} value={value} key={key} />
          );
        })}
        <this.AddMemberModal />
        <View style={addButton.view}>
          <TouchableOpacity
            style={addButton.touchableOpacity}
            onPress={() => this.setState({modalState: !this.state.modalState})}>
            <AddLogo width={60} height={60} fill={COLORS_STUDYBOX.GREEN} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
