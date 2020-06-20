const { ApolloServer } = require('apollo-server')
const { readFileSync } = require('fs')
const path = require('path')

require('dotenv').config()
const config = require('./config')

const typeDefs = readFileSync(path.join(__dirname, config.schemaPath)).toString()
const resolvers = require('./resolvers')
const MealsAPI = require('./MealsAPI')

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