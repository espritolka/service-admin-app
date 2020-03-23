import Api from '../index.js';

export default class Add {

    api = new Api();

    async addDirectoryByType(type, data){
        const directory = await this.api.addResource(`/directory/${type}`, data);
        return directory.data
    }

    async addMaster(data){
        const master = await this.api.addResource(`masters/master`, data);
        return master.data
    }

    async addService(data){
        const service = await this.api.addResource(`services/service`, data);
        return service.data
    }

    async addSchedule(data){
        const schedule = await this.api.addResource(`schedules/schedule`, data);
        return schedule.data
    }

    async addRegister(data){
        const register = await this.api.addResource(`registers/register`, data);
        return register.data
    }
}