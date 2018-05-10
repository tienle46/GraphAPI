import React, {Component} from "react";
import {
    Text, View, StyleSheet, Button, Image, Dimensions,
} from 'react-native';
import {
    Header, Container, Left, Right, Body, Title, Icon, Item, Input, StyleProvider, Thumbnail
} from 'native-base'
import getTheme from '../native-base-theme/components'
import headerStyle from './headerStyle';
import platform from '../native-base-theme/variables/platform.js';

export default class CustomHeader extends Component {
    render() {
        return(
            <StyleProvider style={getTheme(headerStyle)}>   
                <Header searchBar rounded iosBarStyle="light-content">
                    <Left>
                        <Icon name='camera'/>
                    </Left>
                    <Item >
                        <Icon name="ios-search" />
                        <Input placeholder="Search" />
                        <Icon name="ios-people" />
                    </Item>
                    <Right>
                        <Icon name = 'chatboxes'/>
                    </Right>
                </Header>
            </StyleProvider>
        );
        
    }
}