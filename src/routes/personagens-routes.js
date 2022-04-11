const { Router } = require('express');

const { PersonagensController } = require('../controllers/personagens-controller');

const routes = Router();

const personagensController = new PersonagensController();

// ARRUMAR ISSO
routes.get('/cadastrar', personagensController.mostraCadastro);
// routes.get('/cadastro_personagem', personagensController.mostraCadastro);

routes.post('/', personagensController.cadastrar)

routes.get('/', personagensController.listar);

routes.get('/:id', personagensController.detalhar);

routes.get('/editar/:id', personagensController.mostrarEditar);

routes.get('/excluir/:id', personagensController.excluir);

routes.post('/edit', personagensController.editar);

routes.get('/filtro/:campo', personagensController.filtrar);

module.exports = routes;