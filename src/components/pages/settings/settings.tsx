import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {BottomHomePageController} from '../../elements/controllers/homePageController';
import {disconnect} from '../../api/auth';

import UserIcon from '../../../assets/svg/circle-user-solid.svg';
import PriceListIcon from '../../../assets/svg/price-list.svg';
import DebitCardIcon from '../../../assets/svg/debit-card.svg';
import AccountIcon from '../../../assets/svg/user(1).svg';
import FriendsIcon from '../../../assets/svg/friends.svg';
import GroupsIcon from '../../../assets/svg/communities-social-networking.svg';
import ReturnIcon from '../../../assets/svg/logout-line.svg';

import {getData} from '../../api/userInfo';
import {COLORS_STUDYBOX} from '../../elements/colors';

const SettingsPageScreenStyle = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: 'white',
  },
  profile: {
    height: '20%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  profileUnderline: {
    width: '85%',
    height: 2,
    backgroundColor: COLORS_STUDYBOX.STUDYBOX_GREEN,
  },
  buttonBox: {
    height: '70%',
  },
});

const SettingsButton = (props: any) => {
  const style = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: props.backgroundColor,
      width: '100%',
      height: 50,
      marginVertical: 8,
      alignSelf: 'center',
      alignItems: 'center',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.9,
      shadowRadius: 1,
      elevation: 8,
    },
    icon: {
      marginHorizontal: 10,
    },
    text: {
      fontSize: 20,
    },
  });

  return (
    <TouchableOpacity style={style.container} onPress={props.callback}>
      <props.logo
        width={40}
        height={40}
        fill={props.iconColor}
        style={style.icon}
      />
      <Text style={style.text}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export class SettingsScreen extends React.Component {
  state = {
    userInfo: {},
  };

  async componentDidMount() {
    const rawUserInfo: any = await getData('userInfo');

    if (rawUserInfo) {
      const userInfo = JSON.parse(rawUserInfo);
      this.setState({userInfo: userInfo});
    }
  }

  render() {
    return (
      <View style={SettingsPageScreenStyle.base}>
        <View style={SettingsPageScreenStyle.profile}>
          <UserIcon
            width={60}
            height={60}
            fill={COLORS_STUDYBOX.STUDYBOX_GREEN}
          />
          <Text>
            {this.state.userInfo.first_name} {this.state.userInfo.last_name}
          </Text>
          <View style={SettingsPageScreenStyle.profileUnderline} />
        </View>
        <View style={SettingsPageScreenStyle.buttonBox}>
          <SettingsButton
            backgroundColor="white"
            iconColor={COLORS_STUDYBOX.STUDYBOX_GREEN}
            text="Gérer mes Amis"
            logo={FriendsIcon}
            callback={() => this.props.navigation.navigate('FriendsView')}
          />
          <SettingsButton
            backgroundColor="white"
            iconColor={COLORS_STUDYBOX.STUDYBOX_GREEN}
            text="Gérer mes Groupes"
            logo={GroupsIcon}
            callback={() => this.props.navigation.navigate('TeamsView')}
          />
          <SettingsButton
            backgroundColor="white"
            iconColor={COLORS_STUDYBOX.STUDYBOX_GREEN}
            text="Historique de Paiement"
            logo={PriceListIcon}
            callback={() => this.props.navigation.navigate('BookingHistory')}
          />
          <SettingsButton
            backgroundColor="white"
            iconColor={COLORS_STUDYBOX.STUDYBOX_RED}
            text="Déconnexion"
            logo={ReturnIcon}
            callback={() => disconnect(this.props.navigation)}
          />
        </View>
        <BottomHomePageController navigation={this.props.navigation} />
      </View>
    );
  }
}
