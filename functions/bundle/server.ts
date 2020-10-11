import { ApolloServer } from 'apollo-server'
import { ApolloServer as ApolloServerLambda } from 'apollo-server-lambda'
import { readFileSync } from 'fs'
import path from 'path'
import config from './config'
import resolvers from './resolvers'
import MealsAPI from './MealsAPI'

const typeDefs = readFileSync(path.join(__dirname, config.schemaPath)).toString()

const dataSources = (): any => ({
  mealsAPI: new MealsAPI()
})

export const createLambdaServer = () => new ApolloServerLambda({
  typeDefs: typeDefs,
  resolvers: resolvers,
  dataSources: dataSources,
  introspection: true,
  playground: true
})

export const createLocalServer = () => new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  dataSources: dataSources,
  introspection: true,
  playground: true
})
