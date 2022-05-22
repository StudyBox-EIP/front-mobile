import React from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  createTeam,
  deleteTeam,
  getInboundTeamRequest,
  getOutboundTeamRequest,
  getTeams,
} from '../../../api/teams';
import {getData} from '../../../api/userInfo';
import {imageButton, modal, team} from './style';

export class TeamsView extends React.Component {
  state = {
    userInfo: {},
    modalState: false,
    modalText: '',
    teamsList: [],
  };

  componentDidMount = async () => {
    const rawUserInfo: any = await getData('userInfo');

    if (rawUserInfo) {
      const userInfo = JSON.parse(rawUserInfo);
      this.setState({userInfo: userInfo});
    }

    console.log(await getInboundTeamRequest(), await getOutboundTeamRequest());
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

  teamsModal = () => {
    return (
      <Modal
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
    item = item.item;
    return (
      <TouchableOpacity
        style={team.container}
        onPress={()=> {
          this.props.navigation.navigate('TeamPage', {
            team: item,
          });
        }}>
        <Text style={team.text}>{item.name}</Text>
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
      </TouchableOpacity>
    );
  };

  Teams = () => {
    return (
      <FlatList
        data={this.state.teamsList}
        renderItem={this.Team}
        keyExtractor={item => item.id}
      />
    );
  };

  render() {
    return (
      <View>
        <this.Teams />
        <this.createTeamCard />
        <this.teamsModal />
      </View>
    );
  }
}
