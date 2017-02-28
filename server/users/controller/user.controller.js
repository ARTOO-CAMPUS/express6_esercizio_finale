module.exports = (function () {

    var jsonfile = require('jsonfile');
    var users = require('../db/users.json');
    var path = require('path');

    //LISTA UTENTI
    var getList = function (req, res) {
        res.status(200);
        res.send(users);
        res.end();
    }


    //DETTAGLIO UTENTE
    var getDetails = function (req, res) {
        var id = req.params.id;
        var user = users.find(function (el) {
            return el.id === +id;
        });
        if (user) {
            res.status(200);
            res.send(user);
        } else {
            res.status(404);
            res.send('utente inesistente');
        }
        res.end();

    }

    //CREAZIONE UTENTE
    var createUser = function (req, res) {
        var user = req.body;
        //CALCOLO DEL MASSIMO DELL'ID
        var listaId = [];
        users.forEach(function (el) {
            listaId.push(el.id);
        });
        var max = Math.max(...listaId);
        user.id = max + 1;
        users.push(user);
        jsonfile.writeFile(path.join(__dirname, "..", "db", "users.json"), users, function (err) {});
        res.send(users);
        res.end();
    };

    //RIMOZIONE UTENTE
    var deleteUser = function (req, res) {
        var id = req.params.id;
        var user = users.find(function (el) {
            return el.id === +id;
        });
        if (user) {
            users.splice(users.indexOf(user), 1);
            jsonfile.writeFile(path.join(__dirname, "..", "db", "users.json"), users, function (err) {});
            res.status(200);
            res.send(users);
            res.end();
        } else {
            res.status(404);
            res.send('utente non trovato');
            res.end();
        }

    };

    //AGGIORNAMENTO UTENTE
    var updateUser = function (req, res) {
        var id = req.params.id;
        var newuser = JSON.parse(JSON.stringify(req.body));
        var user = users.find(function (el) {
            return el.id === +id;
        });
        if (user) {
            newuser.id = +id;
            //UPDATE: CANCELLO IL VECCHIO E AGGIUNGO IL NUOVO
            users.splice(users.indexOf(user), 1, newuser);

            jsonfile.writeFile(path.join(__dirname, "..", "db", "users.json"), users, function (err) {});
            res.status(200);
            res.send(newuser);
            res.end();
        } else {
            res.status(404);
            res.send('utente non trovato');
            res.end();
        }

    };

    //API CHE ESPONGO
    return {
        getList: getList,
        getDetails: getDetails,
        createUser: createUser,
        deleteUser: deleteUser,
        updateUser: updateUser,
    }
})();