import Api from '../index.js'

export default class Get {
    api = new Api();

    async getDirectoryByType(type){
        const directory = await this.api.getResource(
            `/directory/${type}`
        )
        return directory.data
    }

    async getMasters(){
        const masters = await this.api.getResource(
            `/masters`
        )
        return masters.data
    }

    async getMasterById(id){
        const master = await this.api.getResource(
            `/masters/master/${id}`
        )
        return master.data
    }

    async getServices(){
        const masters = await this.api.getResource(
            `/services`
        )
        return masters.data
    }

    async getServiceById(id){
        const service = await this.api.getResource(
            `/services/service/${id}`
        )
        return service.data
    }

    async getSchedules(){
        const schedules = await this.api.getResource(
            `/schedules`
        )
        return schedules.data
    }

    async getScheduleById(id){
        const schedule = await this.api.getResource(
            `/schedules/shedule/${id}`
        )
        return schedule.data
    }

    async getRegisters(){
        const registers = await this.api.getResource(
            `/registers`
        )
        return registers.data
    }

    async getRegisterById(id){
        const register = await this.api.getResource(
            `/registers/register/${id}`
        )
        return register.data
    }

}