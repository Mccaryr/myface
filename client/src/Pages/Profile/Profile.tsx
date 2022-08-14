import React, { useEffect } from 'react'
import { useState } from 'react'
import { useAppSelector } from '../../app/hooks';
import { User } from '../../models/UserModel';
import CoverPhoto from '../../assets/test_cover_photo.jpg'
import './Profile.scss'
import TextareaAutosize from 'react-textarea-autosize';
import CameraIcon from '../../assets/camera-icon.png'
import { GET_ALL_USER_POSTS } from '../../Graphql/Queries';
import { CREATE_POST } from '../../Graphql/Mutations';
import { useMutation, useQuery } from '@apollo/client';
import { Post as PostType } from '../../models/PostModel'
import Post from '../../components/Post/Post';



const Profile = () => {
    const [uploadedImage, setUploadedImage] = useState<string | undefined>()
    const uid = useAppSelector((state) => state.user.uid)
    const [user, setUser] = useState<User>()
    const [createPost, {error}] = useMutation(CREATE_POST);
    const {loading, data: postData} = useQuery(GET_ALL_USER_POSTS , {
      fetchPolicy: 'network-only',
      variables: {user_id: sessionStorage.getItem('uid')}
    }) 
    const [postInput, setPostInput] = useState<string>('');



    const fileSelectedHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const file = e.target.files![0];
      const { url }  = await fetch("http://localhost:3001/s3_upload").then(res => res.json());

      
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "image/jpg"
        },
        body: file
      })

      const imageUrl = url.split('?')[0]
      setUploadedImage(imageUrl)
    };

    const createPostHandler = async () => {
      try {
          const post = await createPost({variables: {
            input: {content: postInput, user_id: uid, profile_url: sessionStorage.getItem('profile_url'), fullname: user?.first_name + " " + user?.last_name, parentId: null}
          }, refetchQueries:[
            {query:GET_ALL_USER_POSTS},
            'getAllUserPosts'
          ]   
        })
          setPostInput('');
       } catch(err) {
        console.log(error)
      }
      
    }

    


    useEffect(() => {
      setUser(JSON.parse(sessionStorage.getItem('userInfo')!))
    }, [])
    


  return (
    <div className='profile-page'>
      <div className="cover-photo-and-profile-container">
        <img alt='cover' className='cover-photo' src={CoverPhoto} />
        <button className='edit-cover-button'>Edit Cover Photo</button>
        {user?.profile_url ?
          <div className='profile-image-and-name-container'> 
            <div className="profile-image">
              <img alt='profile' src={user.profile_url} />
              <button className='edit-profile-pic'><img  alt='camera icon' style={{height:'30px', width:'30px', padding:'0px', margin:'0px', cursor:'pointer'}} src={CameraIcon} /></button>
            </div>
            <div className="profile-name">
                {user?.first_name} {user?.last_name}
            </div> 
          </div>
        :
        <div>
          <input type="file" onChange={(e) => fileSelectedHandler(e)} />
          <img alt='uploaded' style={{height:'200px', width:'200px', borderRadius:'100px'}} src={uploadedImage} />
        </div> 
      }
      </div>
      <div className='posts-aboutme-container'>
        <div className="about-me">
          <div className="intro">
            <h2>Intro</h2>
            <p>Works at {user?.job}</p>
            <p>Studied at {user?.education}</p>
            <p>Lives at {user?.location}</p>
          </div>
          <button className='edit-details-btn'>Edit details</button>
        </div>
        <div className="posts-col">
          <div className="create-posts">
            <img src={sessionStorage.getItem('profile_url') as string} style={{height:'100px', width:'100px', borderRadius:'100px'}} />
            <form>
                <TextareaAutosize minRows={4} style={{width:"35vw", borderRadius:'20px', textAlign:'center', border:'none', paddingTop:'15px'}} placeholder="What's on your mind?" value={postInput} onChange={(e) => setPostInput(e.target.value)}/>
            </form>
          </div>
       
          <div className="user-post-feed">
            {loading && <h1>Loading</h1>}
            {postData?.user_posts.filter((user_post: PostType) => user_post.parentId === 0).map((filteredUserPosts: PostType) => {
              return(
                <Post key={filteredUserPosts.id} id={filteredUserPosts.id} content={filteredUserPosts.content} user_id={filteredUserPosts.user_id} 
                profile_url={filteredUserPosts.profile_url} fullname={filteredUserPosts.fullname} parentId={filteredUserPosts.parentId} likes={filteredUserPosts.likes} dislikes={filteredUserPosts.dislikes}/>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile