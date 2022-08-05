import React from 'react'
import { useState } from 'react'
import Chats from '../Chats/Chats'
import CreateMessageModal from '../CreateMessageModal/CreateMessageModal'
import './Messages.scss'

const Messages = () => {

  const [composeMessageModal, setComposeMessageModal] = useState<boolean>(false)


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
        <Chats />
      </div>
      {composeMessageModal && <CreateMessageModal toggle={setComposeMessageModal}/>}
      <div className="messages-col">
        Messages Column 
      </div>
      <div className="selected-profile-col">
        Selected Profile Column

      </div>
    </div>
  )
}

export default Messages