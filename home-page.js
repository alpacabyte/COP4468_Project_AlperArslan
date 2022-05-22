import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, SafeAreaView} from 'react-native';
import Constants from 'expo-constants';

export default class HomePage extends Component{
  render(){ return(
    <SafeAreaView style={styles.container}>
     <Text style = {styles.paragraph}> Alper Arslan </Text> 
     <Text style = {styles.paragraph}> 1804777 </Text> 
      <Text style = {styles.paragraph}> COP4468 Project </Text> 
      <TouchableOpacity style = {styles.button} onPress = {() => {this.props.navigation.navigate('UsersPage')}}>
        <Text style = {styles.buttonText}> Users </Text>
      </TouchableOpacity> 
      <TouchableOpacity style = {styles.button} onPress = {() => {this.props.navigation.navigate('PostsPage')}}>
        <Text style = {styles.buttonText}> Posts </Text>
      </TouchableOpacity> 
    </SafeAreaView>
    )}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    marginTop: 50,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#2a9df4',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
  },
  paragraph: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});