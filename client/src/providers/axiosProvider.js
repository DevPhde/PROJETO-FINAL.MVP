import axios from "axios"

export class AxiosProvider{
    static async communication(method, path, hash, body) {
        try {
            const options = {
                method: method,
                url: `https://mvp-backend-k5vq.onrender.com/${path}`,
                headers: {
                  'Content-Type': 'application/json',
                  authorization: hash
                },
                data: body
              };
              return axios.request(options)
        } catch (err) {
            return err.response
        }   

    }
}