import { Posts } from "../Entities/Post"
import { Users } from "../Entities/User";

export const resolvers = {
    Query: {
        posts: async () => {
           const posts = await Posts.find()
           return posts;
        },

        user: async (parent: any, args: { user_id: string; }) => {
            const user_id = args.user_id
            const user = await Users.findOneBy({user_id: user_id})
            return user;
        }
    }
}