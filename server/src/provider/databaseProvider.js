import { User } from "../models/User.js";
import { Expense } from "../models/Expense.js";
import { TypeExpense } from "../models/TypeExpense.js";
import { Revenue } from "../models/Revenue.js";

export class BaseModel {
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

export class UserDatabaseProvider extends BaseModel {
  constructor() {
    super(User);
  }
}

export class ExpenseDatabaseProvider extends BaseModel {
  constructor() {
    super(Expense);
  }
}

export class TypeExpenseDatabaseProvider extends BaseModel {
  constructor() {
    super(TypeExpense)
  }
}

export class RevenueDatabaseProvider extends BaseModel {
  constructor() {
    super(Revenue)
  }
}