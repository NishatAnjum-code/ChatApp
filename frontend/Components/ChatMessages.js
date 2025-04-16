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

const socket = io('http://192.168.29.198:3000')

socket.on('connect', ()=>{console.log('connected to the server', socket.id)})

export default function ChatMessages({userName}) {


const [message, setMessage] = useState('');
const [groupMessages, setGroupMessages] = useState([]);

useEffect(() => {
  socket.on('received-message', (data)=>{
    console.log('message received', data)
  setGroupMessages((prevMessages)=>[...prevMessages, data])

  console.log('message rcv')
});

return ()=>{
  socket.off('received-message');
  }}, []); 


const sendMessage=()=>{
  const trimmed=(message || '').trim();
  if(!trimmed) return;

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

console.log('sending message', newMessage.id)
socket.emit('send-message', newMessage);
setMessage('');

};

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

const styles = StyleSheet.create({
  chatContainer: {
    justifyContent: 'center',
    // alignContent: 'center',
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
    // left: 3, 
    // top: 3,
  },
   
  chatTextContainer:{
    width: 'auto',
    minHeight: 50,
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.2,
    marginBottom: 10,
    // borderBottomLeftRadius:5,
    
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
    // left: 10, 
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