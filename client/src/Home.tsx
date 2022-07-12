import Feed from './components/Feed/Feed';
import Header from './components/Header/Header';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const Home = () => {

  const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql',
    cache: new InMemoryCache()
  })

  


  return (
    <ApolloProvider client={client}>
    <div>
        <Header />
        <Feed />
    </div>
    </ApolloProvider>
  )
}

export default Home