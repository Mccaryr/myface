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
}

type User {
    _id: ID
    user_id: String
    email: String
    profile_image: String 
    first_name: String 
    last_name: String 
    job: String 
    education: String 
    friends: [User]
}

type Query {
    posts: [Post!]!
    user(user_id: String): User
    users: [User]
}

input CreatePostInput {
    content: String
    user_id: String
    profile_url: String
    likes: Int = 0
    dislikes: Int = 0 
    fullname: String  
}

input UpdatePostInput {
    id: ID!
    newContent: String!
}

input UserInput {
    _id: ID
    user_id: String
    profile_image: String 
    first_name: String 
    last_name: String 
    
}

input CreateUserInput {
    _id: String
    user_id: String
    email: String
    profile_image: String 
    first_name: String 
    last_name: String 
    job: String 
    education: String
    friends: [UserInput]
}

type Mutation {
    createPost(input: CreatePostInput): Post
    updatePost(id: ID, content:String, newContent:String): Post
    deletePost(id: ID!): Post
    createUser(input: CreateUserInput): User
}
`