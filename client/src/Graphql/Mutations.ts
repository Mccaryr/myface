import { gql } from "@apollo/client";

export const CREATE_POST = gql`

    mutation createPost($input: CreatePostInput) {
        createPost(input: $input 
            ) {
                content
                user_id
                profile_url
                fullname
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
            fullname
            location 
        }
    }
`