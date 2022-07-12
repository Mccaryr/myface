import {GraphQLObjectType, GraphQLID, GraphQLString} from 'graphql'

export const PostType = new GraphQLObjectType({
    name: "Post",
    fields: () => ({
        id: {type: GraphQLID},
        content: { type: GraphQLString},
        user_id: {type: GraphQLString}
    })
})