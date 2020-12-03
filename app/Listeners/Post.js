'use strict'

const Post = exports = module.exports = {}

Post.created = async ({post}) => {
    console.log('listen registered post', post.id)
}
