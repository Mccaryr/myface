import { Photos } from "../../Entities/Image";
import { ImageType } from "../TypeDefs/Image";
import { GraphQLList } from "graphql";


interface IImage {
    image: string,
    user_id: string
}

export const GET_ALL_POSTS = {
    type: new GraphQLList(ImageType),
    resolve(): Promise<IImage[]> {
        return Photos.find();
    }
}