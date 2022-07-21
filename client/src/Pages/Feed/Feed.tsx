import React, { useEffect } from 'react'
import CreatePost from '../../components/CreatePost/CreatePost'
import PostList from '../../components/PostList/PostList'
import { useQuery } from '@apollo/client'
import { GET_ALL_POSTS } from '../../Graphql/Queries'

const Feed: React.FC = () => {
  const {data: postData, error, loading} = useQuery(GET_ALL_POSTS)

 
  return (
    <div>
        <CreatePost />
        <PostList/>
    </div>
  )
}

export default Feed