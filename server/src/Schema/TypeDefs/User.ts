import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLScalarType, GraphQLString } from "graphql"

export const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: {type: GraphQLID},
        email: {type: GraphQLString},
        profile_image: { type: GraphQLString},
        user_id: {type: GraphQLString},
        first_name: {type: GraphQLString},
        last_name: {type: GraphQLString},
        job: {type: GraphQLString},
        education: {type: GraphQLString},
        
    })
})