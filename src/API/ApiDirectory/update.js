import Api from '../index.js';

export default class Update {

    api = new Api();

    async updateDirectoryByType(type, id, data){
        const directory = await this.api.updateResource(`/directory/${type}/${id}`, data);
        return directory.data
    }

    async updateMasterById(id, data){
        const master = await this.api.updateResource(`/masters/master/${id}`, data);
        return master.data
    }

    async updateServiceById(id, data){
        const service = await this.api.updateResource(`/services/service/${id}`, data);
        return service.data
    }

    async updateScheduleById(id, data){
        const shedule = await this.api.updateResource(`/shedules/shedule/${id}`, data);
        return shedule.data
    }

    async updateRegisterById(id, data){
        const register = await this.api.updateResource(`/registers/register/${id}`, data);
        return register.data
    }
}