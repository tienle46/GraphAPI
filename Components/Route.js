import React from 'react';
import {StackNavigator} from 'react-navigation'
import ContentScreen from './ContentScreen'
import HomeScreen from './HomeScreen'

const HomeStack = StackNavigator({
    HomeScreen: {
        screen: HomeScreen
    },
    ContentScreen: {
        screen: ContentScreen
    }
}
)

export default HomeStack