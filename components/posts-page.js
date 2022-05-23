import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, ActivityIndicator} from 'react-native';
import Constants from 'expo-constants';



export default function PostsPage({navigation}) {

  const [isLoaded, setLoaded] = useState(false);
  const [posts, setPosts] = useState([]); 
  const [hasError, setError] = useState(false);

    useEffect(() => {
    if (!isLoaded){
    fetch("https://jsonplaceholder.typicode.com/posts").then(response => {
    if (response.ok){
       return response.json();
     }
     return Promise.reject(response.json());      
    }).then(posts => {
      setPosts(posts.slice(0, 20));
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
     <View style = {{borderBottomWidth : 2, marginBottom: 15}}>
        <Text style = {styles.postHeader}> Posts</Text> 
        </View>
      <FlatList
      data = {posts}
      keyExtractor = {({id}, index) => id}
      renderItem = {({item}) => (<TouchableOpacity onPress = {() => {navigation.navigate('PostPage', {id: item.id})}}> 
        <View style = {{borderBottomWidth : 1, marginBottom: 3}}>
        <Text style = {styles.postText}> #{item.id}-{item.title}</Text> 
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
  postHeader: {
    fontSize: 30,
    fontWeight: "500",
  },
  postText: {
    fontSize: 26,
    fontWeight: "200",
  },
});