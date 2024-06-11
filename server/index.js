const { ApolloServer, gql } = require("apollo-server")
const {typeDefs} = require("./schema/typeDefs")
const {resolvers} = require("./schema/resolvers")


const server = new ApolloServer({
    typeDefs,
    resolvers,
    // context: () => {
    //     return { name: "Pedro" }
    // }
})


server.listen().then(({url}) => console.log(`Your API is running. Url: ${url}`))