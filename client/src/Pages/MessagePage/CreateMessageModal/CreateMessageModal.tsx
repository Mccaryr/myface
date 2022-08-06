import { useState } from 'react';
import './CreateMessageModal.scss'
import TextareaAutosize from 'react-textarea-autosize';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_USERS } from '../../../Graphql/Queries';
import { CREATE_MESSAGE } from '../../../Graphql/Mutations';

const CreateMessageModal = (props: any) => {
    const [getFilteredUsers, {data: usersData}] = useLazyQuery(GET_USERS, {
        fetchPolicy: 'cache-and-network'
      })
    const [createMesage, {error}] = useMutation(CREATE_MESSAGE)
    const setComposeMessageModal = props.toggle
    const [messageReceiver, setMessageReceiver] = useState<any>({})
    const [messageContent, setMessageContent] = useState<String>('')
    
    const createMessageHandler = async () => {
      await createMesage({variables: {input: 
        {first_name: messageReceiver.first_name, last_name: messageReceiver.last_name, profile_url: messageReceiver.profile_url, 
            sender_id: sessionStorage.getItem('uid'), receiver_id: messageReceiver.user_id, content: messageContent}}})
    }

  return (
    <div className="create-message-modal-container">
        <button style={{top:0, right:0, position:'absolute', backgroundColor:'red', color:'white', borderRadius:'20px', width:'30px', height:'30px'}} onClick={() => setComposeMessageModal(false)}>x</button>
        <form>
            <div className="compose-message-form">
                <div className='compose-message-search'>
                    {messageReceiver ? 
                   
                    <div key={messageReceiver.user_id}>
                        <img src={messageReceiver.profile_url}  alt="profile"/>
                        <p>{messageReceiver.first_name} {messageReceiver.last_name}</p>
                        <button onClick={() => setMessageReceiver(null)}>Clear</button>
                    </div>
                    :
                    <>
                    <label style={{paddingRight:'20px'}}>To</label> 
                    <input type="search"  style={{textAlign:'center'}} placeholder="first or last name"  onChange={(e) => getFilteredUsers({variables: {filter_name: e.target.value}})}/>
                    </>
                    }
                    {usersData && !messageReceiver && usersData.users.map((user: any) => {
                        return (
                        <div key={user.user_id} className="person-search-dropdown" onClick={() => setMessageReceiver(user)}>
                            <img src={user.profile_url}  alt="profile"/>
                            <p>{user.first_name} {user.last_name}</p>
                        </div>
                        )
                    })
                    }
                </div>
                <div>
                    <TextareaAutosize minRows={4} style={{width:"25vw", borderRadius:'5px'}} onChange={(e) => setMessageContent(e.target.value)}/>
                </div>
                <button style={{borderRadius:'10px', width:'10vw', height:'40px', backgroundColor:'green', color:'white', cursor:'pointer'}} onClick={() => createMessageHandler()}>Submit Message</button>
            </div>
        </form>
    </div>
  )
}

export default CreateMessageModal