const gql = require('graphql-tag')
const {ApolloServer} = require('apollo-server')

const typeDefs = gql`
    type Post {
        content: String!
        user_id: Int!
    }

    type Query {
       posts: Post! 
    }
`

const resolvers = {
    Query: {
        posts() {
            return {
                content: 'test post!',
                user_id: 123
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen(4000)
.then(() => console.log('on port 4000'))