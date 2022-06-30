import { Text, View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Button} from 'react-native';
import Constants from 'expo-constants';
import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import HomePage from './components/home-page.js';
import UsersPage from './components/users-page.js';
import PostsPage from './components/posts-page.js';
import UserPage from './components/user-page.js';
import PostPage from './components/post-page.js';
import AlbumsPage from './components/albums-page.js';
import AlbumPage from './components/album-page.js';

const AppNavigator = createStackNavigator(
  {
    HomePage: {screen: HomePage},
    UsersPage: {screen: UsersPage},
    PostsPage: {screen: PostsPage},
    UserPage: {screen: UserPage},
    PostPage: {screen: PostPage},
    AlbumsPage: {screen: AlbumsPage},
    AlbumPage: {screen: AlbumPage},
  },
  {
    initialRouteName: 'HomePage',
    headerMode: 'none',
  }
)

export default createAppContainer(AppNavigator);
