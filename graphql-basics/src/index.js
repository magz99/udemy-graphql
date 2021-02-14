import { GraphQLServer } from 'graphql-yoga';

// Scalar types - String, Boolean, Int, Float, ID
// Scalar means 1 single value

// Type definitions (schema)
const typeDefs = `
    type Query {
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!
    }
`;

// Resolvers
const resolvers = {
    Query: {
        title() {
            return 'Best Product Ever';
        },
        price() {
            return 2.99;
        },
        releaseYear() {
            return null;
        },
        rating() {
            return null;
        },
        inStock() {
            return true;
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