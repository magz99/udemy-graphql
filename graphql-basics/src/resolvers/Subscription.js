const Subscription = {
    comment: {
        subscribe(parent, { postId }, { db, pubsub }, info) {
            const post = db.posts.find((post) => {
                return post.id === postId && post.published;
            });

            if (!post) {
                throw new Error('Post not found.');
            }

            return pubsub.asyncIterator(`comment ${post.id}`);
        }
    },
    post: {
        subscribe(parent, args, { pubsub }, info) {
            return pubsub.asyncIterator('post');
        }
    }
};


export { Subscription as default };