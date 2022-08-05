import { useState } from 'react';
import './CreateMessageModal.scss'
import TextareaAutosize from 'react-textarea-autosize';
import { useLazyQuery } from '@apollo/client';
import { GET_USERS } from '../../../Graphql/Queries';

const CreateMessageModal = (props: any) => {
    const [getFilteredUsers, {data: usersData}] = useLazyQuery(GET_USERS, {
        fetchPolicy: 'cache-and-network'
      })
    const setComposeMessageModal = props.toggle
    const [selectedProfile, setSelectedProfile] = useState<any>({}) 

  return (
    <div className="create-message-modal-container">
        <button style={{top:0, right:0, position:'absolute', backgroundColor:'red', color:'white', borderRadius:'20px', width:'30px', height:'30px'}} onClick={() => setComposeMessageModal(false)}>x</button>
        <form>
            <div className="compose-message-form">
                <div className='compose-message-search'>
                    {selectedProfile ? 
                   
                    <div key={selectedProfile.user_id}>
                        <img src={selectedProfile.profile_url}  alt="profile"/>
                        <p>{selectedProfile.first_name} {selectedProfile.last_name}</p>
                        <button onClick={() => setSelectedProfile(null)}>Clear</button>
                    </div>
                    :
                    <>
                    <label style={{paddingRight:'20px'}}>To</label> 
                    <input type="search"  style={{textAlign:'center'}} placeholder="first or last name"  onChange={(e) => getFilteredUsers({variables: {filter_name: e.target.value}})}/>
                    </>
                    }
                    {usersData && !selectedProfile && usersData.users.map((user: any) => {
                        return (
                        <div key={user.user_id} className="person-search-dropdown" onClick={() => setSelectedProfile(user)}>
                            <img src={user.profile_url}  alt="profile"/>
                            <p>{user.first_name} {user.last_name}</p>
                        </div>
                        )
                    })
                    }
                </div>
                <div>
                    <TextareaAutosize minRows={4} style={{width:"25vw", borderRadius:'5px'}}/>
                </div>
                <button style={{borderRadius:'10px', width:'10vw', height:'40px', backgroundColor:'green', color:'white', cursor:'pointer'}}>Submit Message</button>
            </div>
        </form>
    </div>
  )
}

export default CreateMessageModal