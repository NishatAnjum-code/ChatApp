//Import necessary components and hook;

import { Button, StyleSheet, TextInput, View, Text } from 'react-native'
import React, { useState } from 'react'

export default function JoinUserName({onJoin}) { 

  //Hook to store userName;
const[userName, setUserName]=useState('');


//This function is called when the user join the chat, by pressing the join button;
const handleJoin=()=>{
  console.log('user before join', userName)
  
  const newUserName=(userName || '').trim(); //This remove white spaces;
  if(newUserName) {
    onJoin(newUserName); //If there is a userName then pass it to the parent;
  }
};

  return (
      
      <View style={styles.container}>
      
    <Text style={styles.textTitle}>Enter a Username to join a chat!</Text>

      <TextInput 
      style={styles.userTextInput}
      value={userName}
      placeholder='Enter a Username to join chat' 
      onChangeText={setUserName}
      />

      <Button color={'#885d99'} title={'Join a Chat'} onPress={handleJoin}/>
    </View>

  );
}

//Styling part;
const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#efcdfb',
    gap: 20
  },

  userTextInput:{
    width: '80%',
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: "#e39ffd",

  },

  textTitle: {
    fontWeight: '500',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 30,
    color: '#a595ab'
  }


});