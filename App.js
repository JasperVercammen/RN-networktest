import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Alert, View, Button } from 'react-native';
import Network from './Network';

const instructions = Platform.select({
  ios     : 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android : 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  pressHandler = async internal => {
    try {
      const url = internal
        ? 'https://www.keytradebank.be/node/backend/v1/keyhome/config/countries'
        : 'https://www.test.w.keytradebank.be/node/backend/release-react-native/v1/keyhome/config/countries';
      Alert.alert('Setup', `Ready to get ${url}`, [ { text: 'OK', onPress: () => console.log('OK Pressed') } ]);
      const result = await Network.get(url);
      Alert.alert('Response', internal ? result.data.join(' - ') : `${url} + ${result.data.join(' - ')}`, [ { text: 'OK', onPress: () => console.log('OK Pressed') } ]);
    } catch (err) {
      Alert.alert('ERROR', `There was an error during the network call: ${err.message}`, [ { text: 'OK', onPress: () => console.log('OK Pressed') } ]);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Button onPress={() => this.pressHandler(false)} title='Press me for test call' />
        <Text>{'\n'}</Text>
        <Button onPress={() => this.pressHandler(true)} title='Press me for production call' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container    : {
    flex            : 1,
    justifyContent  : 'center',
    alignItems      : 'center',
    backgroundColor : '#F5FCFF',
  },
  welcome      : {
    fontSize  : 20,
    textAlign : 'center',
    margin    : 10,
  },
  instructions : {
    textAlign    : 'center',
    color        : '#333333',
    marginBottom : 5,
  },
});
