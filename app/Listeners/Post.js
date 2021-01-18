'use strict'

const NotificationService = use('App/Services/NotificationService');

const Post = exports = module.exports = {}

Post.created = async ({post}) => {
    await NotificationService.notifyBuyers(post);
    await NotificationService.notifyPostOwner(post);
    await NotificationService.notifyPostPremiumOwnerAboutOlderSubscription(post);
}

Post.visited = async ({post}) => {
    if (post.postVisit.total === 20 || post.postVisit.total === 50 || post.postVisit.total === 100) {
        await NotificationService.notifyNumberOfVisits(post);
    }
}
