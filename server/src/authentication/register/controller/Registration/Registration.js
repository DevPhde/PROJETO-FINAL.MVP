import { GetByParam } from "../../../../provider/getByParam.js";

export class Registration {
    static async NewUser(data) {
        const validationFields = await this.ValidFields(data)
        const response = this.GenerateResponse(validationFields)
        return validationFields.email && validationFields.cpf ? true : response
    }

    static async ValidFields(data) {
        const ValidEmail = await GetByParam.GetUser({ email: data.email }) == null ? true : false;
        const ValidCpf = await GetByParam.GetUser({ cpf: data.cpf }) == null ? true : false;
        return { email: ValidEmail, cpf: ValidCpf }
    }

    static async GenerateResponse(validate) {
        const email =  !validate.email ? "email" : "";
        const cpf =  !validate.cpf ? "CPF" : "";
        const plus = !validate.email && !validate.cpf ? "e" : ""
        return `${email} ${plus} ${cpf} Já cadastrado.`

    }
}