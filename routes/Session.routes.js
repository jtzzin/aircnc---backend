// index() = listagem de sessoes
// show() = listar uma sessao
// store() = criar uma sessao
// update() = alterar uma sessao
// destroy() = excluir uma sessao


const express = require("express"); // sempre necessario
const SessionController = require('../controllers/Session.controller');
const router = express.Router();

router.post('/', SessionController.store);

module.exports = router;