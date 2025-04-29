//Import all the necessary components, hooks, icon, library;
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import io from "socket.io-client";

const socket = io('https://water-trite-persimmon.glitch.me', {transports: ["websockets"]});

socket.on('connect', ()=>{console.log('connected to the server', socket.id)}) //Log the message, when the app connected to the server;

export default function ChatMessages({userName}) {

//Hooks for managing messages;
const [message, setMessage] = useState('');
const [groupMessages, setGroupMessages] = useState([]);

//This runs when the app opens;
useEffect(() => {
  //Listen the messages from the server;
  socket.on('received-message', (data)=>{
    console.log('Message Received', data)
    //Add new messages to the list;
  setGroupMessages((prevMessages)=>[...prevMessages, data])

});

//Clean up when the app closes;
return ()=>{
  socket.off('received-message');
  }}, []); 

//This function sends the messages to the server;
const sendMessage=()=>{
  const trimmed=(message || '').trim();
  if(!trimmed) return; //remove white spaces and don't send empty messages;

  //Create a message object;
  const newMessage={
    id: `${Date.now()}-${Math.floor(Math.random()*1000000)}`,
    message: trimmed,
    sender: userName,
    time: new Date().toLocaleTimeString([],{
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }),
    date: new Date().toLocaleDateString('en-us', {
       month: 'long', 
       day: "numeric",
    }
    )

  };

  //Send the message to the server;
console.log('sending message', newMessage.id)
socket.emit('send-message', newMessage);
setMessage(''); //Clear the input field;

};
//How each message looks on the app;
  const renderMessages=({item})=>{
if(!item || typeof item !== 'object')
  return null;

   
return(
  <View 
  style={styles.chatTextContainer}> 
<Text style={styles.chatText}>{item.message}</Text>
<Text style={{fontSize: 10, fontStyle: 'italic', alignSelf: 'flex-end', top: 10, right: 20}}>{item.date} {item.time}</Text>


  </View>
);};
 
  return (
    <>
      <SafeAreaView style={styles.chatContainer}>
      
          <FlatList
          style={styles.chatList}
          data={groupMessages}
          keyExtractor={(item, index) =>item.id || `key-${index}`}
          ItemSeparatorComponent={()=><View style={{height: 20}}/>}
          renderItem={renderMessages}
         />



        <View style={styles.ChatTextInput}>
            <TextInput
              value={message}
              placeholder="Lets start a Chat!"
              onChangeText={setMessage}
              autoCapitalize="words"
             
            ></TextInput>

           <TouchableOpacity style={styles.chatIcon} onPress={sendMessage}>
            <Feather
              name="send"
              size={24}
              color="black"/>
          </TouchableOpacity>

        </View>
       
      </SafeAreaView>
    </>
  );
}

//Styling part;

const styles = StyleSheet.create({
  chatContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#f3dcf3',
    position: 'relative',
    flex: 1,
     
     
  },
  
  chatText:{
    fontWeight: '500', 
    fontSize: 15,
    fontStyle: 'italic',
 
  },
   
  chatTextContainer:{
    width: 'auto',
    minHeight: 50,
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.2,
    marginBottom: 10,
    
  },

  chatList: {
    alignSelf: 'flex-start',
    left: 20,
    flex: 1,
    width: '100%'
},

  ChatTextInput: {
    width: '80%',
    height: 50,
    borderRadius: 80,
    borderWidth: 1,
    backgroundColor: "#d8aafc",
    flexDirection: 'row',
    alignSelf: 'center', 
    bottom: 20,
  
  },

  chatIcon:{
    alignSelf:'center',
    marginLeft: 280,
    position: 'absolute'
  },

 
});