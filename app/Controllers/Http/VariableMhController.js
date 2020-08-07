'use strict'

const Database = use('Database')
const PostVariable = use('App/Models/PostVariable')
const NomMoviliario = use('App/Models/NomMoviliario')
const NomElectrodomestico = use('App/Models/NomElectrodomestico')
const VarMenaje = use('App/Models/VarMenaje')
const MenajeMoviliario = use('App/Models/MenajeMoviliario')
const MenajeElectrodomestico = use('App/Models/MenajeElectrodomestico')

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
            const menaje = await VarMenaje.findBy('post_id', postVariable.post_id);
            let moviliario = null;
            let electrodomesticos = null;

            if (menaje) {
                moviliario = [];
                electrodomesticos = [];

                const moviliarioResponse = await VarMenaje.listMoviliario(postVariable.post_id);
                moviliarioResponse.map(item => moviliario.push(item.id));

                const electrodomesticoResponse = await VarMenaje.listElectrodomesticos(postVariable.post_id)
                electrodomesticoResponse.map(item => electrodomesticos.push(item.id));
            }

            const mh = {
                sold_with_menaje: menaje ? menaje.exist : false,
                moviliario: moviliario,
                electrodomesticos: electrodomesticos
            };

            return response.json(mh);
        } catch (e) {
            return response.status(404).json({message: e.message});
        }
    }

    async update({params, request, response}) {
        try {
            const soldWithMenaje = request.input("sold_with_menaje");
            const moviliario = request.input("moviliario");
            const electrodomesticos = request.input("electrodomesticos");

            let postVariable = await PostVariable.find(params.id);

            let menaje = await VarMenaje.findBy('post_id', postVariable.post_id)
            if (!menaje) {
                menaje = new VarMenaje();
                menaje.post_id = postVariable.post_id;
            }
            menaje.exist = soldWithMenaje;
            await menaje.save();

            await MenajeMoviliario.query()
                .where('menaje_id', menaje.id)
                .delete();

            await MenajeElectrodomestico.query()
                .where('menaje_id', menaje.id)
                .delete();

            const trx = await Database.beginTransaction();

            if (soldWithMenaje) {
                if (moviliario && moviliario.length > 0) {
                    const arrMoviliario = moviliario.map((item) => {
                        return {
                            menaje_id: menaje.id,
                            moviliario_id: item
                        }
                    });
                    await MenajeMoviliario.createMany(arrMoviliario, trx);
                }

                if (electrodomesticos && electrodomesticos.length > 0) {
                    const arrElectrodomestico = electrodomesticos.map((item) => {
                        return {
                            menaje_id: menaje.id,
                            electrodomestico_id: item
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
