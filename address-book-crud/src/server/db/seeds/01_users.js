
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('contacts').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('contacts').insert({
          first_name: 'Homer',
          last_name: 'Simpson',
          phone_number: '111-454-8232',
          email_address: 'homer@simpsons.com',
          image_url:'/user_images/Homer_Simpson.png',
          user_address_id: 1
        }),
        knex('contacts').insert({
          first_name: 'Marge',
          last_name: 'Simpson',
          phone_number: '111-454-8232',
          email_address: 'marge@simpsons',
          image_url: '/user_images/Marge_Simpson.png',
          user_address_id: 1
        }),
        knex('contacts').insert({
          first_name: 'Barney',
          last_name: 'Gumble',
          phone_number: '303-252-8888',
          email_address: 'barney@simpsons.com',
          image_url: '/user_images/Barney_Gumble.png',
          user_address_id: 2
        }),
        knex('contacts').insert({
          first_name: 'Ned',
          last_name: 'Flanders',
          phone_number: '719-414-8232',
          email_address: 'ned@simpsons.com',
          image_url:'/user_images/Ned_Flanders.png',
          user_address_id: 3
        })
      ]);
    });
};

// // first_name');
// table.string('last_name');
// table.string('phone_number');
// table.string('email_address');
// table.string('image_url');
// table.integer('user_address_id');
// table.foreign('user_address_id
