import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import { useAppSelector } from '../../app/hooks';
import { DELETE_POST } from '../../Graphql/Mutations';
import './Post.scss'

interface Props {
    id: number,
    user_id: string, 
    content: string 
}

const Post: React.FC<Props> = ({id, user_id, content}) => {
  const uid = useAppSelector((state) => state.user.uid)
  const [canEdit, setCanEdit] = useState<boolean>(false)
  const [deletePost, {error}] = useMutation(DELETE_POST)



  return (
    <div className='post-container'>
        {uid === user_id ? 
        <div className="post-feed-text">
          <TextareaAutosize minRows={4} className="feed-textarea" value={content} />
          <button>Edit Post</button>
          <button className='submit-button' onClick={()=> deletePost({variables: {id: id}})}>x</button>
        </div>
        :         
        <div>{content}</div>
    }   
    </div>
  )
}

export default Post