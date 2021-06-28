const fs = require('fs');

const { setupStrapi } = require('./helpers/strapi');
jest.setTimeout(20000000);
/** this code is called once before any test is called */


/** this code is called once before all the tested are finished */

async function config(){
  await setupStrapi();
 
}


it('strapi is defined', () => {
  config();
  expect(strapi).toBeDefined();
  const dbSettings = strapi.config.get('database.connections.default.settings');
});
require('../config/donor');