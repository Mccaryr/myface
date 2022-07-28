import Post from '../Post/Post'
import { GET_ALL_POSTS } from '../../Graphql/Queries'
import { useQuery } from '@apollo/client'
import './PostList.scss'
import { Post as PostType } from '../../models/PostModel'



const PostList = () => {
    const {data: postData, error, loading} = useQuery(GET_ALL_POSTS, {
      fetchPolicy:"cache-and-network"
    })

  return (
    <div className='post-list-container'>
        {postData && postData.posts.filter((post: PostType) => post.parentId === 0).map((filteredPosts: PostType) => {
         return (
           <Post key={filteredPosts.id} id={filteredPosts.id} content={filteredPosts.content} user_id={filteredPosts.user_id} profile_url={filteredPosts.profile_url} fullname={filteredPosts.fullname} parentId={filteredPosts.parentId} />
         )
         })}
    </div>
  )
}

export default PostList