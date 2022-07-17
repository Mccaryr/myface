// import { GraphQLObjectType, GraphQLSchema } from "graphql";
// import { GET_ALL_POSTS } from "./Queries/Post";
// import { CREATE_POST, DELETE_POST, UPDATE_POST } from "./Mutations/Post";
// import { CREATE_USER } from "./Mutations/User";

// const RootQuery = new GraphQLObjectType({
//     name: "RootQuery",
//     fields: {
//         getAllPosts: GET_ALL_POSTS
//     }
// })

// const Mutation = new GraphQLObjectType({
//     name: "Mutation",
//     fields: {
//         createPost: CREATE_POST,
//         deletePost: DELETE_POST,
//         updatePost: UPDATE_POST,
//         createImage: CREATE_USER
//     }
// })

// export const schema = new GraphQLSchema({
//     query: RootQuery,
//     mutation: Mutation
// })