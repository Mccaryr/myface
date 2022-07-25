import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
    
    query getAllPosts {
        posts {
            id
            content
            user_id
            profile_url
            fullname
        }
    }
`

export const GET_ALL_USER_POSTS = gql`
    query getAllUserPosts {
       user_posts { 
            id
            content
            user_id
            profile_url
            fullname
        }
    }
`

export const GET_USER = gql`

    query User($user_id: String!) {
        user(user_id: $user_id) {
             profile_url
             first_name 
             last_name
             job 
             education  
             location
        }
    }
`