import { ApolloServer } from 'apollo-server'
import { readFileSync } from 'fs'
import path from 'path'
import config from './config'
import resolvers from './resolvers'
import MealsAPI from './MealsAPI'

require('dotenv').config()

const typeDefs = readFileSync(path.join(__dirname, config.schemaPath)).toString()

async function main () {
  const dataSources = () => ({
    mealsAPI: new MealsAPI()
  })

  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    dataSources: dataSources,
    introspection: true,
    playground: true
  })

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  server.listen().then(({ url }) => {
    console.log(`🥓 Let's get cooking! 🥞 I'm listening at ${url}`)
  })
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main()
