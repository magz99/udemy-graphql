import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
});

// prisma.query prisma.mutation prisma.subscription prisma.exists

const createPostForUser = async (authorId, data) => {
    const post = await prisma.mutation.createPost({
        data: {
            ...data,
            author: {
                connect: {
                    id: authorId
                }
            }
        }
    }, '{ id }');

    const user = await prisma.query.user({
        where: {
            id: authorId
        }
    }, '{ id name email posts { id title published } }');

    return user;
};

const updatePostForUser = async (postId, data) => {

    const post = await prisma.mutation.updatePost({
        where: {
            id: postId
        },
        data: {
            ...data
        }
    }, '{ author { id } }');

    const user = await prisma.query.user({
        where: {
            id: post.author.id
        }
    }, '{ id name email posts { id title published } }');

    return user;
};

// updatePostForUser('ckqflgzv000m70916hgo5y3vp', {
//     title: 'Not so great post....boooo'
// }).then((user) => {
//     console.log(JSON.stringify(user, undefined, 2));
// });

// createPostForUser('ckqfg16il002d09163h5v1zvh', {
//     title: 'Great post...hahaha',
//     body: 'I recommend not to read any books....',
//     published: true
// }).then((user) => {
//     console.log(JSON.stringify(user, undefined, 2));
// })

// prisma.query.users(null, '{ id name posts { id title } }').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2));
// });

// prisma.query.comments(null, '{ id text author { id name } }').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2));
// });
