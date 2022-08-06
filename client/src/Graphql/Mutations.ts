import { gql } from "@apollo/client";

export const CREATE_POST = gql`

    mutation createPost($input: CreatePostInput) {
        createPost(input: $input 
            ) {
                content
                user_id
                profile_url
                fullname
                parentId
            }
    }
`

export const DELETE_POST = gql`

    mutation deletePost(
        $id: ID!
        ) {
            deletePost(
            id: $id
            ) {
                id
            }
    }
`

export const UPDATE_POST = gql`

    mutation updatePost(
        $id: ID!
        $content: String!
        $newContent: String!
        ) {
            updatePost(
            id: $id
            content: $content
            newContent: $newContent
            ) {
                id
                content
            }
    }
`


export const UPDATE_POST_REACTS = gql`
    mutation updatePostReacts(
        $id: ID!
        $likes: Int 
        $dislikes: Int 
        ) {
            updatePostReacts(
                id: $id 
                likes: $likes 
                dislikes: $dislikes 
            )
            {
                id 
                likes
                dislikes
            }
        }
`




export const CREATE_USER = gql`
    mutation createUser($input: CreateUserInput) {
        createUser(input: $input) {
            user_id
            first_name
            last_name
            education
            job 
            profile_url
            email
            location 
        }
    }
`

export const CREATE_MESSAGE = gql`
    mutation createMessage($input: CreateMessageInput) {
        createMessage(input: $input) {
            content 
            sender_id
            receiver_id
            first_name
            last_name
            profile_url 
        }
    }
`