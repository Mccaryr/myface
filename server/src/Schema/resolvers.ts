import mongoose from 'mongoose'
import { Posts } from "../Entities/Post"
import { User } from "../Entities/User"
import { Message } from "../Entities/Message"
import _ from 'lodash'

export const resolvers = {
    Query: {
        posts: async () => {
           const posts = await Posts.find()
           return posts;
        },

        users: async (parent: any, args: any) => {
            const filter_name = args.filter_name 
            const users = await User.find()

            if(filter_name.length > 0) {
                return users.filter((user) => user.first_name.includes(filter_name) || user.last_name.includes(filter_name));
            }
            else {
                return "none selected"
            }
            
            
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
        },
        user_chats: async (parent: any, args: any) => {
            const user_id = args.user_id;
            const chats = await Message.find({$or:[{sender_id: user_id}, {receiver_id: user_id}]})
            
              let uniqueConversations = chats.map((chat) => chat.conversation_id);
              uniqueConversations = [...new Set(uniqueConversations)];
              let recentUniqueConversations = []

              for(let i = 0; i < uniqueConversations.length; i++) {
                let filteredChats = chats.filter((chat) => chat.conversation_id === uniqueConversations[i])
                let sortedChats = filteredChats.sort((a,b) => {
                    if(a.createdAt > b.createdAt) {
                        return -1
                    } if(a.createdAt < b.createdAt){
                        return 1
                    } else {
                        return 0
                    }
                })
                recentUniqueConversations.push(sortedChats[0])
              }
             
            // console.log(_.sortBy(chats, 'createdAt').at(-1)) 
            //Still needs to be tested but using lodash looks promising
            console.log(chats)
            return chats;
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
            const user = args.input
            let createdUser = await User.create(user)
            return createdUser;
        },
        createMessage: async(parent: any, args: {input: any}) => {
            const message = args.input 
            if(message.conversation_id === "") {
                message.conversation_id = new mongoose.Types.ObjectId(); 
                console.log(message)
            }
            
            let createdMessage = await Message.create(message)
            return createdMessage
        }
    }
}