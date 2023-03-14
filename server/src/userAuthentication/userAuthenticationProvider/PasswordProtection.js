import * as bcrypt from 'bcrypt';

export class PasswordProtection {
    static async passwordCryptography(password) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hashSync(password, salt);
    }
    static async verifyPasswordAuthenticity(reqPassword, passwordDB) {
        return bcrypt.compareSync(reqPassword, passwordDB);
    }
}