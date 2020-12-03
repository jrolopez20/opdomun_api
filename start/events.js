const Event = use('Event')

Event.on('new::post', 'Post.created')

Event.on('new::subscription', 'Subscription.created')
