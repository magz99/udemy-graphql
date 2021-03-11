import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';

// Scalar types - String, Boolean, Int, Float, ID
// Scalar means 1 single value

// Demo user data
const users = [{
    id: '1',
    name: 'Andrew',
    email: 'andrew@example.com',
    age: 27
}, {
    id: '2',
    name: 'Sarah',
    email: 'sarah@example.com'
}, {
    id: '3',
    name: 'Mike',
    email: 'mike@example.com'
}];

const posts = [{
    id: '10',
    title: 'GraphQL 101',
    body: 'This is how to use GraphQL...',
    published: true,
    author: '1'
}, {
    id: '11',
    title: 'GraphQL 201',
    body: 'This is an advanced GraphQL post...',
    published: false,
    author: '1'
}, {
    id: '12',
    title: 'Programming Music',
    body: '',
    published: false,
    author: '2'
}];

const comments = [
    {
        id: '33',
        text: 'This is a random comment, yay.',
        author: '2',
        post: '11'
    },
    {
        id: '44',
        text: 'Why does this comment exist?',
        author: '2',
        post: '12'
    },
    {
        id: '55',
        text: 'Hello, this is my comment!!!!',
        author: '1',
        post: '11'
    },
    {
        id: '58',
        text: 'I didn\'t like this book. I thought it was poorly written.',
        author: '3',
        post: '10'
    }
]


// Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String):[User!]!
        me: User!
        post: Post!
        posts(query: String): [Post!]!
        comments: [Comment!]!
    }

    type Mutation {
        createUser(name: String!, email: String!, age: Int): User!
        createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
        createComment(text: String!, author: ID!, post: ID!): Comment!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`;

// Resolvers
// ctx - context
// args - args obj containing values provided
const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users;
            }
            return users.filter(user => {
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
                return posts;
            }
            return posts.filter(post => {
                const titleMatches = post.title.toLowerCase().includes(args.query.toLowerCase());
                const bodyMatches = post.body.toLowerCase().includes(args.query.toLowerCase())
                return titleMatches || bodyMatches;
            });
        },
        comments(parent, args, ctx, info) {
            return comments;
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author;
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.post === parent.id;
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter(post => {
                return post.author === parent.id;
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter(comment => {
                return comment.author === parent.id;
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author;
            })
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => {
                return post.id === parent.post;
            })
        }
    },
    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some((user) => {
                return user.email === args.email;
            });

            if (emailTaken) {
                throw new Error('Email taken.');
            }

            const user = {
                id: uuidv4(),
                ...args,
            }

            users.push(user);

            return user;
        },
        createPost(parent, args, ctx, info) {
            const userExists = users.some((user) => {
                return user.id === args.author;
            });

            if (!userExists) {
                throw new Error('User not found.');
            }

            const post = {
                id: uuidv4(),
                ...args,
            }

            posts.push(post);

            return post;
        },
        createComment(parent, args, ctx, info) {
            const userExists = users.some((user) => {
                return user.id === args.author;
            });
            if (!userExists) {
                throw new Error('User not found.');
            }
            const postExistsAndIsPublished = posts.some((post) => {
                return post.id === args.post && post.published
            });
            if (!postExistsAndIsPublished) {
                throw new Error('Post not found or not published.');
            }

            const comment = {
                id: uuidv4(),
                ...args,
            }

            comments.push(comment);

            return comment;
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