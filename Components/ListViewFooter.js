import React, {Component} from "react";
import {
    ListView, Text, View, StyleSheet, Button, Image, Dimensions, TouchableWithoutFeedback
} from 'react-native';
import {
    Header, Container, Left, Right, Body, Title, Icon, Item, Input, StyleProvider, Thumbnail
} from 'native-base'
const like = require('../images/like.png');

export default class ListViewFooter extends Component {
    render() {
        return(
            <View>
                    <View style = {styles.likeContainer}>
                    <Image source = {like} style = {styles.like}/>
                    <Text style = {{marginLeft: 4, color: '#878787', fontSize: 15}}>10</Text>
                </View>
                <View style = {styles.actionContainer}>
                    <Text style = {styles.actionText}>Like</Text>
                    <Text style = {styles.actionText}>Comment</Text>
                    <Text style = {styles.actionText}>Share</Text>
                </View>
            </View> 
        );
    }
}

const styles = StyleSheet.create({
    like: {
        width: 15,
        height: 15,
        borderRadius: 15/2,
    },
    likeContainer: {
        height: 35,
        marginLeft:10,
        marginRight:10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E2E2',
        alignItems: 'center'
    },
    actionContainer: {
        height: 35,
        marginLeft:10,
        marginRight:10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    actionText: {
        fontSize: 15,
        color: '#545454'
    },
});