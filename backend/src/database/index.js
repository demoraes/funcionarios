import Sequelize from 'sequelize';

import User from '../app/models/User';
import Funcionario from '../app/models/Funcionario';

import databaseConfig from '../config/database';

const models = [User, Funcionario];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
