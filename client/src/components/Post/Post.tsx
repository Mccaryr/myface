import { useLazyQuery, useMutation, useQuery, makeVar } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import { useAppSelector } from '../../app/hooks';
import { DELETE_POST, UPDATE_POST, UPDATE_POST_REACTS } from '../../Graphql/Mutations';
import { GET_ALL_POSTS, GET_ALL_REPLIES } from '../../Graphql/Queries';
import DefaultProfileImage from '../../assets/default_profile_image.png'
import './Post.scss'


interface Props {
    id: number,
    user_id: string, 
    content: string,
    profile_url: string,
    fullname: string, 
    parentId: number,
    likes: number, 
    dislikes: number, 
}

const Post: React.FC<Props> = ({id, user_id, content, profile_url, fullname, parentId, likes, dislikes}) => {
  const uid = useAppSelector((state) => state.user.uid)
  const [canEdit, setCanEdit] = useState<boolean>(false)
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [isDisliked, setIsDisliked] = useState<boolean>(false)
  const [visibleReplies, setVisibleReplies] = useState<boolean>(false)
  const [parentPostId, setParentPostId] = useState<number>()
  const [deletePost] = useMutation(DELETE_POST)
  const [updatePost] = useMutation(UPDATE_POST)
  const [updatePostReacts] = useMutation(UPDATE_POST_REACTS)
  const {data: postData, error, loading, refetch} = useQuery(GET_ALL_POSTS)
  const [getAllReplies, {data: replyData}] = useLazyQuery(GET_ALL_REPLIES, {
    fetchPolicy: 'cache-and-network'
  })
  const [currentContent, setCurrentContent] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');



  const submitContentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setNewContent(e.target.value)
  }

  

  const showRepliesHandler = async (id: number) => {
    try{
      getAllReplies({variables: {parentId: id}})
      
    }catch(err) {
      console.log(err)
    }
  }

  const likeHandler = async(id: number,likes: number, dislikes: number) => {
      updatePostReacts({variables: {id: id, likes: likes + 1, dislikes: dislikes}, 
        refetchQueries:[
          {query:GET_ALL_POSTS},
          'getAllUserPosts'
        ]  
      })
  }

  const dislikeHandler =  (id: number,likes: number, dislikes: number) => {
    setIsLiked(isLiked === true)
    updatePostReacts({variables: {id: id, likes: likes + 1, dislikes: dislikes}, 
      refetchQueries:[
        {query:GET_ALL_POSTS},
        'getAllUserPosts'
      ]  
    })
  }

  return (
    <div className='post-container'>
        {uid === user_id && canEdit===false && 
        <>
        <div className="post-header">
          <div className="post-header-first-col">
            {profile_url ? <img src={profile_url} alt="profile" style={{height:'70px', width:'70px', borderRadius:'100px'}}/>
            :            
            <img src={DefaultProfileImage} alt='default profile' style={{height:'70px', width:'70px', borderRadius:'100px'}} />
            }
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
              <div onClick={() => likeHandler(id, likes, dislikes)}>likes {likes}</div> 
              <div onClick={() => {
                setIsDisliked(isDisliked === true);
                updatePostReacts({variables: {id: id, likes: likes, dislikes: dislikes + 1}, 
              refetchQueries: [
                {query:GET_ALL_POSTS},
                  'getAllUserPosts'
              ]})
              }}>dislikes {dislikes}</div>
              <div onClick={() => {
                showRepliesHandler(id)
              }}>Reply 1</div>
            </div>
            <hr style={{color:'white', width:'100%'}}/>
            <div className="reply-section">
              <img src={profile_url} alt="profile" style={{height:'50px', width:'50px', borderRadius:'100px'}}/>
              <TextareaAutosize className='post-reply-comment' style={{textAlign:'center', width:'32vw'}} placeholder='Write a comment' minRows={2}/>
              <button style={{backgroundColor:'rgb(95, 194, 161)', height:'35px'}} onClick={() => {setParentPostId(id); console.log(parentPostId)}}>Submit Reply</button>
            </div>
              {replyData && replyData.replies.map((reply: any) => {
                return(
                  <div className='replies-container'>
                    <div><img src={reply.profile_url} alt="profile" style={{height:'50px', width:'50px', borderRadius:'100px'}}/></div>
                      <div className="reply">
                        <div key={reply.id} className='reply-content'>
                          <div style={{fontWeight:'bold'}}>{reply.fullname}</div>
                          <div>{reply.content}</div>
                        </div>
                        <div className='like-ts-container'>
                          <div>like</div>
                          <div>6 hrs</div>
                          <div>emoji</div>
                        </div> 
                      </div>
                      <div style={{marginTop:'2vh'}}>...</div>
                  </div>
                )
              })}
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
    //If user does NOT have id of post' user_id then they have no edit/delete functionality
    <>
      <div className="post-header">
        <div className="post-header-first-col">
          {profile_url ? <img src={profile_url} alt="profile" style={{height:'70px', width:'70px', borderRadius:'100px'}}/>
          :            
          <img src={DefaultProfileImage} alt='default profile' style={{height:'70px', width:'70px', borderRadius:'100px'}} />
          }
          <div className="comment-user-ts">
            <div>{fullname}</div>
            <div style={{fontSize:"12px"}}>July 24 at 9:41pm</div>
          </div>
        </div>
      </div> 
      <div className='post-content'>{content}</div>
      <div className="post-footer">
        <hr style={{color:'white', width:'100%'}}/>
        <div className="like-dislike-reply-bar">
          <div onClick={() => likeHandler(id, likes, dislikes)}>likes {likes}</div> 
          <div onClick={() => {
            setIsDisliked(isDisliked === true);
            updatePostReacts({variables: {id: id, likes: likes, dislikes: dislikes + 1}, 
          refetchQueries: [
            {query:GET_ALL_POSTS},
              'getAllUserPosts'
          ]})
          }}>dislikes {dislikes}</div>
          <div onClick={() => {
            showRepliesHandler(id)
            setVisibleReplies(!visibleReplies)
          }}>Reply 1</div>
        </div>
        <hr style={{color:'white', width:'100%'}}/>
        <div className="reply-section">
          <img src={sessionStorage.getItem('profile_url')!} alt="profile" style={{height:'50px', width:'50px', borderRadius:'100px'}}/>
          <TextareaAutosize className='post-reply-comment' style={{textAlign:'center', width:'32vw'}} placeholder='Write a comment' minRows={2}/>
          <button style={{backgroundColor:'rgb(95, 194, 161)', height:'35px'}} onClick={() => {setParentPostId(id); console.log(parentPostId)}}>Submit Reply</button>
        </div>
          {visibleReplies && replyData && replyData.replies.map((reply: any) => {
            return(
              <div key={reply.id} className='replies-container'>
                <div><img src={reply.profile_url} alt="profile" style={{height:'50px', width:'50px', borderRadius:'100px'}}/></div>
                  <div className="reply">
                    <div className='reply-content'>
                      <div style={{fontWeight:'bold'}}>{reply.fullname}</div>
                      <div>{reply.content}</div>
                    </div>
                    <div className='like-ts-container'>
                      <div>like</div>
                      <div>6 hrs</div>
                      <div>emoji</div>
                    </div> 
                  </div>
                  <div style={{marginTop:'2vh'}}>...</div>
              </div>
            )
          })}
      </div>
      </>
    }
    </div>
  )
}

export default Post