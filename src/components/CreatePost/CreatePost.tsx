import { useState } from 'react';
import { createPost } from '../../features/postSlice';
import './CreatePost.scss'
import TextareaAutosize from 'react-textarea-autosize';
import { useAppDispatch } from '../../app/hooks';

const CreatePost: React.FC = () => {
  const [postInput, setPostInput] = useState<string>('');
  const dispatch = useAppDispatch()


  const createPostHandler = () => {
    dispatch(createPost({id:1, user_id:1, post_text: postInput}));
    setPostInput('');
  }


  return (
    <div className='create-post-container'>
        <div className="create-post">
        <div className="post">
        <div className="profile-pic">
                <p>pic</p>
            </div>
            <div className="post-input">
            <form>
                <TextareaAutosize minRows={4} style={{width:"20vw", borderRadius:'5px'}} value={postInput} onChange={(e) => setPostInput(e.target.value)}/>
            </form>
            </div>
            
        </div>
        <button onClick={() => createPostHandler()}>Create Post</button>
        </div>
    </div>
  )
}

export default CreatePost