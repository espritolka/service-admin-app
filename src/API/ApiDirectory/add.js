import Api from '../index.js';

export default class Add {

    api = new Api();

    async addDirectoryByType(type, data){
        const directory = await this.api.addResource(`/directory/${type}`, data);
        return directory.data
    }
}