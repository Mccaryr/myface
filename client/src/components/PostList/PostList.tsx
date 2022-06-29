import { useAppSelector } from '../../app/hooks'
import Post from '../Post/Post'
import './PostList.scss'


const PostList = () => {
    const posts = useAppSelector((state) => state.posts.postArray)

  return (
    <div className='post-list-container'>
        {posts?.map((post) => {
            return (
                <Post id={post.id} user_id={post.user_id} post_text={post.post_text} />
            )
        })}
    </div>
  )
}

export default PostList