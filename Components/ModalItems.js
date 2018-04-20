import React, {Component} from "react";
import {
    ListView, Text, View, StyleSheet, Button, Image, Dimensions, TouchableWithoutFeedback
} from 'react-native';
import {
    Header, Container, Left, Right, Body, Title, Icon, Item, Input, StyleProvider, Thumbnail
} from 'native-base'
import Swiper from 'react-native-swiper';

export default class ModalItems extends Component {
    render() {
        var imageSource = this.props.imageSource || [];
        return(
            <Swiper>
                {imageSource.map((image, index) => {
                    return <View style={{flex: 1}} key = {index}>
                        <Image resizeMode = 'contain' source = {{uri: image}} style = {styles.imageDetail}/>
                    </View>
                })}
            </Swiper>
        );
    }
}

let {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
    imageDetail: {
        backgroundColor: 'black',
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        height: height,
    },
});