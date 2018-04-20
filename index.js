import { 
    AppRegistry
} from 'react-native';
import App from './Components/App';
import React, {Component} from 'react';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
AppRegistry.registerComponent('GraphAPI', () => App);
