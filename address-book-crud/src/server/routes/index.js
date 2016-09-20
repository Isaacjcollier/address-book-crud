const express = require('express');
const router = express.Router();
const knex = require('../db/knex.js');

const indexController = require('../controllers/index');

router.get('/', (req, res, next) => {
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
    return Promise.all(promises);
  }).then(results => {
    res.render('index.html', { users: results });
  }).catch(err => {
    console.log(err);
  });
});

router.delete('/contacts/:id/delete', (req, res, next) => {
  let id = parseInt(req.params.id);
  knex('contacts')
  .where('id', id)
  .del()
  .then(() => {
    res.status(202).send({
      message: 'Request Accepted'
    });
  })
  .catch(err => {
    console.log(err);
  });
});

router.get('/contacts/new', (req, res, next) => {
  res.render('new_contact_form.html')
})

module.exports = router;

// table names
// addresses ::: and ::: contacts
