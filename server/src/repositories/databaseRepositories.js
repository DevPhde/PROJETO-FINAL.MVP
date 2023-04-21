import { User } from "../models/User.js";
import { Expense } from "../models/Expense.js";
import { TypeExpense } from "../models/TypeExpense.js";
import { Revenue } from "../models/Revenue.js";
import sequelize from "../db/dbConfig.js";

export class BaseModel {
  constructor(table) {
    this.table = table;
  }

  async sum(param) {
    const sum = await this.table.sum('amount', { where: param })
    if (sum) {
      return sum.toFixed(2)
    }
    return sum;
  }

  async findUserId(param) {
    const user = await this.table.findOne({ where: param });
    return user.id
  }

  async findAll(param) {
    return await this.table.findAll({ where: param });
  }

  async sumByMonth(param) {
    const sum =  await this.table.findAll({
      where: param,
      attributes: [
        [sequelize.fn('strftime', '%m', sequelize.col('date')), 'month'],
        [sequelize.fn('strftime', '%Y', sequelize.col('date')), 'year'],
        [sequelize.fn('sum', sequelize.col('amount')), 'totalAmount'],
      ],
      group: ['month', 'year'],
    });
    if(sum) {
      return sum.toFixed(2)
    }
    return sum
  }

  async joinFindAll(param) {
    return await this.table.findAll(param)
  }

  async findOne(param) {
    return await this.table.findOne({ where: param });
  }

  async findLastOne(param,) {
    return await this.table.findOne({
      where: param,
      order: [['createdAt', 'DESC']]
    })
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

export class UserDatabaseRepositories extends BaseModel {
  constructor() {
    super(User);
  }
}

export class ExpenseDatabaseRepositories extends BaseModel {
  constructor() {
    super(Expense);
  }
}

export class TypeExpenseDatabaseRepositories extends BaseModel {
  constructor() {
    super(TypeExpense)
  }
}

export class RevenueDatabaseRepositories extends BaseModel {
  constructor() {
    super(Revenue)
  }
}