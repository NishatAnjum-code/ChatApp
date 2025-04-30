// Import required components and hooks;
import ChatMessages from './Components/ChatMessages';
import JoinUserName from './Components/JoinUserName'; 
import { useState } from 'react';

export default function App() {

  // State to store the user's name;
  const [userName, setUserName]=useState(null);

  // If username is not set, show the join screen;
  if(!userName){
      return <JoinUserName onJoin={setUserName}/>
  }

  // Once username is set, show the chat screen;
{
  return <ChatMessages userName={userName}/>
}
  };




