import React, {Component} from "react";
import {
    Text, View, StyleSheet, Image, Dimensions, TouchableWithoutFeedback
} from 'react-native';
import {
    Header, Container, Left, Right, Body, Title, Icon, Item, Input, StyleProvider, Thumbnail
} from 'native-base'

export default class Items extends Component {
    render() {
        const {imageSource} = this.props;
        const firstImage = imageSource && imageSource.length > 0 ? imageSource[0] : null;
        
        return(
            <View style = {styles.content}>
                {firstImage ? <TouchableWithoutFeedback
                    onPress = {() => {
                        this.props.action(firstImage, imageSource, true)
                    }}
                >
                    <Image resizeMode="contain" source = {{uri: firstImage}} style = {styles.image}/>
                </TouchableWithoutFeedback> : null}
            </View>
        );
    }
}

let {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: width,
        height: height
    },
    content: {
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        height: 250,
    }
});