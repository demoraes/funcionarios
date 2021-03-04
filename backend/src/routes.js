import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FuncionarioController from './app/controllers/FuncionarioController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.post('/funcionarios', FuncionarioController.store);
routes.put('/funcionarios/:id', FuncionarioController.update);
routes.get('/funcionario/:id', FuncionarioController.show);
routes.delete('/funcionario/:id', FuncionarioController.delete);
routes.get('/funcionarios', FuncionarioController.index);

export default routes;
