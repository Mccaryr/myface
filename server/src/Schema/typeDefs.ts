import { gql } from "apollo-server"

export const typeDefs = gql`
type Post {
    id:ID!
    content: String!
    user_id: String!
    profile_url: String
    likes: Int 
    dislikes: Int
    fullname: String!
    parentId: Int    
}

type User {
    _id: ID
    user_id: String
    email: String
    profile_url: String 
    first_name: String 
    last_name: String 
    job: String 
    education: String
    location: String 
    friends: [User]
}

type Message {
    _id:ID!
    conversation_id: ID!
    content: String!
    receiver_id: String!
    sender_id: String!
    profile_url: String
    first_name: String 
    last_name: String
    createdAt: String
}

type Query {
    posts: [Post]
    user_posts(user_id: String): [Post]
    user(user_id: String): User
    users(filter_name: String): [User]
    replies(parentId: String): [Post]
    messages(receiver_id: String): [Message]
    user_chats(user_id: String): [Message]
}

input CreatePostInput {
    content: String
    user_id: String
    profile_url: String
    fullname: String
    parentId: Int   
}

input UpdatePostInput {
    id: ID!
    newContent: String!
}

input UserInput {
    _id: ID
    user_id: String
    profile_url: String 
    first_name: String 
    last_name: String 
    
}

input CreateUserInput {
    _id: String
    user_id: String
    email: String
    profile_url: String 
    first_name: String 
    last_name: String 
    job: String 
    education: String
    location: String 
    friends: [UserInput]
}

input CreateMessageInput {
    conversation_id: ID!
    content: String!
    receiver_id: String!
    sender_id: String!
    profile_url: String
    first_name: String 
    last_name: String
}

type Mutation {
    createPost(input: CreatePostInput): Post
    updatePost(id: ID, content:String, newContent:String): Post
    updatePostReacts(id: ID, likes: Int, dislikes: Int): Post 
    deletePost(id: ID!): Post
    createUser(input: CreateUserInput): User
    createMessage(input: CreateMessageInput): Message 
}
`