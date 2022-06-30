import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, ActivityIndicator, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import { Icon } from '@rneui/themed';
import { Appbar } from 'react-native-paper';

export default function UserPage({navigation}) {

  const [isLoaded, setLoaded] = useState(false);
  const [user, setUser] = useState([]);
  const [userAddress, setUserAddress] = useState([]);
  const [userCompany, setUserCompany] = useState([]);
  const [todos, setTodos] = useState([]); 
  const [hasError, setError] = useState(false);

  useEffect(() => { 
     if (!isLoaded){
        fetch("https://jsonplaceholder.typicode.com/users/" + navigation.getParam('id')).then(response => {
        if (response.ok){
            return response.json();
          }
          return Promise.reject(response.json());
        }).then(user => {
        setUser(user);
        setUserAddress(user.address);
        setUserCompany(user.company);
        fetch("https://jsonplaceholder.typicode.com/todos?userId=" + navigation.getParam('id')).then(response => {
          if (response.ok){
            return response.json();
          }
          return Promise.reject(response.json());
        }).then(comments => {
          setTodos(comments);
          setLoaded(true);
          });
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
    <ScrollView>
    <Appbar.Header style = {{backgroundColor: 'transparent'}}>
    <Appbar.BackAction onPress={() => {navigation.pop()}} />
    <Text style = {styles.userText}>{user.name}</Text>
    </Appbar.Header>
     <View style = {{borderBottomWidth : 2, paddingBottom: 5, marginBottom: 5}}>
     <Text style = {styles.userHeader}> Username: </Text>
     <Text style = {styles.userText}> {user.username} {user.surname} </Text>
     </View>
     <View style = {{borderBottomWidth : 2, paddingBottom: 5, marginBottom: 5}}>
     <Text style = {styles.userHeader}> E-mail: </Text>
     <Text style = {styles.userText}> {user.email} </Text>
     </View>
     <View style = {{borderBottomWidth : 2, paddingBottom: 5, marginBottom: 5}}>
     <Text style = {styles.userHeader}> Phone Number: </Text>
     <Text style = {styles.userText}> {user.phone} </Text>
     </View>
     <View style = {{borderBottomWidth : 2, paddingBottom: 5, marginBottom: 5}}>
     <Text style = {styles.userHeader}> City: </Text>
     <Text style = {styles.userText}> {userAddress.city} </Text>
     </View>
     <View style = {{borderBottomWidth : 2, paddingBottom: 5, marginBottom: 5}}>
     <Text style = {styles.userHeader}> Company: </Text>
     <Text style = {styles.userText}> {userCompany.name} </Text>
     </View>
     <TouchableOpacity onPress = {() => {navigation.navigate('AlbumsPage', {id: navigation.getParam('id')})}}> 
     <View style = {{borderBottomWidth : 2, paddingBottom: 5, marginBottom: 5}}>
     <Text style = {styles.goToAlbumTitle}>Go To Albums of This User</Text>
     </View>
     </TouchableOpacity>
     <View style = {{paddingBottom: 5, marginBottom: 5}}>
     <Text style = {styles.todoTitle}>TODOS</Text>
     </View>
      <FlatList
      data = {todos}
      scrollEnabled={false}
      keyExtractor = {({id}, index) => id}
      renderItem = {({item, index}) => 
       {
        if (item.completed)
        {
          return <View style ={styles.rowFlex}>
          <Icon style = {styles.icon} name='check-box'/>
          <Text style = {styles.todoName}>{item.title}</Text> 
          </View>;
        }
        return <View style ={styles.rowFlex}>
          <Icon style = {styles.icon} name='check-box-outline-blank'/>
          <Text style = {styles.todoName}>{item.title}</Text> 
          </View>;
        }
     }/>
     </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 20,
    fontWeight: "400",
  },
  rowFlex: {
    flexDirection: "row",
    borderBottomWidth : 1, 
    alignItems: "center",
    marginBottom: 10, 
    paddingBottom: 10,
  },
  userText: {
    fontSize: 22,
    fontWeight: "500",
  },
  goToAlbumTitle: {
    fontSize: 22,
    fontWeight: "500",
    textAlign: "center",
    color: '#2a9df4',
  },
  todoTitle: {
    fontSize: 22,
    fontWeight: "500",
    textAlign: "center",
  },
  todoName: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "left",
  },
  icon: {
    fontSize: 20,
    paddingRight: 10,
    fontWeight: "500",
    textAlign: "center",
  },
});