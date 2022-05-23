import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, ActivityIndicator} from 'react-native';
import Constants from 'expo-constants';

export default function PostPage({navigation}) {

  const [isLoaded, setLoaded] = useState(false);
  const [user, setUser] = useState([]);
  const [post, setPost] = useState([]);
  const [hasError, setError] = useState(false);

  useEffect(() => { 
     if (!isLoaded){
        fetch("https://jsonplaceholder.typicode.com/posts/" + navigation.getParam('id')).then(response => {
          if (response.ok){
            return response.json();
          }
          return Promise.reject(response.json());
        }).then(post => {
        setLoaded(true);
        setPost(post);
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
     <Text style = {styles.postTitle}>{post.title}</Text>
     </View>
     <Text style = {styles.postText}>{post.body}</Text>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  loadingIndicator:{
    flex: 1,
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    marginTop: 50,
    backgroundColor: '#ecf0f1',
    padding: 8,
    paddingLeft: 10
  },
  error: {
    fontSize: 23,
    fontWeight: "500",
    textAlign: 'center',
  },
  postTitle: {
    fontSize: 23,
    fontWeight: "500",
    textAlign: 'center',
  },
  postText: {
    fontSize: 22,
    fontWeight: "400",
  },
});