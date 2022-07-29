import { Posts } from "../Entities/Post"
import { User } from "../Entities/User"

export const resolvers = {
    Query: {
        posts: async () => {
           const posts = await Posts.find()
           return posts;
        },

        users: async () => {
            const users = await User.find()
            return users;
        },

        user: async (parent: any, args: any) => {
            const user_id = args.user_id 
            const user = await User.findOne({user_id: user_id})
            return user;
        },

        user_posts: async (parent: any, args: any) => {
            const user_id = args.user_id;
            const user_posts = await Posts.findBy({user_id: user_id})
            return user_posts;
        },

        replies: async(parent: any, args: any) => {
            const parentId = args.parentId
            const replies = await Posts.findBy({parentId: parentId})
            return replies;
        }
    },

    Mutation: {
        createPost: async (parent: any, args: {input: any}) => {
            const post = args.input
            await Posts.insert(post)
            return post
        },
        updatePost: async (parent: any, args: any) => {
            const {id, newContent} = args
            let postUpdated = await Posts.update({id: id}, {content: newContent})
            return args
        },
        updatePostReacts: async (parent: any, args: any) => {
            const reacts = args
            let updatedPostReacts = await Posts.update({id: reacts.id}, {likes: reacts.likes, dislikes: reacts.dislikes})
        },
        deletePost: async (parent: any, args: any) => {
            const id = args.id;
            let postDeleted = await Posts.delete(id)
            return null;
        },
        createUser: async(parent: any, args: {input: any}) => {
            const {user_id, email, profile_url, first_name, last_name, job, friends} = args.input
            const user = args.input
            let createdUser = User.create(user)
            return createdUser;
        }
    }
}