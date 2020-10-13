import { ApolloServer } from 'apollo-server'
import { ApolloServer as ApolloServerLambda } from 'apollo-server-lambda'
import { readFileSync } from 'fs'
import path from 'path'
import config from './config'
import resolvers from './resolvers'
import MealsAPI from './MealsAPI'

// const typeDefs = readFileSync(path.join(__dirname, config.schemaPath)).toString()

// ? https://github.com/netlify/function-deploy-test/blob/master/lambda/zipped-function/zipped-function.js#L6
const typeDefsPath =
  (process.env.LAMBDA_TASK_ROOT)
    ? path.resolve(process.env.LAMBDA_TASK_ROOT, config.lambda.schemaPath)
    : path.resolve(__dirname, config.local.schemaPath)

const typeDefs = readFileSync(typeDefsPath).toString()

const dataSources = (): any => ({
  mealsAPI: new MealsAPI()
})

export const createLambdaServer = (): ApolloServerLambda => new ApolloServerLambda({
  typeDefs: typeDefs,
  resolvers: resolvers,
  dataSources: dataSources,
  introspection: true,
  playground: true
})

export const createLocalServer = (): ApolloServer => new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  dataSources: dataSources,
  introspection: true,
  playground: true
})
