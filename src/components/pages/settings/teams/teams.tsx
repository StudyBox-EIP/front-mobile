import React from 'react';
import {
  Modal,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  answerTeamRequest,
  createTeam,
  deleteTeam,
  getInboundTeamRequest,
  getTeams,
} from '../../../api/teams';
import {getData} from '../../../api/userInfo';
import {addButton, card, friendViewStyle} from '../friends/style';
import {modal, team} from './style';
import AddLogo from '../../../../assets/svg/plus.svg';
import BackButton from '../../../../assets/svg/angle-left-solid.svg';
import PageHeader from '../../../elements/controllers/pageHeader';
import TrashIcon from '../../../../assets/svg/trash-can-solid.svg';
import CheckIcon from '../../../../assets/svg/check-mark.svg';
import {COLORS_STUDYBOX} from '../../../elements/colors';

export class TeamsView extends React.Component {
  state = {
    userInfo: {},
    modalState: false,
    modalText: '',
    teamsList: [],
    inboundRequests: [],
    refreshing: false,
  };

  componentDidMount = async () => {
    const rawUserInfo: any = await getData('userInfo');

    if (rawUserInfo) {
      const userInfo = JSON.parse(rawUserInfo);
      this.setState({userInfo: userInfo});
    }
    this.refreshTeams();
  };

  async refreshTeams() {
    const remoteTeams = await getTeams();
    const newTeams: Array<any> = [];
    if (remoteTeams) {
      for (const remoteTeam of remoteTeams) {
        newTeams.push(remoteTeam);
      }
      this.setState({teamsList: newTeams});
    }
    this.setState({inboundRequests: await getInboundTeamRequest()});
  }

  Request = (item: any) => {
    item = item.value;
    return (
      <View style={friendViewStyle.friendView}>
        <Text style={card.text}>
          {item.sender.first_name} {item.sender.last_name}: {item.team.name}
        </Text>
        <View style={friendViewStyle.actionButtons}>
          <TouchableOpacity
            style={card.leftTouchableOpacity}
            onPress={async () => {
              await answerTeamRequest(item.id, true);
              this.refreshTeams();
            }}>
            <CheckIcon
              width={'100%'}
              height={'100%'}
              fill={COLORS_STUDYBOX.STUDYBOX_GREEN}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={card.rightTouchableOpacity}
            onPress={async () => {
              await answerTeamRequest(item.id, false);
              this.refreshTeams();
            }}>
            <TrashIcon
              width={'100%'}
              height={'100%'}
              fill={COLORS_STUDYBOX.STUDYBOX_RED}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  teamsModal = () => {
    return (
      <Modal
        animationType="fade"
        visible={this.state.modalState}
        transparent={true}
        onRequestClose={() =>
          this.setState({modalState: !this.state.modalState})
        }>
        <View style={modal.viewContainer}>
          <View style={modal.background} />
          <Text style={modal.text}>Créer une Equipe</Text>
          <View style={modal.subContainer}>
            <TextInput
              placeholder="Nom"
              onChangeText={newText => this.setState({modalText: newText})}
            />
            <TouchableOpacity
              style={modal.touchableOpacity}
              onPress={async () => {
                await createTeam(this.state.modalText);
                this.setState({modalState: !this.state.modalState});
                await this.refreshTeams();
              }}>
              <CheckIcon
                width={'100%'}
                height={'100%'}
                fill={COLORS_STUDYBOX.STUDYBOX_GREEN}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  Team = (item: any) => {
    item = item.value;
    return (
      <TouchableOpacity
        style={friendViewStyle.friendView}
        onPress={() => {
          this.props.navigation.navigate('TeamPage', {
            team: item,
          });
        }}>
        <Text style={team.text}>{item.name}</Text>
        {this.state.userInfo.id === item.creator.id ? (
          <View style={friendViewStyle.actionButtons}>
            <TouchableOpacity
              style={card.rightTouchableOpacity}
              onPress={async () => {
                await deleteTeam(item.id);
                await this.refreshTeams();
              }}>
              <TrashIcon
                width={'100%'}
                height={'100%'}
                fill={COLORS_STUDYBOX.STUDYBOX_RED}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity />
        )}
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView style={friendViewStyle.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={async () => {
                await this.refreshTeams();
              }}
            />
          }>
          <PageHeader
            headerText="Vos Groupes de Travail"
            callback={() => this.props.navigation?.goBack()}
            icon={BackButton}
            linePercentage="90%"
          />
          {this.state.teamsList.map((value, key) => {
            return <this.Team value={value} key={key} />;
          })}
          {this.state.inboundRequests.map((value, key) => {
            return <this.Request value={value} key={key} />;
          })}
          <this.teamsModal />
        </ScrollView>
        <View style={addButton.view}>
          <TouchableOpacity
            style={addButton.touchableOpacity}
            onPress={() => this.setState({modalState: !this.state.modalState})}>
            <AddLogo
              width={60}
              height={60}
              fill={COLORS_STUDYBOX.STUDYBOX_GREEN}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
