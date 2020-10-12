import { createLambdaServer } from './bundle/server'

const server = createLambdaServer();

export const handler = server.createHandler({
  cors: {
    origin: '*'
  }
});