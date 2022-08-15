import React from 'react'
import { useState } from 'react'
import Chats from '../Chats/Chats'
import CreateMessageModal from '../CreateMessageModal/CreateMessageModal'
import TextareaAutosize from 'react-textarea-autosize';
import { useMutation, useLazyQuery } from '@apollo/client';
import { CREATE_MESSAGE } from '../../../Graphql/Mutations';
import './Messages.scss'
import { GET_ALL_USER_MESSAGES } from '../../../Graphql/Queries';


// interface Message {
//   content: String 
//   conversation_id: String 
//   createdAt: String 
//   createdAtString: String 
//   first_name: String 
//   last_name: String 
//   profile_url: String 
//   receiver_id: String 
//   sender_id: String 
// }

const Messages = () => {

  const [composeMessageModal, setComposeMessageModal] = useState<boolean>(false)
  const [profileSelected, setProfileSelected] = useState<any>({})
  const [messageContent, setMessageContent] = useState<String>('')
  const [messageReceiver, setMessageReceiver] = useState<any>({})
  const [messages, setMessages] = useState<any>([])
  const [createMesage, {error}] = useMutation(CREATE_MESSAGE)
  const [getMessagesFromChat, {data: messageData}] = useLazyQuery(GET_ALL_USER_MESSAGES)

  const createMessageHandler = async (e: any) => {
    setMessageContent(e.target.value)

    if(e.key === 'Enter' && messageContent.length > 0) {
      await createMesage({variables: {input: 
        {first_name: messageReceiver.first_name, last_name: messageReceiver.last_name, profile_url: messageReceiver.profile_url, 
        sender_id: sessionStorage.getItem('uid'), receiver_id: messageReceiver.user_id, content: messageContent}}})
    }
  }

  return (
    <div className='Messages-page-container'>
      <div className="chats-col">
        <div className="chats-col-header">
          <h3>Chats</h3>
          <button onClick={() => setComposeMessageModal(true)}>Compose Message</button>
        </div>
        <div className="chats-col-search">
          <input type="text" placeholder="Search Messages" />
        </div>
        <Chats profileSelected={setProfileSelected} setMessages={setMessages} getMessagesFromChat={getMessagesFromChat}/>
      </div>
      {composeMessageModal && <CreateMessageModal toggle={setComposeMessageModal}/>}
      <div className="messages-col">
        <h2>Messages</h2>
        {messageData && messageData?.user_messages?.map((message: any) => {
          return (
              <div key={message.createdAt} className='message-container'>
                <img src={message.profile_url} style={{height:'50px', width:'50px', borderRadius:'100px', marginRight:'15px'}}/>
                <p>{message.content}</p>
              </div>
          )
        })}
        {Object.keys(profileSelected).length > 0 && 
          <div className="compose-message">
            <TextareaAutosize minRows={4} style={{width:"35vw", borderRadius:'5px'}} onChange={(e) => createMessageHandler(e)}/>
          </div>
        }  
      </div>
      {Object.keys(profileSelected).length > 0 &&
      <div className="selected-profile-col">
        <img src={profileSelected.profile_url} style={{height:'100px', width:'100px', borderRadius:'100px'}}/>
        <h3>{profileSelected.first_name + " " + profileSelected.last_name}</h3>
      </div>
      }
    </div>
  )
}

export default Messages