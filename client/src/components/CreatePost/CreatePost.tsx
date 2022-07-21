import { useState } from 'react';
import './CreatePost.scss'
import TextareaAutosize from 'react-textarea-autosize';
import { CREATE_POST } from '../../Graphql/Mutations';
import { useMutation, useQuery } from '@apollo/client'
import { useAppSelector } from '../../app/hooks';
import { GET_ALL_POSTS } from '../../Graphql/Queries';


const CreatePost: React.FC = () => {
  const [postInput, setPostInput] = useState<string>('');
  const uid = useAppSelector((state) => state.user.uid)
  const userDetails = useAppSelector((state) => state.user.userDetails)
  const [createPost, {error}] = useMutation(CREATE_POST); 
  const {data: postData, loading, refetch} = useQuery(GET_ALL_POSTS)

  


  const createPostHandler = async () => {
    try {
        const post = await createPost({variables: {
          input: {content: postInput, user_id: uid, profile_url: sessionStorage.getItem('profile_url')}
        }
      })
        refetch();
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
                <img src={sessionStorage.getItem('profile_url') as string} style={{height:'100px', width:'100px', borderRadius:'100px'}} />
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