const { Router } = require('express');

const UsersController = require('../controllers/users-controllers');

const routes = Router();

const usersController = new UsersController();

routes.get('/logar', usersController.mostraLogin);

routes.get('/cadastro_usuario', usersController.mostraCadastro);

routes.post('/cadastrar', usersController.cadastrar);

routes.post('/login', usersController.login);

routes.get('/favoritar/:nome', usersController.favoritar);

routes.get('/desfavoritar', usersController.desfavoritar);

routes.get('/logout', usersController.logout);

routes.get('/perfil', usersController.perfil);

module.exports = routes;