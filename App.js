import { Text, View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Button} from 'react-native';
import Constants from 'expo-constants';
import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import HomePage from './home-page.js';
import UsersPage from './users-page.js';
import PostsPage from './posts-page.js';
import UserPage from './user-page.js';

const AppNavigator = createStackNavigator(
  {
    HomePage: {screen: HomePage},
    UsersPage: {screen: UsersPage},
    PostsPage: {screen: PostsPage},
    UserPage: {screen: UserPage},
  },
  {
    initialRouteName: 'HomePage',
    headerMode: 'none',
  }
)

export default createAppContainer(AppNavigator);
