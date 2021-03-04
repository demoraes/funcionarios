import { Op } from 'sequelize';
import { parseISO } from 'date-fns';
import Funcionario from '../models/Funcionario';

class FuncionarioController {
  async index(req, res) {
    const {
      page = 1,
      search_data_cad,
      search_cargo,
      search_cpf,
      search_nome,
      search_uf_nasc,
      search_salario_start,
      search_salario_end,
      search_status,
      limit = 5,
    } = req.query;
    const where = {};

    const searchDate = parseISO(search_data_cad);

    if (search_data_cad) {
      where.data_cad = { [Op.gte]: `%${searchDate}%` };
    }

    if (search_cargo) {
      where.cargo = { [Op.iLike]: `%${search_cargo}%` };
    }

    if (search_cpf) {
      where.cpf = { [Op.iLike]: `%${search_cpf}%` };
    }

    if (search_nome) {
      where.nome = { [Op.iLike]: `%${search_nome}%` };
    }

    if (search_uf_nasc) {
      where.uf_nasc = { [Op.iLike]: `%${search_uf_nasc}%` };
    }

    if (search_salario_start && search_salario_end) {
      where.salario = {
        [Op.between]: [search_salario_start, search_salario_end],
      };
    }

    if (search_status) {
      where.status = { [Op.eq]: search_status };
    }

    const total = await Funcionario.count({ where });

    const funcionarios = await Funcionario.findAll({
      where,
      attributes: [
        'id',
        'data_cad',
        'cargo',
        'cpf',
        'nome',
        'uf_nasc',
        'salario',
        'status',
      ],
      limit,
      offset: (page - 1) * limit,
    });

    return res.json({
      limit,
      page: Number(page),
      pages: Math.ceil(total / limit),
      total,
      funcionarios,
    });
  }

  async show(req, res) {
    const delivery = await Funcionario.findByPk(req.params.id, {
      attributes: [
        'id',
        'data_cad',
        'cargo',
        'cpf',
        'nome',
        'uf_nasc',
        'salario',
        'status',
      ],
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    return res.json(delivery);
  }

  async store(req, res) {
    const { cpf } = req.body;

    const cpfExists = await Funcionario.findOne({ where: { cpf } });

    if (cpfExists) {
      return res.status(400).json({ error: 'Cpf já possui cadastro' });
    }

    const funcionario = await Funcionario.create(req.body);

    return res.json(funcionario);
  }

  async delete(req, res) {
    const { id } = req.params;

    await Funcionario.findByPk(id);

    await Funcionario.destroy({
      where: {
        id,
      },
    });

    return res.json({ id });
  }

  async update(req, res) {
    const { id } = req.params;

    const funcionario = await Funcionario.findByPk(id);

    if (!funcionario) {
      return res.status(400).json({ error: 'Funcionario not exists' });
    }

    const funcionarioUpdate = await funcionario.update(req.body);

    return res.json(funcionarioUpdate);
  }
}

export default new FuncionarioController();
