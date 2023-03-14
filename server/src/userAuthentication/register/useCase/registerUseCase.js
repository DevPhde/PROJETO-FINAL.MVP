import { UserDatabaseProvider } from "../../../provider/databaseProvider.js";


export class RegistrationUseCase {
    static async VerifyNewUser(data) {
        const validationFields = await this.ValidateUserColumns(data)
        const response = this.GenerateResponse(validationFields)
        return validationFields.email && validationFields.cpf ? true : response
    }

    static async ValidateUserColumns(data) {
        const userDbUseCase = new UserDatabaseProvider()
        const ValidEmail = await userDbUseCase.findOne({ email: data.email }) == null ? true : false;
        const ValidCpf = await userDbUseCase.findOne({ cpf: data.cpf }) == null ? true : false;
        return { email: ValidEmail, cpf: ValidCpf }
    }

    static async GenerateResponse(validate) {
        const email = !validate.email ? "email" : "";
        const cpf = !validate.cpf ? "CPF" : "";
        const plus = !validate.email && !validate.cpf ? "e" : ""
        return `${email} ${plus} ${cpf} Já cadastrado.`
    }
}