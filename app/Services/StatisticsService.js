'use strict'
const Post = use('App/Models/Post');
const Office = use('App/Models/Office');
const User = use('App/Models/User');
const Subscription = use('App/Models/Subscription');
const Database = use('Database')

class StatisticsService {

    static async getServices(user, startAt, endAt) {
        startAt += ' 00:00:00';
        endAt += ' 23:59:59';
        const query = Database
            .table('posts')
            .select('posts.plan_id', 'plans.type')
            .leftJoin('plans', 'posts.plan_id', 'plans.id')
            .whereRaw('(posts.plan_id is null AND posts.created_at >= ? AND posts.created_at <= ?) OR (posts.published_at >= ? AND posts.published_at <= ?)', [startAt, endAt, startAt, endAt])
            .leftJoin('users', 'posts.user_id', 'users.id')
            .orderBy('plan_id', 'plans.type')
            .count('posts.id as total')
            .groupBy('posts.plan_id', 'plans.type')
        ;

        if (user.role === User.roles().MANAGER) {
            query.innerJoin('offices', 'users.office_id', 'offices.id')
            query.andWhere('offices.id', user.office_id)
            query.whereIn('posts.plan_id', [null, 1])
        }

        if (user.role === User.roles().AGENT) {
            query.andWhere('posts.user_id', user.id)
            query.whereIn('posts.plan_id', [null, 1])
        }

        let services = await query;

        if (user.role === User.roles().ADMIN) {
            const result = await Subscription.getTotalSubscriptions(startAt, endAt)
            services.push({
                plan_id: 'subscription',
                title: 'Suscripciones',
                total: result
            })
        }

        for (let service of services) {
            if (service.plan_id) {
                service.title = 'Anuncios ' + service.type
            }
            else {
                service.title = 'Tasaciones'
            }
        }
        return services;
    }

    static async servicesByOffice(startAt, endAt) {
        startAt += ' 00:00:00';
        endAt += ' 23:59:59';
        const result = await Office
            .query()
            .with('provincia')
            .fetch();

        const offices = result.toJSON()

        for (const office of offices) {
            office.services = await this.getServicesByOffice(startAt, endAt, office.id);
        }

        return offices;
    }

    static async servicesByUser(startAt, endAt, officeId) {
        startAt += ' 00:00:00';
        endAt += ' 23:59:59';
        const services = await Database
            .table('posts')
            .count('posts.id as total')
            .select('posts.plan_id', 'plans.type', 'users.fullname')
            .leftJoin('plans', 'posts.plan_id', 'plans.id')
            .innerJoin('users', 'posts.user_id', 'users.id')
            .whereRaw("users.office_id = ? AND ((posts.plan_id is null AND posts.created_at >= ? AND posts.created_at <= ?) OR (plans.type = 'PREMIUM' AND posts.published_at >= ? AND posts.published_at <= ?))", [officeId, startAt, endAt, startAt, endAt])
            .groupBy('users.fullname', 'posts.plan_id')
        ;
        const response = [];
        services.map(service => {
            let item = response.find(item => item.fullname === service.fullname)
            if (item) {
                item.services.push({
                    total: service.total,
                    plan_id: service.plan_id,
                    title: service.plan_id ? 'Anuncios ' + service.title : 'Tasaciones'
                })
            } else {
                response.push({
                    fullname: service.fullname,
                    services: [{
                        total: service.total,
                        plan_id: service.plan_id,
                        title: service.plan_id ? 'Anuncios ' + service.title : 'Tasaciones'
                    }]
                })
            }
        });
        return response;
    }

    static async getServicesByOffice(startAt, endAt, officeId) {
        const services = await Database
            .table('posts')
            .select('posts.plan_id', 'plans.type')
            .leftJoin('plans', 'posts.plan_id', 'plans.id')
            .innerJoin('users', 'posts.user_id', 'users.id')
            .whereRaw("users.office_id = ? AND ((posts.plan_id is null AND posts.created_at >= ? AND posts.created_at <= ?) OR (plans.type = 'PREMIUM' AND posts.published_at >= ? AND posts.published_at <= ?))", [officeId, startAt, endAt, startAt, endAt])
            .orderBy('plan_id', 'plans.type')
            .count('posts.id as total')
            .groupBy('posts.plan_id', 'plans.type')
        ;

        const response = [];

        const premium = services.find(item => item.type === Plan.TYPES().PREMIUM);
        response.push({
            plan_id: 1,
            title: 'Anuncio premium',
            total: premium ? premium.total : 0
        })

        const appraisal = services.find(item => item.plan_id === null);
        response.push({
            plan_id: null,
            title: 'Tasaciones',
            total: appraisal ? appraisal.total : 0
        })

        return response;
    }

    static async getServicesByUser(startAt, endAt, userId) {
        startAt += ' 00:00:00';
        endAt += ' 23:59:59';
        const services = await Database
            .table('posts')
            .select('posts.plan_id', 'plans.type')
            .leftJoin('plans', 'posts.plan_id', 'plans.id')
            .innerJoin('users', 'posts.user_id', 'users.id')
            .whereRaw("users.id = ? AND ((posts.plan_id is null AND posts.created_at >= ? AND posts.created_at <= ?) OR (plans.type = 'PREMIUM' AND posts.published_at >= ? AND posts.published_at <= ?))", [userId, startAt, endAt, startAt, endAt])
            .orderBy('plan_id', 'plans.type')
            .count('posts.id as total')
            .groupBy('posts.plan_id', 'plans.type')
        ;

        const response = [];

        const premium = services.find(item => item.type === Plan.TYPES().PREMIUM);
        response.push({
            plan_id: 1,
            title: 'Anuncio premium',
            total: premium ? premium.total : 0
        })

        const appraisal = services.find(item => item.plan_id === null);
        response.push({
            plan_id: null,
            title: 'Tasaciones',
            total: appraisal ? appraisal.total : 0
        })

        return response;
    }

}

module.exports = StatisticsService;
