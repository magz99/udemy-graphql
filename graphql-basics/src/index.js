import { GraphQLServer } from 'graphql-yoga';

// Scalar types - String, Boolean, Int, Float, ID
// Scalar means 1 single value

// Type definitions (schema)
const typeDefs = `
    type Query {
        greeting(name: String): String!
        add(numbers: [Float!]!): Float!
        grades: [Int!]!
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
        greeting(parent, args, ctx, info) {
            if (args.name) {
                return `Hello ${args.name}!`;
            }

            return 'Hello!';
        },
        add(parent, args, ctx, info) {
            if (args.numbers.length) {
                return args.numbers.reduce((agg, curr) => {
                    return agg += curr;
                }, 0);
            }
            return 0;
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
        },
        grades() {
            return [70, 90, 80]
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