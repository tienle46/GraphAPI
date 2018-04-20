import React, {Component} from "react";
import {
     Text, View, TouchableOpacity, TextInput
} from 'react-native';
import {
    Header, Container, Left, Right, Body, Title, Icon, Item, Input, StyleProvider, Thumbnail, Button, Toast,
} from 'native-base'

export default class HomeScreen extends Component {
    static navigationOptions = { header: null }
    render() {
        return(
            <View style = {{flex: 1, justifyContent: 'center', alignItems:'center', flexDirection: 'column'}}>
                <Text style = {{marginBottom: 10}}>Add Access_token from page: https://developers.facebook.com/tools/explorer/</Text>
                <TextInput
                style = {{height: 40, width: 300, borderWidth: 1, marginBottom: 10}}
                placeholder = {'Access Token'}
                onChangeText = {(text) => {
                    this.setState({
                        access_token: text
                    })}}
                />
                <TextInput
                style = {{height: 40, width: 300, borderWidth: 1, marginBottom: 10}}
                placeholder = {'Page ID or Page name'}
                onChangeText = {(text) => {
                    this.setState({
                        pageId: text
                    })}}
                />
                <TouchableOpacity style = {{backgroundColor: 'green'}} onPress = {() => {
                    //console.log(11111, this.state)
                    this.props.navigation.navigate('ContentScreen', {accessToken: this.state.access_token, pageId: this.state.pageId})
                }}>
                    <Text style = {{paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20, fontSize: 20, color: '#fff'}}>Go</Text>
                </TouchableOpacity>
            </View>
        )
    }
}