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
import {View, StyleSheet, Button, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {MicrosoftOauthScreen} from './src/components/connection/oauth/MicrosoftOauthScreen';
import {GoogleOauthScreen} from './src/components/connection/oauth/GoogleOauthScreen';
import {ManualSignInScreen} from './src/components/connection/login/login';
import {ManualSignUpScreen} from './src/components/connection/register/register';
import {HomePageScreen} from './src/components/homepage/homepage';

const ConnectionScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  base: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
  },
});

function ConnectionScreen({navigation}: any) {
  return (
    <SafeAreaView style={ConnectionScreenStyle.container}>
      <View style={ConnectionScreenStyle.base}>
        <Button
          title="Manual Sign In"
          onPress={() => navigation.navigate('ManualSignIn')}
        />
        <Button
          title="Manual Sign Up"
          onPress={() => navigation.navigate('ManualSignUp')}
        />
      </View>
      <View style={ConnectionScreenStyle.base}>
        <Button
          title="GOOGLE"
          onPress={() => navigation.navigate('GoogleOauthScreen')}
        />
      </View>
      <View style={ConnectionScreenStyle.base}>
        <Button
          title="MICROSOFT"
          onPress={() => navigation.navigate('MicrosoftOauthScreen')}
        />
      </View>
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Connection">
        <Stack.Screen name="Connection" component={ConnectionScreen} />
        <Stack.Screen name="ManualSignIn" component={ManualSignInScreen} />
        <Stack.Screen name="ManualSignUp" component={ManualSignUpScreen} />
        <Stack.Screen name="GoogleOauthScreen" component={GoogleOauthScreen} />
        <Stack.Screen
          name="MicrosoftOauthScreen"
          component={MicrosoftOauthScreen}
        />
        <Stack.Screen name="HomePageScreen" component={HomePageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
