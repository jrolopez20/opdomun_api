'use strict'

const Database = use('Database')
const PostVariable = use('App/Models/PostVariable')
const NomMoviliario = use('App/Models/NomMoviliario')
const NomElectrodomestico = use('App/Models/NomElectrodomestico')
const VarMenaje = use('App/Models/VarMenaje')
const MenajeMoviliario = use('App/Models/MenajeMoviliario')
const MenajeElectrodomestico = use('App/Models/MenajeElectrodomestico')
const ResourceNotFoundException = use("App/Exceptions/ResourceNotFoundException");

/**
 * Resourceful controller for interacting with posts
 */
class VariableMhController {

    async getMoviliarioOptions({response}) {
        const items = await NomMoviliario.all()
        return response.json(items);
    }

    async getElectrodomesticoOptions({response}) {
        const items = await NomElectrodomestico.all()
        return response.json(items);
    }

    async show({params, response}) {
        try {
            const postVariable = await PostVariable.find(params.id);
            const menaje = await VarMenaje.findBy('postId', postVariable.postId);
            let moviliario = null;
            let electrodomesticos = null;

            if (menaje) {
                moviliario = [];
                electrodomesticos = [];

                const moviliarioResponse = await VarMenaje.listMoviliario(postVariable.postId);
                moviliarioResponse.map(item => moviliario.push(item.id));

                const electrodomesticoResponse = await VarMenaje.listElectrodomesticos(postVariable.postId)
                electrodomesticoResponse.map(item => electrodomesticos.push(item.id));
            }

            const mh = {
                soldWithMenaje: menaje ? menaje.exist : false,
                moviliario: moviliario,
                electrodomesticos: electrodomesticos
            };

            return response.json(mh);
        } catch (e) {
            throw new ResourceNotFoundException();
        }
    }

    async update({params, request, response}) {
        try {
            const soldWithMenaje = request.input("soldWithMenaje");
            const moviliario = request.input("moviliario");
            const electrodomesticos = request.input("electrodomesticos");

            let postVariable = await PostVariable.find(params.id);

            let menaje = await VarMenaje.findBy('postId', postVariable.postId)
            if (!menaje) {
                menaje = new VarMenaje();
                menaje.postId = postVariable.postId;
            }
            menaje.exist = soldWithMenaje;
            await menaje.save();

            await MenajeMoviliario.query()
                .where('menajeId', menaje.id)
                .delete();

            await MenajeElectrodomestico.query()
                .where('menajeId', menaje.id)
                .delete();

            const trx = await Database.beginTransaction();

            if (soldWithMenaje) {
                if (moviliario && moviliario.length > 0) {
                    const arrMoviliario = moviliario.map((item) => {
                        return {
                            menajeId: menaje.id,
                            moviliarioId: item
                        }
                    });
                    await MenajeMoviliario.createMany(arrMoviliario, trx);
                }

                if (electrodomesticos && electrodomesticos.length > 0) {
                    const arrElectrodomestico = electrodomesticos.map((item) => {
                        return {
                            menajeId: menaje.id,
                            electrodomesticoId: item
                        }
                    });
                    await MenajeElectrodomestico.createMany(arrElectrodomestico, trx);
                }
            }

            await trx.commit();
            await postVariable.calculateMh(moviliario, electrodomesticos);

            return response.json(postVariable);
        } catch (e) {
            return response.status(400).json({message: e.message});
        }
    }
}

module.exports = VariableMhController
