const Query = {
    users(parent, args, { db }, info) {
        if (!args.query) {
            return db.users;
        }
        return db.users.filter(user => {
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
    posts(parent, args, { db }, info) {
        if (!args.query) {
            return db.posts;
        }
        return db.posts.filter(post => {
            const titleMatches = post.title.toLowerCase().includes(args.query.toLowerCase());
            const bodyMatches = post.body.toLowerCase().includes(args.query.toLowerCase())
            return titleMatches || bodyMatches;
        });
    },
    comments(parent, args, { db }, info) {
        return db.comments;
    }
};

export { Query as default }