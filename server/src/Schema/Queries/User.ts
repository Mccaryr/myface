import { User } from "../../Entities/User";
import { UserType } from "../TypeDefs/User";
import { GraphQLList } from "graphql";


interface IUser {
    profile_image: string,
    user_id: string
    // friends: [User]
}

export const GET_ALL_USER_INFO = {
    type: new GraphQLList(UserType),
    resolve(): Promise<IUser[]> {
        return User.find();
    }
}