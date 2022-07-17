import { GraphQLID, GraphQLString } from "graphql";
import { User } from "../../Entities/User";
import { UserType } from "../TypeDefs/User";

export const CREATE_USER = {
    type: UserType,
    args: {
        profile_image: { type: GraphQLString},
        user_id: {type: GraphQLString},
        
    }, 
    async resolve(parent: any, args: any ) {
        const { profile_image, user_id } = args;
        await User.insert(args)
        return args;
    }
} 