import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';



export default function PostsPage() {

  const [isLoaded, setLoaded] = useState(false);
  const [posts, setPosts] = useState([]);

    useEffect(() => {
    if (!isLoaded){
    fetch("https://jsonplaceholder.typicode.com/posts").then(response => response.json()).then(posts => {
      setPosts(posts.slice(0, 20));
      setLoaded(true);
    });}
  });
  

  return (
    <SafeAreaView style={styles.container}>
     <View style = {{borderBottomWidth : 2, marginBottom: 15}}>
        <Text style = {styles.postHeader}> Posts</Text> 
        </View>
      <FlatList
      data = {posts}
      keyExtractor = {({id}, index) => id}
      renderItem = {({item}) => (<TouchableOpacity onPress = {()=>{
        console.log(item.id);
      }}> 
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
  postHeader: {
    fontSize: 30,
    fontWeight: "500",
  },
  postText: {
    fontSize: 26,
    fontWeight: "200",
  },
});