import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
});

// prisma.query prisma.mutation prisma.subscription prisma.exists

// prisma.query.users(null, '{ id name posts { id title } }').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2));
// });

// prisma.query.comments(null, '{ id text author { id name } }').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2));
// });

prisma.mutation.updatePost({
    data: {
        title: "My new GraphQL post #2 is now live once again!",
        published: true,

    },
    where: {
        id: "ckqfkqd8i00lf0916xymvhjgn"
    }
}, '{ id title body published }').then((data) => {
    //console.log(JSON.stringify(data, undefined, 2));
    console.log(data);
    return prisma.query.posts(null, '{ id title body published }')
}).then((data) => {
    console.log(JSON.stringify(data, undefined, 2));
});