import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, ActivityIndicator, ScrollView,} from 'react-native';
import Constants from 'expo-constants';
import { Appbar } from 'react-native-paper';

export default function PostPage({navigation}) {

  const [isLoaded, setLoaded] = useState(false);
  const [user, setUser] = useState([]);
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]); 
  const [hasError, setError] = useState(false);

  useEffect(() => { 
     if (!isLoaded){
        fetch("https://jsonplaceholder.typicode.com/posts/" + navigation.getParam('id')).then(response => {
          if (response.ok){
            return response.json();
          }
          return Promise.reject(response.json());
        }).then(post => {
        setPost(post);
        fetch("https://jsonplaceholder.typicode.com/posts/" + navigation.getParam('id') + "/comments").then(response => {
          if (response.ok){
            return response.json();
          }
          return Promise.reject(response.json());
        }).then(comments => {
          setComments(comments);
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
    <Text style = {styles.postTitle}>{post.title}</Text>
    </Appbar.Header>
     <Text style = {styles.postText}>{post.body}</Text>
     <View style = {{borderTopWidth : 2, paddingBottom: 5, paddingTop: 5,marginTop: 5}}>
     <Text style = {styles.commentsTitle}> Comments </Text>
     </View>
     <FlatList
      data = {comments}
      scrollEnabled={false}
      keyExtractor = {({id}, index) => id}
      renderItem = {({item}) => (
        <View style = {{borderBottomWidth : 1, marginBottom: 10, paddingBottom: 10}}>
        <Text style = {styles.commentsMail}>{item.email}</Text> 
        <View style = {{borderBottomWidth : 0.3, marginBottom: 3, paddingBottom: 3}}> 
        </View>
        <Text style = {styles.commentsBody}>{item.body}</Text> 
        </View>
     )}/>
     </ScrollView>
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
    fontSize: 22,
    fontWeight: "500",
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  commentsTitle: {
    fontSize: 23,
    fontWeight: "500",
    textAlign: 'left',
  },
  commentsMail: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: 'left',
  },
  commentsBody: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: 'left',
  },
  postText: {
    fontSize: 22,
    fontWeight: "400",
  },
});