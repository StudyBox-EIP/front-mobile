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

const Stack = createStackNavigator();
const ScreensOptions = {
  title: '',
  headerStyle: {
    backgroundColor: '#F1F1F1',
  },
  headerTintColor: '#29B6F6',
};

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ScreenAuth">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
