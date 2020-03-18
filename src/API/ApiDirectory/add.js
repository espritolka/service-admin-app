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
}