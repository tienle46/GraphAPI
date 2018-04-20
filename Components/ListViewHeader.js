import React, {Component} from "react";
import {
    ListView, Text, View, StyleSheet, Button, Image, Dimensions, TouchableWithoutFeedback
} from 'react-native';
import {
    Header, Container, Left, Right, Body, Title, Icon, Item, Input, StyleProvider, Thumbnail
} from 'native-base'
import Moment from 'react-moment';

export default class ListViewHeader extends Component {
    render() {
        return(
            <View style = {styles.header}>
                <Thumbnail source = {this.props.thumbnailSource} />
                <View style = {styles.title}>
                    <View style = {{flexDirection: 'row'}}>
                        <Text style = {styles.name}>{this.props.name}</Text>
                        {/* <Text style = {styles.story}>{this.props.story}</Text> */}
                    </View>
                    <View style = {styles.time}>
                        <Text style = {{color: '#878787', fontSize: 14}} >‧ {this.props.time} ‧</Text>
                    </View>
                </View>   
            </View>
        );
    }
}
const styles = StyleSheet.create({
    header: {
        flex: 1,
        paddingTop: 10,
        marginLeft: 12,
        flexDirection: 'row',
    },
    name: {
        marginLeft: 10,
        fontSize: 15,
        fontWeight: 'bold'
    },
    time: {
        marginLeft: 10
    },
    title: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
});