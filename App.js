import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Alert, View, Button, FlatList } from 'react-native';
import Network from './Network';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.fl = null
    this.state = {
      callCount: 1,
      logs: [
        {key: '0', title: 'Initial log', message: 'This is the subtext'}
      ]
    }
  }

  pressHandler = async test => {
    const id = this.state.callCount
    try {
      const url = test
        ? 'https://www.stage.w.keytradebank.be/node/backend/v1/keyhome/config/countries'
        : 'https://www.keytradebank.be/node/backend/v1/keyhome/config/countries'
      this.addLog(`Started call - ${test ? 'TEST' : 'PROD'} - #${id}`, `Get ${url}`, true)
      const result = await Network.get(url);
      this.addLog(`Success call - ${test ? 'TEST' : 'PROD'} - #${id}`, `${result.data.join(' - ')}`, false)
      console.log(result);
    } catch (err) {
      this.addLog(`Failed call - ${test ? 'TEST' : 'PROD'} - #${id}`, `${err.message}`, false)
    }
  }

  addLog = (title, message, updateCount) => {
    this.setState({logs: [...this.state.logs, {key: this.state.logs.length, title, message}], callCount: updateCount ? this.state.callCount + 1 : this.state.callCount},
      () => {
        this.fl.scrollToEnd()
      })
  }

  truncate = (string, length=100) => {
    if (string.length > length) return string.substring(0,length)+'...';
    else return string;
 }; 

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttons}>
          <Button onPress={() => this.pressHandler(true)} title='Test call' />
          <Button onPress={() => this.pressHandler(false)} title='Production call' />
        </View>
        <FlatList
          ref={fl => this.fl = fl}
          style={styles.list}
          data={this.state.logs}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({item}) => (
            <View style={styles.row}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.text}>{this.truncate(item.message)}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container    : {
    flex            : 1,
    justifyContent  : 'center',
    backgroundColor : '#F5FCFF',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#D5DCDF'
  },
  list: {
    flex: 1,
    backgroundColor: '#F1F8FC'
  },
  row: {
    paddingVertical: 10,
    marginLeft: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  text: {
    color: '#777'
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#00000050',
    width: '100%',
    marginLeft: 16
  }
});
