'use strict'
const Post = use('App/Models/Post');
const EnvElement = use('App/Models/EnvElement')

class Vs {
    register(Model, customOptions = {}) {
        const defaultOptions = {}
        const options = Object.assign(defaultOptions, customOptions)

        const DICC_VISUALES = {
            hitosArquitectonicos: 'Hitos arquitectónicos',
            obrasArtisticasUrbanas: 'Obras artísticas urbanas',
            hitosNaturales: 'Hitos naturales',
            paisajeNatural: 'Paisaje natural (Valle, Sierras, Montañas, Ríos, etc)',
            paisajeCostero: 'Paisaje costero (Bahía, Playa, Costa, etc)',
            tramaHurbana: 'Trama urbana',
            paisajeAgricola: 'Paisaje agrícola'
        };

        Model.prototype.getVisualesValues = async function () {
            await this.load('envElements')
            const envElements = this.getRelated('envElements').toJSON();

            let vs = {};
            for (const visual in DICC_VISUALES) {
                const element = envElements.find(item => item.title === DICC_VISUALES[visual]);
                if(element) {
                    vs[visual] = element.value;
                }
            }

            return vs
        };

        Model.prototype.calculateVs = async function (visuales) {
            let result = 0;
            const items = Array();

            for(const visual in visuales) {
                result += visuales[visual];
                items.push({
                    postVariableId: this.id,
                    value: visuales[visual],
                    title: DICC_VISUALES[visual]
                });
            }

            await EnvElement.removeEnvElement(this.id)
            await EnvElement.createMany(items)

            await this.load('variable');
            const variable = this.getRelated('variable');
            this.result = result;
            this.points = result * variable.influencia;
            await this.save();
            let post = await Post.find(this.postId);
            post.calculateOpdo();
        }
    }
}

module.exports = Vs
