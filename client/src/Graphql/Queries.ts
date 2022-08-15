import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
    
    query getAllPosts {
        posts {
            id
            content
            user_id
            profile_url
            fullname
            parentId
            likes 
            dislikes 
        }
    }
`

export const GET_ALL_USER_POSTS = gql`

    query getAllUserPosts($user_id: String) {
       user_posts(user_id: $user_id) { 
            id
            content
            user_id
            profile_url
            fullname
            parentId
            likes 
            dislikes
        }
    }
`

export const GET_ALL_REPLIES = gql`
    query getAllReplies($parentId: String) {
        replies(parentId: $parentId) {
            id
            content
            user_id
            profile_url
            fullname
            parentId
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

export const GET_USERS = gql`

    query Users($filter_name: String!) {
        users(filter_name: $filter_name) {
             profile_url
             first_name 
             last_name
             user_id
        }
    }
`

export const GET_ALL_USER_CHATS = gql`

    query getAllUserChats($user_id: String) {
       user_chats(user_id: $user_id) { 
            content
            receiver_id
            sender_id
            profile_url
            first_name
            last_name
            createdAt
            createdAtString
            conversation_id
        }
    }
`

export const GET_ALL_USER_MESSAGES = gql`

    query getAllUserMessages($conversation_id: String) {
       user_messages(conversation_id: $conversation_id) { 
            content
            receiver_id
            sender_id
            profile_url
            first_name
            last_name
            createdAt
        }
    }
`