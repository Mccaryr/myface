import React from 'react'
import './CreatePost.scss'
import TextareaAutosize from 'react-textarea-autosize';

const CreatePost = () => {
  return (
    <div className='create-post-container'>
        <div className="create-post">
        <div className="post">
        <div className="profile-pic">
                <p>pic</p>
            </div>
            <div className="post-input">
            <form>
                <TextareaAutosize minRows={4} style={{width:"20vw", borderRadius:'5px'}}/>
            </form>
            </div>
            
        </div>
        <button>Create Post</button>
        </div>
    </div>
  )
}

export default CreatePost