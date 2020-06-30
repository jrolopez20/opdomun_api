'use strict'
const Post = use('App/Models/Post');
const EstConstructiva = use('App/Models/EstConstructiva');

class Tc {
  register(Model, customOptions = {}) {
    const defaultOptions = {}
    const options = Object.assign(defaultOptions, customOptions)

    Model.prototype.getSolTecnicoConstructiva = function () {
      const dicc = {
        'muros': {
          '100': 'Hormigón',
          '80': 'Bloque / Ladrillo / Canto',
          '60': 'Sistema ligero',
          '40': 'Madera'
        },
        'cubierta': {
          '100': 'Hormigón',
          '80': 'Vigueta y Bovedilla',
          '60': 'Cubierta Ligera (Cinc, Canelón, ect)',
          '40': 'Tablazón y tejas',
          '15': 'Guano',
        },
        'piso': {
          '100': 'Porcelanato',
          '90': 'Granito Integral',
          '70': 'Gres cerámico',
          '50': 'Losas Hidráulicas / Granito',
          '30': 'Estuco Pulido',
        },
        'enchape': {
          '100': 'Placas de Mármol o Granito',
          '80': 'Gres cerámico',
          '60': 'Losas Hidráulicas',
          '40': 'Estuco'
        },
        'carpinteria': {
          '100': 'Aluminio',
          '90': 'Madera',
          '80': 'Vidrio',
          '70': 'Hierro',
          '60': 'PVC'
        },
        'instalacion': {
          '100-i1': 'Eléctrica 110',
          '100-i2': 'Eléctrica 220',
          '100-i3': 'Agua fría',
          '100-i4': 'Agua caliente',
          '100-i5': 'Teléfono',
          '100-i6': 'Antena',
          '100-i7': 'CCTV'
        }
      }
      return dicc
    }

    Model.prototype.calculateTc = async function (pCarpinteria, pCubierta, pEnchape, pInstalacion, pMuros, pPiso) {
      let carpinteria = 0;
      let cubierta = 0;
      let enchape = 0;
      let instalacion = 0;
      let muros = 0;
      let piso = 0;

      const dicc = this.getSolTecnicoConstructiva()
      const items = []
      let displayValue = ''

      if (pCarpinteria) {
        if (typeof pCarpinteria == 'object') {
          for (let i = 0; i < pCarpinteria.length; i++) {
            carpinteria += parseInt(pCarpinteria[i]);
            displayValue += dicc['carpinteria'][pCarpinteria[i]] + ', '
          }
          carpinteria = carpinteria / pCarpinteria.length;
        } else {
          carpinteria = pCarpinteria ? parseInt(pCarpinteria) : 0;
          displayValue = dicc['carpinteria'][pCarpinteria]
        }
        items.push({
          post_variable_id: this.id,
          display_value: displayValue,
          title: 'Carpintería'
        })
      }

      if (pCubierta) {
        if (typeof pCubierta == 'object') {
          displayValue = ''
          for (let i = 0; i < pCubierta.length; i++) {
            cubierta += parseInt(pCubierta[i]);
            displayValue += dicc['cubierta'][pCubierta[i]] + ', '
          }
          cubierta = cubierta / pCubierta.length;
        } else {
          cubierta = pCubierta ? parseInt(pCubierta) : 0;
          displayValue = dicc['cubierta'][pCubierta]
        }
        items.push({
          post_variable_id: this.id,
          display_value: displayValue,
          title: 'Cubierta'
        })
      }

      if (pEnchape) {
        if (pEnchape && typeof pEnchape == 'object') {
          displayValue = ''
          for (let i = 0; i < pEnchape.length; i++) {
            enchape += parseInt(pEnchape[i]);
            displayValue += dicc['enchape'][pEnchape[i]] + ', '
          }
          enchape = enchape / pEnchape.length;
        } else {
          enchape = pEnchape ? parseInt(pEnchape) : 0;
          displayValue = dicc['enchape'][pEnchape]
        }
        items.push({
          post_variable_id: this.id,
          display_value: displayValue,
          title: 'Enchape'
        })
      }

      if (pInstalacion) {
        if (typeof pInstalacion == 'object') {
          displayValue = ''
          for (let i = 0; i < pInstalacion.length; i++) {
            instalacion += parseInt(pInstalacion[i].split('-')[0]);
            displayValue += dicc['instalacion'][pInstalacion[i]] + ', '
          }
          instalacion = instalacion / pInstalacion.length;
        } else {
          instalacion = parseInt(pInstalacion.split('-')[0])
          displayValue = dicc['instalacion'][pInstalacion]
        }
        items.push({
          post_variable_id: this.id,
          display_value: displayValue,
          title: 'Instalación'
        })
      }

      if (pMuros) {
        if (typeof pMuros == 'object') {
          displayValue = ''
          for (let i = 0; i < pMuros.length; i++) {
            muros += parseInt(pMuros[i]);
            displayValue += dicc['muros'][pMuros[i]] + ', '
          }
          muros = muros / pMuros.length;
        } else {
          muros = pMuros ? parseInt(pMuros) : 0;
          displayValue = dicc['muros'][pMuros]
        }
        items.push({
          post_variable_id: this.id,
          display_value: displayValue,
          title: 'Muros'
        })
      }

      if (pPiso) {
        if (typeof pPiso == 'object') {
          displayValue = ''
          for (let i = 0; i < pPiso.length; i++) {
            piso += parseInt(pPiso[i]);
            displayValue += dicc['piso'][pPiso[i]] + ', '
          }
          piso = piso / pPiso.length;
        } else {
          piso = pPiso ? parseInt(pPiso) : 0;
          displayValue = dicc['piso'][pPiso]
        }
        items.push({
          post_variable_id: this.id,
          display_value: displayValue,
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

      let post = await Post.find(this.post_id);
      post.calculateOpdo();
    }
  }
}

module.exports = Tc
