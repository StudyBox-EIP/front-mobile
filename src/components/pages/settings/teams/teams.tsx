import React from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  RefreshControl,
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
import {card, friendViewStyle} from '../friends/style';
import {imageButton, modal, team} from './style';

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

  createTeamCard = () => {
    const style = StyleSheet.create({
      container: {
        backgroundColor: 'red',
        width: '80%',
        height: 75,
        alignSelf: 'center',
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
      },
      image: {
        width: 50,
        height: 50,
      },
    });

    return (
      <TouchableOpacity
        style={style.container}
        onPress={() => this.setState({modalState: !this.state.modalState})}>
        <Text>Créer une Equipe</Text>
        <Image
          style={style.image}
          source={require('../../../../assets/img/add-group.png')}
        />
      </TouchableOpacity>
    );
  };

  Request = (item: any) => {
    item = item.value;
    return (
      <View style={friendViewStyle.friendView}>
        <Text style={card.text}>
          {item.sender.first_name} {item.sender.last_name}: {item.team.name}
        </Text>
        <TouchableOpacity
          style={card.touchableopacity}
          onPress={async () => {
            await answerTeamRequest(item.id, true);
            this.refreshTeams();
          }}>
          <Image
            style={imageButton.round}
            source={require('../../../../assets/img/checked.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={card.touchableopacity}
          onPress={async () => {
            await answerTeamRequest(item.id, false);
            this.refreshTeams();
          }}>
          <Image
            style={imageButton.square}
            source={require('../../../../assets/img/trash.png')}
          />
        </TouchableOpacity>
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
              <Image
                style={modal.image}
                source={require('../../../../assets/img/checked.png')}
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
        style={team.container}
        onPress={() => {
          this.props.navigation.navigate('TeamPage', {
            team: item,
          });
        }}>
        <Text style={team.text}>{item.name}</Text>
        {this.state.userInfo.id === item.creator.id ? (
          <TouchableOpacity
            style={team.touchableOpacity}
            onPress={async () => {
              await deleteTeam(item.id);
              await this.refreshTeams();
            }}>
            <Image
              style={imageButton.square}
              source={require('../../../../assets/img/trash.png')}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity />
        )}
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={async () => {
              await this.refreshTeams();
            }}
          />
        }>
        {this.state.teamsList.map((value, key) => {
          return <this.Team value={value} key={key} />;
        })}
        {this.state.inboundRequests.map((value, key) => {
          return <this.Request value={value} key={key} />;
        })}
        <this.createTeamCard />
        <this.teamsModal />
      </ScrollView>
    );
  }
}
