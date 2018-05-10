import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ListView,
  ActivityIndicator,
  AppRegistry
} from 'react-native';
import ContentScreen from './ContentScreen.js';
import HomeStack from './Route.js'

export default class GraphAPI extends Component {
  render() {
    return (
        <HomeStack />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D1D1D1',
  },
});
