import React from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import './Chats.scss'
import { GET_ALL_USER_CHATS, GET_ALL_USER_MESSAGES } from '../../../Graphql/Queries'

const Chats = (props: any) => {
  const setProfileSelected = props.profileSelected
  const setMessages = props.setMessages
  const getMessagesFromChat = props.getMessagesFromChat 
  const {data: chatData, error } = useQuery(GET_ALL_USER_CHATS, {
    variables: {user_id: sessionStorage.getItem('uid')}
  })

  
  return (
    <div className="chats-preview">
        {/* <div className="chat">  
            <div>
                <img src="https://myfacephotos.s3.amazonaws.com/65fd8451eb0c289f8bfd9dff80404133" alt="profile" style={{height:'50px', width:'50px', borderRadius:'100px'}}/>
            </div>
            <div>
                <h4>Rob McCary</h4>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic</p>
            </div> 
        </div>            */}
        {chatData && chatData?.user_chats.map((chat: any) => {
          return(
            <div key={chat.createdAt} className='chat' onClick={async () => {
              setProfileSelected(chat)
              await getMessagesFromChat({variables: {conversation_id: chat.conversation_id}})
              }}>
              <div>
                <img alt="chat profile" src={chat.profile_url} style={{height:'60px', width:'60px', borderRadius:'100px'}} />
              </div>
              <div>
                <h5>{chat.first_name + " " + chat.last_name}</h5>
                <p>{chat.createdAtString}</p>
                <p>{chat.content}</p>
              </div>
            </div> 
          )
        })}
    </div>
  )
}

export default Chats