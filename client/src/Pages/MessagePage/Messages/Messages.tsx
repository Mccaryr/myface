import React from 'react'
import { useState } from 'react'
import Chats from '../Chats/Chats'
import CreateMessageModal from '../CreateMessageModal/CreateMessageModal'
import TextareaAutosize from 'react-textarea-autosize';
import { useMutation } from '@apollo/client';
import { CREATE_MESSAGE } from '../../../Graphql/Mutations';
import './Messages.scss'

const Messages = () => {

  const [composeMessageModal, setComposeMessageModal] = useState<boolean>(false)
  const [profileSelected, setProfileSelected] = useState<boolean>(false)
  const [messageContent, setMessageContent] = useState<String>('')
  const [messageReceiver, setMessageReceiver] = useState<any>({})
  const [createMesage, {error}] = useMutation(CREATE_MESSAGE)

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
        <Chats profileSelected={setProfileSelected}/>
      </div>
      {composeMessageModal && <CreateMessageModal toggle={setComposeMessageModal}/>}
      <div className="messages-col">
        Messages Column
        {profileSelected && 
          <div className="compose-message">
          <TextareaAutosize minRows={4} style={{width:"35vw", borderRadius:'5px'}} onChange={(e) => createMessageHandler(e)}/>
        </div>
        }  
      </div>
      <div className="selected-profile-col">
        Selected Profile Column
      </div>
    </div>
  )
}

export default Messages