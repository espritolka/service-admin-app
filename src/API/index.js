import data from 'axios'

data.defaults.baseURL = 'http://localhost:3000/api'

export default class ApiService {

getHeaders = (headers = null) => {
    return {
        headers: {
            ...headers
        }
    }
}

    async getResource(url, headers = this.getHeaders()){
        return await data.get(url, headers);
    }

    async addResource(url, dataObj = null, headers = this.getHeaders()){
        return await data.post(url, dataObj, headers);
    } 
    
    async updateResource(url, dataObj = null, headers = this.getHeaders()){
        return await data.put(url, dataObj, headers);
    }

    async deleteResource(url, dataObj = null, headers = this.getHeaders()){
        return await data.delete(url, dataObj, headers);
    }
}