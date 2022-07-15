import { GraphQLID, GraphQLString } from "graphql";
import { Photos } from "../../Entities/Image";
import { ImageType } from "../TypeDefs/Image";

export const CREATE_IMAGE = {
    type: ImageType,
    args: {
        image: { type: GraphQLString},
        user_id: {type: GraphQLString},
        
    }, 
    async resolve(parent: any, args: any ) {
        const { image, user_id } = args;
        await Photos.insert(args)
        return args;
    }
} 