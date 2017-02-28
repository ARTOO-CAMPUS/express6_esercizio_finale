var express = require('express');
var router = express.Router();
var userController = require('./../controller/user.controller.js');

//LISTA TUTTI GLI UTENTI
router.get('/', userController.getList);

//DETTAGLIO DI UN UTENTE
router.get('/:id', userController.getDetails);

//CREAZIONE DI UN UTENTE
router.post('/', userController.createUser);

//CANCELLAZIONE DI UN UTENTE
router.delete('/:id', userController.deleteUser);

//AGGIORNAMENTO UTENTE
router.put('/:id', userController.updateUser);

module.exports = router;