import React from 'react'
import CreatePost from '../../components/CreatePost/CreatePost'
import PostList from '../../components/PostList/PostList'

const Feed: React.FC = () => {
  return (
    <div>
        <CreatePost />
        <PostList />
    </div>
  )
}

export default Feed