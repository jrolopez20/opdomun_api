'use strict'

const PostVariable = use('App/Models/PostVariable')
const Post = use('App/Models/Post')
const ResourceNotFoundException = use("App/Exceptions/ResourceNotFoundException");

/**
 * Resourceful controller for interacting with posts
 */
class VariableIuController {

    getDiccCalInfUrb() {
        const diccCalInfUrb = {
            agua: {title: 'Abastecimiento de agua potable'},
            electricidad: {title: 'Abastecimiento de electricidad'},
            internet: {title: 'Acceso a Internet'},
            cobertura_movil: {title: 'Cobertura Móvil'},
            saneamiento_sanitario: {title: 'Saneamiento sanitario'},
            calle_acera: {title: 'Calles y aceras'},
            gas_licuado: {title: 'Abastecimiento de Gas Licuado (calle)'},
            trasporte_publico: {title: 'Transporte público'}
        };
        return diccCalInfUrb;
    }

    async show({params, response}) {
        try {
            const postVar = await PostVariable.find(params.id);

            await postVar.load('infUrbanas');
            const infUrbanas = await postVar.getRelated('infUrbanas').toJSON();
            const services = {...this.getDiccCalInfUrb()};

            for (let service in this.getDiccCalInfUrb()) {
                services[service] = infUrbanas.length ? infUrbanas.find(item => {
                    return this.getDiccCalInfUrb()[service].title === item.title
                }).value : null
            }

            return response.json(services);
        } catch (e) {
            throw new ResourceNotFoundException();
        }
    }

    async update({params, request, response}) {
        try {
            const postVariable = await PostVariable.find(params.id)
            const services = request.input('services');
            let items = Array();

            for (let service in services) {
                items.push({
                    post_variable_id: postVariable.id,
                    value: services[service],
                    title: this.getDiccCalInfUrb()[service].title
                });

            }
            await postVariable.calculateIu(items);

            return response.json(postVariable);
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }
}

module.exports = VariableIuController
