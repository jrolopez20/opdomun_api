'use strict'

const Model = use('Model')
const Database = use('Database')

class VarMenaje extends Model {

    static async listMoviliario(postId) {
        const selectedMobiliario = await Database.select('nm.id', 'nm.title')
            .from('nom_moviliarios as nm')
            .innerJoin('menaje_moviliarios as mm', 'nm.id', 'mm.moviliario_id')
            .innerJoin('var_menajes as m', 'm.id', 'mm.menaje_id')
            .where('m.post_id', postId);

        return selectedMobiliario;
    }

    static async listElectrodomesticos(postId) {
        const selectedElectrodomestico = await Database.select('ne.id', 'ne.title')
            .from('nom_electrodomesticos as ne')
            .innerJoin('menaje_electrodomesticos as me', 'ne.id', 'me.electrodomestico_id')
            .innerJoin('var_menajes as m', 'm.id', 'me.menaje_id')
            .where('m.post_id', postId);

        return selectedElectrodomestico;
    }

    static async getMenaje(postId) {
        const menaje = await this.findBy('postId', postId);
        if (menaje && menaje.exist) {
            const moviliario = await Database.select('nm.id', 'nm.title')
                .from('var_menajes as m')
                .innerJoin('menaje_moviliarios as mm', 'm.id', 'mm.menaje_id')
                .innerJoin('nom_moviliarios as nm', 'nm.id', 'mm.moviliario_id')
                .where('m.post_id', postId)

            const electrodomestico = await Database.select('ne.id', 'ne.title')
                .from('var_menajes as m')
                .innerJoin('menaje_electrodomesticos as me', 'm.id', 'me.menaje_id')
                .innerJoin('nom_electrodomesticos as ne', 'ne.id', 'me.electrodomestico_id')
                .where('m.post_id', postId)

            return {
                moviliario: moviliario,
                electrodomestico: electrodomestico
            }
        } else {
            return false;
        }
    }

    menajeMoviliario() {
        return this.hasMany('App/Models/MenajeMoviliario', 'id', 'menajeId');
    }

    menajeElectrodomestico() {
        return this.hasMany('App/Models/MenajeElectrodomestico', 'id', 'menajeId');
    }

    post() {
        return this.belongsTo('App/Models/Post', 'postId', 'id');
    }

}

module.exports = VarMenaje
