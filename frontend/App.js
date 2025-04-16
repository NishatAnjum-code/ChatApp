import ChatMessages from './Components/ChatMessages';
import JoinUserName from './Components/JoinUserName'; 
import { useState } from 'react';

export default function App() {

  const [userName, setUserName]=useState(null);

  if(!userName){
      return <JoinUserName onJoin={setUserName}/>
  }

{
  return <ChatMessages userName={userName}/>
}
  };




