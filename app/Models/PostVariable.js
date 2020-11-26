'use strict'

const Model = use('Model')
const Database = use('Database')

class PostVariable extends Model {
    static boot() {
        super.boot()
        this.addTrait('Au')
        this.addTrait('Ec')
        this.addTrait('Cf')
        this.addTrait('Cr')
        this.addTrait('Ds')
        this.addTrait('Iu')
        this.addTrait('Vs')
        this.addTrait('Tc')
        this.addTrait('Rd')
        this.addTrait('Pu')
        this.addTrait('Sc')
        this.addTrait('Fp')
        this.addTrait('De')
        this.addTrait('Mh')
    }

    static async getPostVariable(postVarId) {
        const postVar = await Database
            .table('post_variables')
            .select(
                'post_variables.id',
                'post_variables.post_id as postId',
                'post_variables.variable_id as variableId',
                'post_variables.result',
                'post_variables.points',
                'variables.title',
                'posts.address',
                'municipios.title as municipio',
                'provincias.cod as codProvincia'
            )
            .innerJoin('variables', 'variables.id', 'post_variables.variable_id')
            .innerJoin('posts', 'posts.id', 'post_variables.post_id')
            .innerJoin('municipios', 'municipios.id', 'posts.municipio_id')
            .innerJoin('provincias', 'provincias.id', 'municipios.provincia_id')
            .where('post_variables.id', postVarId)
            .first();

        return postVar;
    }

    variable() {
        return this.belongsTo('App/Models/Variable', 'variableId', 'id');

    }

    post() {
        return this.belongsTo('App/Models/Post', 'postId', 'id');
    }

    riesgo() {
        return this.hasOne('App/Models/Riesgo', 'id', 'postVariableId');
    }

    estConstructivas() {
        return this.hasMany('App/Models/EstConstructiva')
    }

    colindanciaPrivacidads() {
        return this.hasOne('App/Models/ColindanciaPrivacidad')
    }

    infUrbanas() {
        return this.hasMany('App/Models/InfUrbana')
    }

    servPublicos() {
        return this.hasMany('App/Models/ServPublico')
    }

    envElements() {
        return this.hasMany('App/Models/EnvElement')
    }
}

module.exports = PostVariable
