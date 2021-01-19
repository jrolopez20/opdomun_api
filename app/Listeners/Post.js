'use strict'

const NotificationService = use('App/Services/NotificationService');
const Plan = use('App/Models/Plan');

const Post = exports = module.exports = {}

Post.created = async ({post}) => {
    await NotificationService.notifyBuyers(post);
    await NotificationService.notifyPostPremiumOwnerAboutOlderSubscription(post);

    if(post.plan.type === Plan.TYPES().PREMIUM) {
        await NotificationService.notifyPostOwner(post);
    }
}

Post.visited = async ({post}) => {
    if (post.postVisit.total === 20 || post.postVisit.total === 50 || post.postVisit.total === 100) {
        await NotificationService.notifyNumberOfVisits(post);
    }
}
