import { GraphQLServer } from 'graphql-yoga';

// Scalar types - String, Boolean, Int, Float, ID
// Scalar means 1 single value

const demoUsers = [
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

const demoPosts = [
    {
        id: 1,
        title: 'My First Post',
        body: 'This is the body of my first post....',
        published: false
    },
    {
        id: 2,
        title: 'My Second Post',
        body: 'This is the body of my second post....Hello.',
        published: true
    },
    {
        id: 3,
        title: 'My Third Post',
        body: 'This is the body of my third post....Not yet published',
        published: false
    }
];

// Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String):[User!]!
        me: User!
        post: Post!
        posts(query: String): [Post!]!
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
            if (!args.query) {
                return demoUsers;
            }
            return demoUsers.filter(user => {
                return user.name.toLowerCase().includes(args.query.toLowerCase());
            })
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
        posts(parent, args, ctx, info) {
            if (!args.query) {
                return demoPosts;
            }
            return demoPosts.filter(post => {
                return post.title.toLowerCase().includes(args.query.toLowerCase()) || post.body.toLowerCase().includes(args.query.toLowerCase())
            });
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