import { GraphQLServer } from 'graphql-yoga';

// Scalar types - String, Boolean, Int, Float, ID
// Scalar means 1 single value

// Type definitions (schema)
const typeDefs = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        gpa: Float
    }
`;

// Resolvers
const resolvers = {
    Query: {
        id() {
            return 'abc123';
        },
        name() {
            return 'Magz B';
        },
        age() {
            return 33;
        },
        employed() {
            return true;
        },
        gpa() {
            return null;
        }
    }
};

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log('The server is up!');
});