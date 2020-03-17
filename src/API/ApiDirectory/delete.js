import Api from '../index.js';

export default class Delete {

    api = new Api();

    async deleteDirectoryByType(type, data){
        const directory = await this.api.deleteResource(`/${type}`, data);
        return directory.data
    }

    async deleteDirectoryById(type, id, data){
        const directory = await this.api.deleteResource(`/${type}/${id}`, data);
        return directory.data
    }
}