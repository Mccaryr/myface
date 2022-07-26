import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import { useAppSelector } from '../../app/hooks';
import { DELETE_POST, UPDATE_POST } from '../../Graphql/Mutations';
import { GET_ALL_POSTS } from '../../Graphql/Queries';
import './Post.scss'

interface Props {
    id: number,
    user_id: string, 
    content: string,
    profile_url: string,
    fullname: string 
}

const Post: React.FC<Props> = ({id, user_id, content, profile_url, fullname}) => {
  const uid = useAppSelector((state) => state.user.uid)
  const [canEdit, setCanEdit] = useState<boolean>(false)
  const [deletePost] = useMutation(DELETE_POST)
  const [updatePost] = useMutation(UPDATE_POST)
  const {data: postData, error, loading, refetch} = useQuery(GET_ALL_POSTS)
  const [currentContent, setCurrentContent] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  
  const submitContentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setNewContent(e.target.value)
  }

  

  return (
    <div className='post-container'>
        {uid === user_id && canEdit===false && 
        // <div className="post-elements">
        //   <div className="profile-image">
        //     <img src={profile_url} alt="profile" style={{height:'70px', width:'70px', borderRadius:'100px'}}/>
        //       <div className="profile-name-timestamp">
        //         <p>{fullname}</p>
        //         <p style={{fontSize:"12px"}}>July 24 at 9:41pm</p>
        //       </div>  
        //   </div>
        //   <div className='post-text'>{content}</div>
        //   <div className="comment-footer">
        //     <div>likes 17</div> 
        //     <div>dislikes 2</div>
        //     <div>Reply 2</div>
        //     <TextareaAutosize className='post-reply-comment' style={{textAlign:'center'}} placeholder='Write a comment' minRows={2}/>
        //   </div>
        //   <button className='edit-button' onClick={() => {
        //     setCanEdit(true); 
        //     setCurrentContent(content); 
        //     setNewContent(content)} }>Edit Post</button>
        //   <button className='delete-button' onClick={()=> {
        //     deletePost({variables: {id: id}, refetchQueries:[
        //       {query: GET_ALL_POSTS},
        //       'getAllPosts'
        //     ]}); 
        //     }
        //   }>Delete Post</button>
        // </div>
        <>
        <div className="post-header">
          <div className="post-header-first-col">
            <img src={profile_url} alt="profile" style={{height:'70px', width:'70px', borderRadius:'100px'}}/>
            <div className="comment-user-ts">
              <div>{fullname}</div>
              <div style={{fontSize:"12px"}}>July 24 at 9:41pm</div>
            </div>
          </div>
          <div className="post-header-second-col">
            <button className='edit-button' onClick={() => {
            setCanEdit(true); 
            setCurrentContent(content); 
            setNewContent(content)} }>Edit Post</button>
          <button className='delete-button' onClick={()=> {
            deletePost({variables: {id: id}, refetchQueries:[
              {query: GET_ALL_POSTS},
              'getAllPosts'
            ]}); 
            }
          }>Delete Post</button>
          </div>
        </div> 
          <div className='post-content'>{content}</div>
          <div className="post-footer">
            <hr style={{color:'white', width:'100%'}}/>
            <div className="like-dislike-reply-bar">
              <div>likes 17</div> 
              <div>dislikes 2</div>
              <div>Reply 2</div>
            </div>
            <hr style={{color:'white', width:'100%'}}/>
            <div className="reply-section">
              <img src={profile_url} alt="profile" style={{height:'50px', width:'50px', borderRadius:'100px'}}/>
              <TextareaAutosize className='post-reply-comment' style={{textAlign:'center', width:'32vw'}} placeholder='Write a comment' minRows={2}/>
            </div>
          </div>
          </>
        
    }   
    {uid === user_id && canEdit && 
          <div className='post-feed-text'>
          <TextareaAutosize minRows={7} className="feed-textarea" value={newContent} onChange={(e) => submitContentHandler(e)} />
          <button className='edit-button' onClick={()=> {
             setCanEdit(false);
             updatePost({variables: {id: id, content: currentContent, newContent: newContent}, 
            optimisticResponse: {
              updatePost: {
                id: id,
                content: currentContent,
                newContent: newContent,
                __typename: "Post"
              }
            }});
             refetch()}}>Submit changes</button>
          <button className='delete-button' onClick={()=> setCanEdit(false)}>Discard changes</button>
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