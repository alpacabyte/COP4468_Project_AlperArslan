import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, ActivityIndicator} from 'react-native';
import Constants from 'expo-constants';

export default function UserPage({navigation}) {

  const [isLoaded, setLoaded] = useState(false);
  const [user, setUser] = useState([]);
  const [userAddress, setUserAddress] = useState([]);
  const [userCompany, setUserCompany] = useState([]);
  const [hasError, setError] = useState(false);

  useEffect(() => { 
     if (!isLoaded){
        fetch("https://jsonplaceholder.typicode.com/users/" + navigation.getParam('id')).then(response => {
        if (response.ok){
            return response.json();
          }
          return Promise.reject(response.json());
        }).then(user => {
        setLoaded(true);
        setUser(user);
        setUserAddress(user.address);
        setUserCompany(user.company);
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
     <View style = {{borderBottomWidth : 2, paddingBottom: 5, marginBottom: 5}}>
     <Text style = {styles.userHeader}> Name: </Text>
     <Text style = {styles.userText}> {user.name} {user.surname} </Text>
     </View>
     <View style = {{borderBottomWidth : 2, paddingBottom: 5, marginBottom: 5}}>
     <Text style = {styles.userHeader}> Username: </Text>
     <Text style = {styles.userText}> {user.username} </Text>
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
     <Text style = {styles.userHeader}> Website: </Text>
     <Text style = {styles.userText}> {user.website} </Text>
     </View>
     <View style = {{borderBottomWidth : 2, paddingBottom: 5, marginBottom: 5}}>
     <Text style = {styles.userHeader}> City: </Text>
     <Text style = {styles.userText}> {userAddress.city} </Text>
     </View>
     <View style = {{borderBottomWidth : 2, paddingBottom: 5, marginBottom: 5}}>
     <Text style = {styles.userHeader}> Street: </Text>
     <Text style = {styles.userText}> {userAddress.street} </Text>
     </View>
     <View style = {{borderBottomWidth : 2, paddingBottom: 5, marginBottom: 5}}>
     <Text style = {styles.userHeader}> Company: </Text>
     <Text style = {styles.userText}> {userCompany.name} </Text>
     </View>
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
  userText: {
    fontSize: 22,
    fontWeight: "500",
  },
});