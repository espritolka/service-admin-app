import Api from '../index.js';

export default class Update {

    api = new Api();

    async updateDirectoryByType(type, id, data){
        const directory = await this.api.addResource(`/${type}/${id}`, data);
        return directory.data
    }
}