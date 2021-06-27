import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
});

// prisma.query prisma.mutation prisma.subscription prisma.exists

const createPostForUser = async (authorId, data) => {

    const userExists = await prisma.exists.User({ id: authorId });

    if (!userExists) {
        throw new Error('User does not exist.');
    }

    const post = await prisma.mutation.createPost({
        data: {
            ...data,
            author: {
                connect: {
                    id: authorId
                }
            }
        }
    }, '{ author { id name email posts { id title published } } }');

    return post.author;
};

const updatePostForUser = async (postId, data) => {

    const postExists = await prisma.exists.Post({
        id: postId
    });

    if (!postExists) {
        throw new Error('Post does not exist.');
    }

    const post = await prisma.mutation.updatePost({
        where: {
            id: postId
        },
        data: {
            ...data
        }
    }, '{ author { id name email posts { id title published } } }');

    return post.author;

};

updatePostForUser('ckqflgzv000m70916hgo5y3vp', {
    title: 'Not so great post....boooo'
}).then((user) => {
    console.log(JSON.stringify(user, undefined, 2));
}).catch((error) => {
    console.log(error.message);
});

// createPostForUser('ckqfgtu7o004e0916szpxvf4m', {
//     title: 'Great post...hahaha',
//     body: 'I recommend not to read any books....',
//     published: true
// }).then((user) => {
//     console.log(JSON.stringify(user, undefined, 2));
// }).catch((error) => {
//     console.log(error.message);
// })

// prisma.query.users(null, '{ id name posts { id title } }').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2));
// });

// prisma.query.comments(null, '{ id text author { id name } }').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2));
// });
