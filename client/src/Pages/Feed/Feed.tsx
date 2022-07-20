import React, { useEffect } from 'react'
import CreatePost from '../../components/CreatePost/CreatePost'
import PostList from '../../components/PostList/PostList'
import { useQuery } from '@apollo/client'
import { GET_ALL_POSTS } from '../../Graphql/Queries'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getCurrentPostState } from '../../features/posts/postSlice'

const Feed: React.FC = () => {
  const {data: postData, error, loading} = useQuery(GET_ALL_POSTS)
  const dispatch = useAppDispatch()
  const posts = useAppSelector((state) => state.posts.postArray)

 

  useEffect(() => {
    if(postData){

      dispatch(getCurrentPostState(postData))
    }
  })
  return (
    <div>
        <CreatePost />
        <PostList/>
    </div>
  )
}

export default Feed