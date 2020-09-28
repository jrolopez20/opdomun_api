'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

class HisPost extends Model {

  static boot() {
    super.boot()
    this.addTrait('CastDate')
  }

  static castDates(field, value) {
    return value;
  }

  static async getMonthHistory(userId) {
    return {
      'publicados': await this.getMonthPublishedPosts(userId),
      'renovados': await this.getMonthRenovadoPosts(userId)
    };
  }

  static async getMonthPublishedPosts(userId, year = null, month = null) {
    const query = Database
      .table('posts')
      .select('plan')
      .innerJoin('his_posts', 'posts.id', 'his_posts.post_id')
      .where('user_id', userId)
      .andWhere('his_posts.action', 1)
      .orderBy('plan')
      .count('posts.id as total')
      .groupByRaw('plan');

    if (year) {
      query.whereRaw('EXTRACT(year FROM his_posts.created_at) = ?', year)
    }
    if (month) {
      query.whereRaw('EXTRACT(month FROM his_posts.created_at) = ?', month)
    }

    return await query;
  }

  /**
   * Devuelve la cantidad de renovaciones de anuncio que hizo un usuario
   * @param userId
   * @param currentMonth
   * @returns {Promise<*>}
   */
  static async getMonthRenovadoPosts(userId, currentMonth = true, currentYear = true) {
    const query = Database
      .table('his_posts')
      .count('his_posts.id as total')
      .innerJoin('posts', 'posts.id', 'his_posts.post_id')
      .andWhere('his_posts.action', 2) //Accion para tasacion
      .andWhereRaw('EXTRACT(year FROM his_posts.created_at) = EXTRACT(year FROM now())');

    if (userId) {
      query.where('posts.user_id', userId)
    }

    if (currentMonth === true) {
      query.andWhereRaw('EXTRACT(month FROM his_posts.created_at) = EXTRACT(month FROM now())')
    } else if (typeof (parseInt(currentMonth)) === 'number') {
      query.andWhereRaw(`date_part('month', his_posts.created_at) = ${currentMonth}`);
    }

    if (currentYear === true) {
      query.andWhereRaw(`date_part('year', his_posts.created_at) = date_part('year', now())`)
    } else if (typeof (parseInt(currentYear)) === 'number') {
      query.andWhereRaw(`date_part('year', his_posts.created_at) = ${currentYear}`);
    }

    const result = await query;
    return result[0].total

    return await query;
  }

  static async getHistoryPosts(userId, action, year = null, month = null, group = false) {
    const query = Database
      .table('posts')
      .select('posts.plan')
      .innerJoin('his_posts', 'posts.id', 'his_posts.post_id')
      .where('posts.user_id', userId)
      .andWhere('his_posts.action', action)
      .count('his_posts.id as total');

    if (year) {
      query.whereRaw(`date_part('year', his_posts.created_at) = {year}`)
    }
    if (month) {
      query.whereRaw(`date_part('month', his_posts.created_at) = ${month}`)
    }
    if (group) {
      query.groupByRaw('posts.plan');
    }
    return await query;
  }

  static getCurrentMonth() {
    return new Date().toLocaleDateString().split('-')[1];
  }

  static getCurrentYear() {
    return new Date().toLocaleDateString().split('-')[0];
  }

  static async getStatisticsByUser(userId, currentMonth) {
    return {
      'publicados': await this.getMonthPublishedPosts(userId),
      'renovados': await this.getMonthRenovadoPosts(userId, currentMonth)
    };
  }

  /**
   * Devuelve la cantidad de anuncios publicados clasificados por plan
   * @param userId
   * @param filterByMonth
   * @returns {Promise<*>}
   */
  static async getCountPublishedPosts(userId, currentMonth = true, currentYear = true) {

    const query = Database
      .table('posts')
      .select('posts.plan', 'plans.title', 'plans.price')
      .count('posts.id as total')
      .innerJoin('his_posts', 'posts.id', 'his_posts.post_id')
      .innerJoin('plans', 'plans.id', 'posts.plan')
      .andWhere('his_posts.action', 1)
      .orderBy('plans.ranking', 'desc')
      .groupByRaw('posts.plan');

    if (userId) {
      query.where('posts.user_id', userId)
    }

    if (currentMonth === true) {
      query.andWhereRaw(`date_part('month', his_posts.created_at) = date_part('month', now())`)
    } else if (typeof (parseInt(currentMonth)) === 'number') {
      query.andWhereRaw(`date_part('month', his_posts.created_at) = ${currentMonth}`);
    }

    if (currentYear === true) {
      query.andWhereRaw(`date_part('year', (his_posts.created_at) = date_part('year', now())`)
    } else if (typeof (parseInt(currentYear)) === 'number') {
      query.andWhereRaw(`date_part('year', his_posts.created_at) = ${currentYear}`);
    }
    return await query;
  }

