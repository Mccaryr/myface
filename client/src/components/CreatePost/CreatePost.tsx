import { useState } from 'react';
import './CreatePost.scss'
import TextareaAutosize from 'react-textarea-autosize';
import { useAppDispatch } from '../../app/hooks';
import { CREATE_POST } from '../../Graphql/Mutations';
import { useMutation } from '@apollo/client'
import { useAppSelector } from '../../app/hooks';


const CreatePost: React.FC = () => {
  const [postInput, setPostInput] = useState<string>('');
  const uid = useAppSelector((state) => state.user.uid)
  const dispatch = useAppDispatch()
  const [createPost, {error}] = useMutation(CREATE_POST)


  const createPostHandler = () => {
    try {
      createPost({
        variables: {content: postInput, user_id: uid}
      })
      setPostInput('');

    } catch(err) {
      console.log(error)
    }
    
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