"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("./config"));
const resolvers_1 = __importDefault(require("./resolvers"));
const MealsAPI_1 = __importDefault(require("./MealsAPI"));
const typeDefs = fs_1.readFileSync(path_1.default.join(__dirname, config_1.default.schemaPath)).toString();
async function main() {
    const dataSources = () => ({
        mealsAPI: new MealsAPI_1.default()
    });
    const server = new apollo_server_1.ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers_1.default,
        dataSources: dataSources,
        introspection: true,
        playground: true
    });
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    server.listen().then(({ url }) => {
        console.log(`🥓 Let's get cooking! 🥞 I'm listening at ${url}`);
    });
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();
