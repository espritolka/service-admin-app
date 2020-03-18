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
}