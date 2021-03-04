import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';

describe('Funcionario', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register funcionarios', async () => {
    const response = await request(app).post('/funcionarios').send({
      data_cad: '2020-08-10T18:00:00.000Z',
      cargo: 'dev',
      cpf: '052.456.987-05',
      nome: 'gabriel',
      uf_nasc: 'MS',
      salario: '4500',
      status: 1,
    });

    expect(response.body).toHaveProperty(
      'id',
      'data_cad',
      'cargo',
      'cpf',
      'nome',
      'uf_nasc',
      'salario'
    );
  });

  it('should be able to list funcionarios', async () => {
    await request(app).post('/funcionarios').send({
      id: 10,
      data_cad: '2020-08-10T18:00:00.000Z',
      cargo: 'dev',
      cpf: '052.456.987-05',
      nome: 'gabriel',
      uf_nasc: 'MS',
      salario: '4500',
      status: 1,
    });

    const response = await request(app).get('/funcionarios');

    expect(response.body.funcionarios).toMatchObject([
      {
        id: 10,
        data_cad: '2020-08-10T18:00:00.000Z',
        cargo: 'dev',
        cpf: '052.456.987-05',
        nome: 'gabriel',
        uf_nasc: 'MS',
        salario: '4500',
        status: 1,
      },
    ]);
  });

  it('should be able to update user', async () => {
    const user = await request(app).post('/funcionarios').send({
      id: 10,
      data_cad: '2020-08-10T15:00:00-03:00',
      cargo: 'dev',
      cpf: '052.456.987-05',
      nome: 'gabriel',
      uf_nasc: 'MS',
      salario: '4500',
      status: 1,
    });

    const response = await request(app)
      .put(`/funcionarios/${user.body.id}`)
      .send({
        id: 10,
        data_cad: '2020-08-10T15:00:00-03:00',
        cargo: 'po',
        cpf: '052.222.333-33',
        nome: 'lucia',
        uf_nasc: 'PA',
        salario: '2500',
        status: 2,
      });

    expect(response.body).toHaveProperty('id');
  });

  it('should be able to delete user', async () => {
    const user = await request(app).post('/funcionarios').send({
      data_cad: '2020-08-10T15:00:00-03:00',
      cargo: 'dev',
      cpf: '052.456.987-05',
      nome: 'gabriel',
      uf_nasc: 'MS',
      salario: '4500',
      status: 1,
    });

    const response = await request(app).delete(`/funcionario/${user.body.id}`);

    expect(response.body).toHaveProperty('id');
  });
});
