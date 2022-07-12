import { useAppSelector } from '../../app/hooks'
import Post from '../Post/Post'
import { GET_ALL_POSTS } from '../../Graphql/Queries'
import { useQuery } from '@apollo/client'
import './PostList.scss'
import { Post as PostType } from '../../models/PostModel'
import { useEffect } from 'react'



const PostList = () => {
    // const posts = useAppSelector((state) => state.posts.postArray)
    const {data, error} = useQuery(GET_ALL_POSTS)

    

  return (
    <div className='post-list-container'>
        {/* {posts?.map((post) => {
            return (
                <Post id={post.id} user_id={post.user_id} post_text={post.post_text} />
            )
        })} */}
        {data && data.getAllPosts.map((post: PostType) => {
          return (
            <Post key={post.id} id={post.id} content={post.content} user_id={post.user_id} />
          )
        })}
    </div>
  )
}

export default PostList