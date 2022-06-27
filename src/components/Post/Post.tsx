import React from 'react'
import './Post.scss'

interface Props {
    id: number,
    user_id: number, 
    post_text: string 
}

const Post: React.FC<Props> = ({id, user_id, post_text}) => {
  return (
    <div className='post-container'>
        <div className="post-feed-text">
            {post_text}
        </div>
        
    </div>
  )
}

export default Post