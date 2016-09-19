'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('addresses', (table) => {
    table.increments('address_id');
    table.string('line_1');
    table.string('line_2');
    table.string('city');
    table.integer('zip');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('addresses');
};
