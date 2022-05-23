import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';


export default function UsersPage({navigation}) {

  const [users, setUsers] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
     if (!isLoaded){
       fetch("https://jsonplaceholder.typicode.com/users").then(response => response.json()).then(users => {
      setUsers(users);
      setLoaded(true);
    });
    }
  });

  return (
    <SafeAreaView style={styles.container}>
     <View style = {{borderBottomWidth : 2, marginBottom: 15}}>
        <Text style = {styles.userHeader}> Users</Text> 
        </View>
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
  userHeader: {
    fontSize: 30,
    fontWeight: "500",
  },
  userText: {
    fontSize: 26,
    fontWeight: "200",
  },
});