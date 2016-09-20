const express = require('express');
const router = express.Router();
const knex = require('../db/knex.js');

const indexController = require('../controllers/index');

router.get('/', function (req, res, next) {
  const renderObject = {};
  knex('contacts')
  .select('*')
  .then((users) => {
    let promises = users.map(user => {
      return knex('addresses').select('*')
      .where('address_id', user.user_address_id)
      .first()
      .then((address) => {
        user.address = address;
        return user;
      });
    });

    return Promise.all(promises)
  }).then(results => {
    console.dir(results, { depth: null });
    res.render('index', { users: results });
  }).catch(err => {
    console.log(err);

  });
});

module.exports = router;

// table names
// addresses ::: and ::: contacts
