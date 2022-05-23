import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';

export default function PostPage({navigation}) {

  const [isLoaded, setLoaded] = useState(false);
  const [post, setPost] = useState([]);

  useEffect(() => { 
     if (!isLoaded){
        fetch("https://jsonplaceholder.typicode.com/posts/" + navigation.getParam('id')).then(response => response.json()).then(post => {
        setLoaded(true);
        setPost(post);
    });
    }
  });

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
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    marginTop: 50,
    backgroundColor: '#ecf0f1',
    padding: 8,
    paddingLeft: 10
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