/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import 'react-native-gesture-handler';

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {AuthScreen} from './src/components/pages/connection/screen-auth/screen-auth';
import {MicrosoftOauthScreen} from './src/components/pages/connection/oauth/MicrosoftOauthScreen';
import {GoogleOauthScreen} from './src/components/pages/connection/oauth/GoogleOauthScreen';
import {LoginScreen} from './src/components/pages/connection/login/login';
import {SignUpScreen} from './src/components/pages/connection/register/register';
import {HomePageScreen} from './src/components/pages/homepage/homepage';
import {SplashScreen} from './src/components/pages/splashScreen';
import {SettingsScreen} from './src/components/pages/settings/settings';
import {FriendsView} from './src/components/pages/settings/friends/friends';
import {TeamsView} from './src/components/pages/settings/teams/teams';
import {RoomScreen} from './src/components/pages/homepage/room/room';
import {TeamPage} from './src/components/pages/settings/teams/team';
import {BookingScreen} from './src/components/pages/booking/booking';
import {BookingHistory} from './src/components/pages/settings/bookingHistory/bookingHistory';
import {COLORS_STUDYBOX} from './src/components/elements/colors';

const NavigationLoader = () => {
  const Stack = createStackNavigator();
  const ScreensOptions = {
    title: '',
    headerStyle: {
      backgroundColor: COLORS_STUDYBOX.DARK_WHITE,
    },
    headerTintColor: COLORS_STUDYBOX.LIGHT_BLUE,
    headerShown: false,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          options={ScreensOptions}
          component={SplashScreen}
        />
        <Stack.Screen
          name="AuthScreen"
          options={{headerShown: false}}
          component={AuthScreen}
        />
        <Stack.Screen
          name="ManualSignIn"
          options={ScreensOptions}
          component={LoginScreen}
        />
        <Stack.Screen
          name="ManualSignUp"
          options={ScreensOptions}
          component={SignUpScreen}
        />
        <Stack.Screen name="GoogleOauthScreen" component={GoogleOauthScreen} />
        <Stack.Screen
          name="MicrosoftOauthScreen"
          component={MicrosoftOauthScreen}
        />
        <Stack.Screen
          name="HomePageScreen"
          options={{headerShown: false}}
          component={HomePageScreen}
        />
        <Stack.Screen
          name="SettingsPageScreen"
          options={{headerShown: false}}
          component={SettingsScreen}
        />
        <Stack.Screen
          name="FriendsView"
          component={FriendsView}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TeamsView"
          component={TeamsView}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TeamPage"
          component={TeamPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BookingHistory"
          component={BookingHistory}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RoomScreen"
          options={{headerShown: false}}
          component={RoomScreen}
        />
        <Stack.Screen
          name="BookingScreen"
          options={{headerShown: false}}
          component={BookingScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationLoader;
