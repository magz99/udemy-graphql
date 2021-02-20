import { GraphQLServer } from 'graphql-yoga';

// Scalar types - String, Boolean, Int, Float, ID
// Scalar means 1 single value

const demoData = [
    {
        id: 99,
        name: 'Magz',
        email: 'magzb.99@gmail.com',
        age: 33
    },
    {
        id: 88,
        name: 'Sangin',
        email: 'sangin@gmail.com',
        age: 38
    }
];

// Type definitions (schema)
const typeDefs = `
    type Query {
        users: [User!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`;

// Resolvers
// ctx - context
// args - args obj containing values provided
const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            return demoData;
        },
        me() {
            return {
                id: '2113',
                name: 'Magz',
                email: 'mbautistalee@gmail.com',
                age: 33
            }
        },
        post() {
            return {
                id: '999',
                title: 'Some Post',
                body: 'This is the body of the Post',
                published: true
            }
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