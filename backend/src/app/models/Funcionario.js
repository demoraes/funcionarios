import Sequelize, { Model } from 'sequelize';

class Funcionario extends Model {
  static init(sequelize) {
    super.init(
      {
        data_cad: Sequelize.DATE,
        cargo: Sequelize.STRING,
        cpf: Sequelize.STRING,
        nome: Sequelize.STRING,
        uf_nasc: Sequelize.STRING,
        salario: Sequelize.STRING,
        status: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Funcionario;
