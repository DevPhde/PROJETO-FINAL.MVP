import axios from "axios"

export class AxiosProvider{

    static async get(path){
        return await axios.get(`https://mvp-backend-k5vq.onrender.com/${path}`)
    }
    
    static async post(path, body){
        return await axios.post(`https://mvp-backend-k5vq.onrender.com/${path}`, body)
    }

    static async put(path, body){
        return await axios.put(`https://mvp-backend-k5vq.onrender.com/${path}`, body)
    }

    static async del(path){
        return await axios.delete(`https://mvp-backend-k5vq.onrender.com/${path}`)
    }


}