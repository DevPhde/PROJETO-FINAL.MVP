import axios from "axios"

export class AxiosProvider{

    static async get(path, header){
        try {
            return await axios.get(`https://mvp-backend-k5vq.onrender.com/${path}`, {headers: {'authorization': header}}) 
        } catch(err) {
            return err.response
        }
    }
    
    static async post(path, body, header){
        return await axios.post(`https://mvp-backend-k5vq.onrender.com/${path}`, body)
    }

    static async put(path, body, header){
        return await axios.put(`https://mvp-backend-k5vq.onrender.com/${path}`, body)
    }

    static async del(path, header){
        return await axios.delete(`https://mvp-backend-k5vq.onrender.com/${path}`, {headers:{ }})
    }
}