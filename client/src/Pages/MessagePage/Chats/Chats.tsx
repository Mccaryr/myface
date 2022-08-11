import React from 'react'
import { useQuery } from '@apollo/client'
import './Chats.scss'

const Chats = (props: any) => {
  const setProfileSelected = props.profileSelected

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
    </div>
  )
}

export default Chats