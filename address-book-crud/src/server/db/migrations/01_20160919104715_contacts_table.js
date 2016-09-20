'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('contacts', (table) => {
    table.increments();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('phone_number').notNullable();
    table.string('email_address').notNullable();
    table.string('image_url');
    table.integer('user_address_id');
    table.foreign('user_address_id').references('addresses.address_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('contacts');
};
