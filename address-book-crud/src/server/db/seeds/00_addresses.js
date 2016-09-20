
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('addresses').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('addresses').insert({
          line_1: '742 Evergreen terrace',
          line_2: '',
          city: 'Colorado Springs',
          zip: 80907
        }),
        knex('addresses').insert({
          line_1: '123 Westmoresoland',
          line_2: '',
          city: 'Denver',
          zip: 80200
        }),
        knex('addresses').insert({
          line_1: '6872 Silverwind Circle',
          line_2: 'Apt# 501',
          city: 'Colorado Springs',
          zip: 80904
        })
      ]);
    });
};
