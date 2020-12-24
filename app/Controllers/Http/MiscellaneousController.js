'use strict'

const Env = use('Env')

class MiscellaneousController {

    async documents({request, response}) {
        const documents = {
            evaluationForm: `${Env.get('APP_URL')}/documents/formulario-evaluacion.pdf`,
            technicalManual: `${Env.get('APP_URL')}/documents/manual-tecnico.pdf`,
            gazetteMinimumReferencialValue: 'https://wwww.gacetaoficial.gob.cu/es/decreto-ley-343-de-2016-de-consejo-de-estado'
        }
        return response.json(documents)
    }

}

module.exports = MiscellaneousController;
