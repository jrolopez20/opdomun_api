const Event = use('Event')

Event.on('new::post', 'Post.created')

Event.on('visitor::post', 'Post.visited')

Event.on('new::subscription', 'Subscription.created')
