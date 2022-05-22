import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';

export default function UserPage({navigation}) {

  const [isLoaded, setLoaded] = useState(false);
  const [user, setUser] = useState([]);
  const [userAddress, setUserAddress] = useState([]);

  useEffect(() => { 
     if (!isLoaded){
        fetch("https://jsonplaceholder.typicode.com/users/" + navigation.getParam('id')).then(response => response.json()).then(user => {
        setLoaded(true);
        setUser(user);
        setUserAddress(user.address);
    });
    }
  });

  return (
    <SafeAreaView style={styles.container}>
     <Text style = {styles.userHeader}> {user.name} {user.surname} </Text>
     <Text style = {styles.userHeader}> {user.email} </Text>
     <Text style = {styles.userHeader}> {user.phone} </Text>
     <Text style = {styles.userHeader}> {user.website} </Text>
     <Text style = {styles.userHeader}> {userAddress.city}</Text>
     <Text style = {styles.userHeader}> {userAddress.street}</Text>
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
    textAlign: 'center',
  },
  userText: {
    fontSize: 26,
    fontWeight: "200",
  },
});