  /**
   * Devuelve la cantidad de tasaciones que hizo un usuario
   * @param userId
   * @param filterByMonth
   * @returns {Promise<*>}
   */
  static async getTasacionPosts(userId, currentMonth = true, currentYear = true) {
    const query = Database
      .table('his_posts')
      .count('his_posts.id as total')
      .innerJoin('posts', 'posts.id', 'his_posts.post_id')
      .andWhere('his_posts.action', 3) //Accion para tasacion
      .andWhereRaw(`date_part('year', his_posts.created_at) = date_part('year', now())`);

    if (userId) {
      query.where('posts.user_id', userId)
    }

    if (currentMonth === true) {
      query.andWhereRaw(`date_part('month', his_posts.created_at) = date_part('month', now())`)
    } else if (typeof (parseInt(currentMonth)) === 'number') {
      query.andWhereRaw(`date_part('month', his_posts.created_at) = ${currentMonth}`);
    }

    if (currentYear === true) {
      query.andWhereRaw(`date_part('year', his_posts.created_at) = year(now())`)
    } else if (typeof (parseInt(currentYear)) === 'number') {
      query.andWhereRaw(`date_part('year', his_posts.created_at) = ${currentYear}`);
    }

    const result = await query;
    return result[0].total
  }

  static async getGlobalStatistics() {
    const publicados = await Database.raw('select count(posts.id) as total_posts, SUM(TIMESTAMPDIFF(MONTH, posts.created_at, posts.closed_at)) as total_months\n' +
      'from `posts`\n' +
      'inner join `his_posts` on `posts`.`id` = `his_posts`.`post_id`\n' +
      'where `his_posts`.`action` = 1 and month(his_posts.created_at) = month(now()) and posts.plan = 1');

    const renovados = await Database.raw('select count(posts.id) as total_posts, SUM(TIMESTAMPDIFF(MONTH, now(), posts.closed_at)) as total_months\n' +
      'from `posts`\n' +
      'inner join `his_posts` on `posts`.`id` = `his_posts`.`post_id`\n' +
      'where `his_posts`.`action` = 2 and month(his_posts.created_at) = month(now()) and posts.plan = 1');
    return {
      'publicados': publicados[0][0],
      'renovados': renovados[0][0],
      'tasacion': await this.getTasacionPosts(null, true, true)
    };
  }

  static async getStatisticsByUser2(userId, currentMonth = true, currentYear = true) {
    return {
      'publicados': await this.getCountPublishedPosts(userId, currentMonth, currentYear),
      'renovados': await this.getMonthRenovadoPosts(userId, currentMonth, currentYear),
      'tasacion': await this.getTasacionPosts(userId, currentMonth, currentYear)
    };
  }

  static async getSummaryTable(userId) {
    return {
      total: {
        'publicados': await this.getHistoryPosts(userId, 1, null, null, true),
        'renovados': await this.getHistoryPosts(userId, 2)
      },
      month: {
        'publicados': await this.getHistoryPosts(userId, 1, this.getCurrentYear(), this.getCurrentMonth(), true),
        'renovados': await this.getHistoryPosts(userId, 2, this.getCurrentYear(), this.getCurrentMonth())
      }
    }
  }

  static async getTotalByMonth() {
    const query = await Database
      .raw('select month(created_at) as `month`, action, count(id) as `total` from `his_posts` ' +
        'where year(created_at) = year(now()) group by month(created_at), action ' +
        'order by month(created_at) asc');
    return query[0];
  }

  post() {
    return this.belongsTo('App/Models/Post');
  }
}

module.exports = HisPost
