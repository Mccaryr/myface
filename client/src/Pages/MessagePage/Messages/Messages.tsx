import React from 'react'
import { useState } from 'react'
import Chats from '../Chats/Chats'
import './Messages.scss'

const Messages = () => {


  return (
    <div className='Messages-page-container'>
      <div className="chats-col">
        <div className="chats-col-header">
          <h3>Chats</h3>
          <button>Compose Message</button>
        </div>
        <div className="chats-col-search">
          <input type="text" placeholder="Search Messages" />
        </div>
        <Chats />
      </div>
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