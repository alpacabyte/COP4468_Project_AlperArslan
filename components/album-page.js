import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, ActivityIndicator, ScrollView, Image,} from 'react-native';
import Constants from 'expo-constants';
import { Appbar } from 'react-native-paper';

export default function AlbumPage({navigation}) {

  const [isLoaded, setLoaded] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [hasError, setError] = useState(false);

  useEffect(() => { 
     if (!isLoaded){
        fetch("https://jsonplaceholder.typicode.com/albums/" + navigation.getParam('id') + "/photos").then(response => {
          if (response.ok){
            return response.json();
          }
          return Promise.reject(response.json());
        }).then(photos => {
        setPhotos(photos);
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
    <ScrollView>
    <Appbar.Header style = {{backgroundColor: 'transparent'}}>
    <Appbar.BackAction onPress={() => {navigation.pop()}} />
    <Text style = {styles.title}>Photos</Text>
    </Appbar.Header>
     <FlatList
      data = {photos}
      scrollEnabled={false}
      keyExtractor = {({id}, index) => id}
      renderItem = {({item}) => (
        <View style = {{borderBottomWidth : 1, marginBottom: 10, paddingBottom: 10, marginLeft: 2, marginRight: 2}}>
        <Text style = {styles.photoTitle}>{item.title}</Text> 
        <Image
          style={{width: '60%', alignSelf: 'center', aspectRatio: 1}}
          source={{uri: item.url}}
      />
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
  title: {
    fontSize: 22,
    fontWeight: "500",
    textAlign: 'center',
  },
  photoTitle: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: 'left',
    paddingBottom: 15,
  },
});