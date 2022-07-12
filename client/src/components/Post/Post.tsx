import { useMutation } from '@apollo/client';
import React from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import { DELETE_POST } from '../../Graphql/Mutations';
import './Post.scss'

interface Props {
    id: number,
    user_id: string, 
    content: string 
}

const Post: React.FC<Props> = ({id, user_id, content}) => {
  const [deletePost, {error}] = useMutation(DELETE_POST)

  // const deletePostFunc = (id: number): void => {
  //   deletePost(id)
  // }

  return (
    <div className='post-container'>
        <div className="post-feed-text">
        <TextareaAutosize minRows={4} className="feed-textarea" value={content} />

            {/* <input type="text" value={content} /> */}
        </div>
        <button onClick={()=> deletePost({variables: {id: id}})}>x</button>
        
    </div>
  )
}

export default Post