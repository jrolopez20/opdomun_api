'use strict'
const StatisticsService = use('App/Services/StatisticsService');
const User = use('App/Models/User')

class StatisticsController {

    async getServices({request, response, auth}) {
        try {
            const services = await StatisticsService.getServices(
                auth.user,
                request.input("start_at"),
                request.input("end_at")
            );
            return response.json(services);
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }

    async servicesByOffice({request, response}) {
        try {
            const services = await StatisticsService.servicesByOffice(
                request.input("start_at"),
                request.input("end_at")
            );
            return response.json(services);
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }

    async servicesByUser({request, response}) {
        try {
            const services = await StatisticsService.servicesByUser(
                request.input("start_at"),
                request.input("end_at"),
                request.input("office_id")
            );
            return response.json(services);
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }


}

module.exports = StatisticsController;
