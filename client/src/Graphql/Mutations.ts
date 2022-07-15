import { gql } from "@apollo/client";

export const CREATE_POST = gql`

    mutation createPost(
        $content: String! 
        $user_id: String!
        ) {
        createPost(
            content: $content 
            user_id: $user_id
            ) {
                content
                user_id
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

export const CREATE_IMAGE = gql`

    mutation createImage(
        $image: String! 
        $user_id: String!
        ) {
        createImage(
            image: $image 
            user_id: $user_id
            ) {
                image
                user_id
            }
    }
`