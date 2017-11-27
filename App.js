import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Alert,
  View,
  Button,
} from 'react-native';
import Network from './Network';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  pressHandler = async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts/1'
    Alert.alert(
      'Response',
      `Ready to get ${url}`,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')}
      ]
    )
    const result = await Network.get(url)
    Alert.alert(
      'Response',
      result.title,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')}
      ]
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
          <Button onPress={this.pressHandler} title='Press me'/>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
