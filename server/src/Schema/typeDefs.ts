import { gql } from "apollo-server"

export const typeDefs = gql`
type Post {
    id:ID!
    content: String!
    user_id: String!
}

type User {
    id: ID
    user_id: String
    email: String
    profile_image: String 
    first_name: String 
    last_name: String 
    job: String 
    education: String 
    
}

type Query {
    posts: [Post!]!
    user(user_id: String): User
}
`