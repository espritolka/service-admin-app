import Api from '../index.js'

export default class Get {
    api = new Api();

    async getDirectoryByType(type){
        const directory = await this.api.getResource(
            `/directory/${type}`
        )
        return directory.data
    }

}