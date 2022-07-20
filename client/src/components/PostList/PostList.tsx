import { useAppSelector } from '../../app/hooks'
import Post from '../Post/Post'
import { GET_ALL_POSTS } from '../../Graphql/Queries'
import { useQuery } from '@apollo/client'
import './PostList.scss'
import { Post as PostType } from '../../models/PostModel'



const PostList = () => {
    const {data: postData, error, loading} = useQuery(GET_ALL_POSTS)

  return (
    <div className='post-list-container'>
        {postData && postData.posts.map((post: PostType) => {
          return (
            <Post key={post.id} id={post.id} content={post.content} user_id={post.user_id} />
          )
        })}
    </div>
  )
}

export default PostList