import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, ActivityIndicator} from 'react-native';
import Constants from 'expo-constants';
import { Appbar } from 'react-native-paper';

export default function UsersPage({navigation}) {

  const [users, setUsers] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [hasError, setError] = useState(false);

  useEffect(() => {
     if (!isLoaded){
       fetch("https://jsonplaceholder.typicode.com/users").then(response => {
     if (response.ok){
       return response.json();
     }
     return Promise.reject(response.json());   
       }).then(users => {
      setUsers(users);
      setLoaded(true);
    }).catch(err => {setError(true)});
    }
  });
  
  if (hasError){
    return <View style= {styles.loadingIndicator}>
    <Text style = {styles.error}> Unexpected Error! </Text>
    </View>
  }
  
  if (!isLoaded){
    return <View style= {styles.loadingIndicator}>
    <ActivityIndicator />
    </View>
  }

  return (
    <SafeAreaView style={styles.container}>
    <Appbar.Header style = {{backgroundColor: 'transparent'}}>
    <Appbar.BackAction onPress={() => {navigation.pop()}} />
    <Text style = {styles.userHeader}>Users</Text>
    </Appbar.Header>
      <FlatList
      data = {users}
      keyExtractor = {({id}, index) => id}
      renderItem = {({item}) => (<TouchableOpacity onPress = {() => {navigation.navigate('UserPage', {id: item.id})}}> 
        <View style = {{borderBottomWidth : 1, marginBottom: 3}}>
        <Text style = {styles.userText}> {item.name}</Text> 
        </View>
      </TouchableOpacity>)}/>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    marginTop: 50,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  loadingIndicator:{
    flex: 1,
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
  },
  error: {
    fontSize: 23,
    fontWeight: "500",
    textAlign: 'center',
  },
  userHeader: {
    fontSize: 22,
    fontWeight: "500",
  },
  userText: {
    fontSize: 26,
    fontWeight: "200",
  },
});