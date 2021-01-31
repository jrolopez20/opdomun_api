'use strict'

const Model = use('Model')
const Database = use('Database')

class ColindanciaPrivacidad extends Model {
    static getDicc() {
        return {
            relHorOptions: [
                {label: 'Directo', value: 30},
                {label: 'Pasillo perimetral / Portal / Jardín', value: 60},
                {label: 'Portal / Jardín', value: 100}
            ],
            relVertOptions: [
                { label: 'A nivel del terreno', value: 30 },
                { label: 'Segundo nivel', value: 60 },
                { label: 'Tercer o más nivel', value: 100 }
            ],
            tipoViaOptions: [
                { label: 'Principal', value: 30 },
                { label: 'Secundaria', value: 60 },
                { label: 'Terciaria', value: 100 }
            ],
            alturaCercPerOptions: [
                { label: 'Menor que 1.50 m', value: 'menor150' },
                { label: 'Menor que 2.00 m', value: 'menor200' },
                { label: 'Mayor que 2.00 m', value: 'mayor200' }
            ],
            permeabilidadOptions: [
                { label: '0 - 25%', value: 25 },
                { label: '25% - 50%', value: 50 },
                { label: '50% - 75%', value: 75 },
                { label: '75% - 100%', value: 100 }
            ],
            alturaOptions: [
                { label: '2 niveles', value: 2 },
                { label: '3 niveles', value: 3 },
                { label: '4 niveles', value: 4 },
                { label: '5 o más', value: 5 }
            ],
            distanciaOptions: [
                { label: '3 metros', value: '3m' },
                { label: '12 metros', value: '12m' },
                { label: '24 metros', value: '24m' },
                { label: '36 o más', value: '36m' }
            ]
        }
    }

    static async removeColindanciaPrivacidad(postVariableId) {
        await ColindanciaPrivacidad
            .query()
            .where('postVariableId', postVariableId)
            .delete()
    }

    static async getColindanciaPrivacidad(postId) {
        return await Database.select('cp.*')
            .from('colindancia_privacidads as cp')
            .innerJoin('post_variables as pv', 'pv.id', 'cp.post_variable_id')
            .where('pv.post_id', postId)
            .first()
    }

    postVariable() {
        return this.belongsTo('App/Models/PostVariable');
    }
}

module.exports = ColindanciaPrivacidad;
