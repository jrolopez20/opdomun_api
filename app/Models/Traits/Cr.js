'use strict'
const Post = use('App/Models/Post');
const HomeType = use('App/Models/HomeType');
const Database = use('Database')

class Cr {
    register(Model, customOptions = {}) {
        const defaultOptions = {}
        const options = Object.assign(defaultOptions, customOptions)

        Model.prototype.getCr = async function getCr() {
            await this.load('colindanciaPrivacidads');
            const result = await this.getRelated('colindanciaPrivacidads');

            const response = {
                id: result ? result.id : null,
                relHor: result ? result.rel_hor : null,
                relVert: result ? result.rel_vert : null,
                tipoVia: result ? result.tipo_via : null,
                alturaCercPer: result ? result.altura_cerc_per : null,
                permeabilidad: result ? result.permeabilidad : null,
                altura: result ? result.altura : null,
                distancia: result ? result.distancia : null,
            };

            return response;
        };

        // Add an instance method
        Model.prototype.calculateCr = async function calculateCr(relHor, relVert,
                                                                 tipoVia, alturaCercPer, permeabilidad,
                                                                 altura, distancia) {
            let post = await Post.find(this.post_id);
            const homeType = await HomeType.find(post.home_type_id);
            const morfoUrb = homeType.value;

            let sum = parseFloat(relHor) + parseFloat(relVert) + parseFloat(morfoUrb) + parseFloat(tipoVia);
            let total = 4;
            if (alturaCercPer && permeabilidad) {
                const diccCercadoPerimetral = {
                    'nohay': {
                        'nohay': 100
                    },
                    'menor150': {
                        '25': 30,
                        '50': 30,
                        '75': 30,
                        '100': 30
                    },
                    'menor200': {
                        '25': 100,
                        '50': 60,
                        '75': 30,
                        '100': 30
                    },
                    'mayor200': {
                        '25': 100,
                        '50': 100,
                        '75': 60,
                        '100': 30
                    },
                };
                let cercadoPerimetral = diccCercadoPerimetral[alturaCercPer][permeabilidad];
                sum += cercadoPerimetral;
                total++;
            }

            if (altura && distancia) {
                const diccDistAltura = {
                    '2': {
                        '3m': 30,
                        '12m': 60,
                        '24m': 100,
                        '36m': 100
                    },
                    '3': {
                        '3m': 30,
                        '12m': 30,
                        '24m': 60,
                        '36m': 100
                    },
                    '4': {
                        '3m': 30,
                        '12m': 30,
                        '24m': 60,
                        '36m': 60
                    },
                    '5': {
                        '3m': 30,
                        '12m': 30,
                        '24m': 30,
                        '36m': 60
                    },
                };
                const relDistAltura = diccDistAltura[altura][distancia];
                sum += relDistAltura;
                total++;
            }

            await this.colindanciaPrivacidads().delete();
            await this.colindanciaPrivacidads().create({
                rel_hor: relHor,
                rel_vert: relVert,
                tipo_via: tipoVia,
                altura_cerc_per: alturaCercPer,
                permeabilidad: permeabilidad,
                altura: altura,
                distancia: distancia
            });

            await this.load('variable')
            const variable = this.getRelated('variable');

            this.result = parseFloat(sum / total, 2);
            this.points = this.result * variable.influencia;
            await this.save();
            post.calculateOpdo();
        }
    }
}

module.exports = Cr
