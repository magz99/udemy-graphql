import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import User from './resolvers/User';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';

const pubsub = new PubSub();

// Scalar types - String, Boolean, Int, Float, ID
// Scalar means 1 single value

// Resolvers
// ctx - context
// args - args obj containing values provided

// Type definitions (schema)
// input only support scalar values
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Subscription,
        User,
        Post,
        Comment
    },
    context: {
        db,
        pubsub
    }
});

server.start(() => {
    console.log('The server is up!');
});