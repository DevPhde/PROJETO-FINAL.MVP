import { User } from "../models/User.js";
import { Expense } from "../models/Expense.js";

class BaseModel {
  constructor(table) {
    this.table = table;
  }

  async findOne(param) {
    return await this.table.findOne({ where: param });
  }

  async create(data) {
    return await this.table.create(data);
  }

  async update(data, param) {
    return await this.table.update(data, { where: param });
  }

  async destroy(param) {
    return await this.table.destroy({ where: param });
  }
}

export class UserDatabaseUseCase extends BaseModel {
  constructor() {
    super(User);
  }
}

export class ExpenseDatabaseUseCase extends BaseModel {
  constructor() {
    super(Expense);
  }
}
