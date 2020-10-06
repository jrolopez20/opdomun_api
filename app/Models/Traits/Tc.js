'use strict'
const Post = use('App/Models/Post');
const EstConstructiva = use('App/Models/EstConstructiva');

class Tc {
    register(Model, customOptions = {}) {
        const defaultOptions = {}
        const options = Object.assign(defaultOptions, customOptions)

        Model.prototype.getSolTecnicoConstructiva = function () {
            const dicc = {
                'muros': [
                    {value: '100', label: 'Hormigón'},
                    {value: '80', label: 'Bloque / Ladrillo / Canto'},
                    {value: '60', label: 'Sistema ligero'},
                    {value: '40', label: 'Madera'}
                ],
                'cubierta': [
                    {value: '100', label: 'Hormigón'},
                    {value: '80', label: 'Vigueta y Bovedilla'},
                    {value: '60', label: 'Cubierta Ligera (Cinc, Canelón, ect)'},
                    {value: '40', label: 'Tablazón y tejas'},
                    {value: '15', label: 'Guano'}
                ],
                'piso': [
                        {value: '100', label: 'Porcelanato'},
                    {value: '90', label: 'Granito Integral'},
                    {value: '70', label: 'Gres cerámico'},
                    {value: '50', label: 'Losas Hidráulicas / Granito'},
                    {value: '30', label: 'Estuco Pulido'}
                ],
                'enchape': [
                    {value: '100', label: 'Placas de Mármol o Granito'},
                    {value: '80', label: 'Gres cerámico'},
                    {value: '60', label: 'Losas Hidráulicas'},
                    {value: '40', label: 'Estuco'}
                ],
                'carpinteria': [
                    {value: '100', label: 'Aluminio'},
                    {value: '90', label: 'Madera'},
                    {value: '80', label: 'Vidrio'},
                    {value: '70', label: 'Hierro'},
                    {value: '60', label: 'PVC'}
                ],
                'instalacion': [
                    {value: '100-i1', label: 'Eléctrica 110'},
                    {value: '100-i2', label: 'Eléctrica 220'},
                    {value: '100-i3', label: 'Agua fría'},
                    {value: '100-i4', label: 'Agua caliente'},
                    {value: '100-i5', label: 'Teléfono'},
                    {value: '100-i6', label: 'Antena'},
                    {value: '100-i7', label: 'CCTV'}
                ]
            };
            return dicc
        }

        Model.prototype.calculateTc = async function (pCarpinteria = [], pCubierta = [], pEnchape = [], pInstalacion = [], pMuros = [], pPiso = []) {
            let carpinteria = 0;
            let cubierta = 0;
            let enchape = 0;
            let instalacion = 0;
            let muros = 0;
            let piso = 0;

            const items = [];
            let displayValue = '';

            if (pCarpinteria && pCarpinteria.length) {
                displayValue = '';
                pCarpinteria.map(item => {
                    carpinteria += parseInt(item.value);
                    displayValue += item.label + ', '
                });
                items.push({
                    postVariableId: this.id,
                    title: 'Carpinteria',
                    displayValue
                })
            }

            if (pCubierta && pCubierta.length) {
                displayValue = '';
                pCubierta.map(item => {
                    cubierta += parseInt(item.value);
                    displayValue += item.label + ', '
                });
                items.push({
                    postVariableId: this.id,
                    title: 'Cubierta',
                    displayValue
                })
            }

            if (pEnchape && pEnchape.length) {
                displayValue = '';
                pEnchape.map(item => {
                    enchape += parseInt(item.value);
                    displayValue += item.label + ', '
                });
                items.push({
                    postVariableId: this.id,
                    displayValue,
                    title: 'Enchape'
                })
            }

            if (pInstalacion && pInstalacion.length) {
                displayValue = '';
                pInstalacion.map(item => {
                    instalacion += parseInt(item.value.split('-')[0]);
                    displayValue += item.label + ', '
                });
                items.push({
                    postVariableId: this.id,
                    displayValue,
                    title: 'Instalacion'
                })
            }

            if (pMuros && pMuros.length) {
                displayValue = '';
                pMuros.map(item => {
                    muros += parseInt(item.value);
                    displayValue += item.label + ', '
                });
                items.push({
                    postVariableId: this.id,
                    displayValue,
                    title: 'Muros'
                })
            }

            if (pPiso && pPiso.length) {
                displayValue = '';
                pPiso.map(item => {
                    piso += parseInt(item.value);
                    displayValue += item.label + ', '
                });
                items.push({
                    postVariableId: this.id,
                    displayValue,
                    title: 'Piso'
                })
            }

            await EstConstructiva.removeEstConstructiva(this.id)
            await EstConstructiva.createMany(items)

            const result = (carpinteria + cubierta + enchape + instalacion + muros + piso) / 6;
            await this.load('variable')
            const variable = this.getRelated('variable');
            this.result = result;
            this.points = result * variable.influencia;
            await this.save();

            let post = await Post.find(this.postId);
            post.calculateOpdo();
        }
    }
}

module.exports = Tc
