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
// get the form
router.get('/contacts/new', (req, res, next) => {
  res.render('new_contact_form.html');
});
// post the form
router.post('/contacts/new', (req, res, next) => {
  // user info
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var phone_number = req.body.phone_number;
  var email_address = req.body.email_address;
  var image_url = req.body.image_url;
  // address info
  var line_1 = req.body.line_1;
  var line_2 = req.body.line_2;
  var city = req.body.city;
  var zip = req.body.zip;
  knex('addresses')
  .insert({
    line_1,
    line_2,
    city,
    zip
  }, 'address_id')
  .then((address) => {
    var newAddressID = address[0];
    knex('contacts')
    .insert({
      first_name,
      last_name,
      phone_number,
      email_address,
      image_url,
      user_address_id: newAddressID
    }, '*')
    .then((newUser) => {
      if (newUser.length) {
        res.redirect('/');
      } else {
        res.status(404).send({
          status: 'error',
          message: 'sorry about that sport'
        });
      }
    });
  });
});

module.exports = router;

// table names
// addresses ::: and ::: contacts
