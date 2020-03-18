import Api from '../index.js';

export default class Delete {

    api = new Api();

    async deleteDirectoryByType(type){
        const directory = await this.api.deleteResource(`/directory/${type}`);
        return directory.data
    }

    async deleteDirectoryById(type, id){
        const directory = await this.api.deleteResource(`/directory/${type}/${id}`);
        return directory.data
    }

    async deleteMasterById(id){
        const master = await this.api.deleteResource(`/masters/master/${id}`);
        return master.data
    }
}