import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql"

export const ImageType = new GraphQLObjectType({
    name: "Image",
    fields: () => ({
        id: {type: GraphQLID},
        image: { type: GraphQLString},
        user_id: {type: GraphQLString},
    })
})