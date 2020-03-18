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

}