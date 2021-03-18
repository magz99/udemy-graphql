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
    published: true,
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

const db = {
    users,
    posts,
    comments
};

export { db as default };