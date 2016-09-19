'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('contacts', (table) => {
    table.increments();
    table.string('first_name');
    table.string('last_name');
    table.string('phone_number');
    table.string('email_address');
    table.string('image_url');
    table.integer('user_address_id');
    table.foreign('user_address_id').references('addresses.address_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('contacts');
};
