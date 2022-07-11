import React from 'react'
import CreatePost from '../CreatePost/CreatePost'
import PostList from '../PostList/PostList'

const Feed: React.FC = () => {
  return (
    <div>
        <CreatePost />
        <PostList />
    </div>
  )
}

export default Feed