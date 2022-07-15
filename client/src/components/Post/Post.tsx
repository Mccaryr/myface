import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import { useAppSelector } from '../../app/hooks';
import { DELETE_POST } from '../../Graphql/Mutations';
import { UPDATE_POST } from '../../Graphql/Mutations';
import './Post.scss'

interface Props {
    id: number,
    user_id: string, 
    content: string 
}

const Post: React.FC<Props> = ({id, user_id, content}) => {
  const uid = useAppSelector((state) => state.user.uid)
  const [canEdit, setCanEdit] = useState<boolean>(false)
  const [deletePost] = useMutation(DELETE_POST)
  const [updatePost] = useMutation(UPDATE_POST)
  const [currentContent, setCurrentContent] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  
  const submitContentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setNewContent(e.target.value)
  }

  return (
    <div className='post-container'>
        {uid === user_id && canEdit===false && 
        <div className="post-feed-text">
          <div>{content}</div>
          <button className='edit-button' onClick={() => {setCanEdit(true); setCurrentContent(content); setNewContent(content)} }>Edit Post</button>
          <button className='submit-button' onClick={()=> deletePost({variables: {id: id}})}>Delete Post</button>
        </div>
        
    }   
    {uid === user_id && canEdit && 
          <div className='post-feed-text'>
          <TextareaAutosize minRows={7} className="feed-textarea" value={newContent} onChange={(e) => submitContentHandler(e)} />
          <button onClick={()=> {setCanEdit(false); updatePost({variables: {id: id, content: currentContent, newContent: newContent}})}}>Submit changes</button>
          <button onClick={()=> setCanEdit(false)}>Discard changes</button>
          </div>
          }
    {uid !== user_id && 
    <div className="post-feed-text">
    <div>{content}</div>
    </div>
    }
    </div>
  )
}

export default Post