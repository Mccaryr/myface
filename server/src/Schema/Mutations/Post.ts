// import { GraphQLID, GraphQLString } from "graphql";
// import { PostType } from "../TypeDefs/Post";
// import { Posts } from "../../Entities/Post";


// export const CREATE_POST = {
//     type: PostType,
//     args: {
//         content: { type: GraphQLString},
//         user_id: {type: GraphQLString}
//     }, 
//     async resolve(parent: any, args: any ) {
//         const { content, user_id } = args;
//         await Posts.insert(args)
//         return args;
//     }
// }

// export const DELETE_POST = {
//     type: PostType,
//     args: {
//         id: {type: GraphQLID},
//         content: { type: GraphQLString},
//         user_id: {type: GraphQLID}
//     }, 
//     async resolve(parent: any, args: any ) {
//         const id = args.id
//         await Posts.delete(id)
//     }

// }

// export const UPDATE_POST = {
//     type: PostType,
//     args: {
//         id: { type: GraphQLID},
//         content: { type: GraphQLString},
//         newContent: { type: GraphQLString}
//     }, 
//     async resolve(parent: any, args: any ) {
//         const {id, content, newContent} = args
//         const post = await Posts.update({id: id}, {content: newContent});
        
//         if(!post) {
//             throw new Error("POST DOESN'T EXIST")
//         }
//         return post;
//     }
// }