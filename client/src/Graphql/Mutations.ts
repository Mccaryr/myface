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