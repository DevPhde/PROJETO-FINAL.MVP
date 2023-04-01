import { MailStructure } from "../../models/email/EmailResponse.js";
import { UserDatabaseRepositories } from "../../repositories/databaseRepositories.js";

export class MailBuilder {
    
    userDbRepositories = new UserDatabaseRepositories();

    async ResponseMail(status, identifier, message) {
        const user = await this.userDbRepositories.findOne(identifier)
        return new MailStructure(status, user.name, user.email, message);
    }
}