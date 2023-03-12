import { GetByParam } from "../../../provider/getByParam.js"
import { Response } from "../../../models/response/Response.js"

export class Register {
    static ValidField = async (req, res) => {
        const data = GetByParam.GetUser(req.body)
        data == null ? res.status(200).send(new Response(true)) : res.status(409).send(new Response(false, "Campo já existente."))
    }
    static Registration = 
}