const feathers = require('@feathersjs/feathers');
const auth = require('@feathersjs/authentication-client')
const rest = require('@feathersjs/rest-client');
const fetch = require('node-fetch');

process.on('unhandledRejection', (reason, p) =>
  console.error('Unhandled Rejection at: Promise ', p, reason)
);

async function main(){

  const app = feathers();
  const restClient = rest('http://localhost:3030');

  app.configure(restClient.fetch(fetch));

  app.configure(auth({
    storageKey: 'auth'
  }))

  try{
    await app.authenticate({
      strategy: 'local',
      email: 'emiliano_mesquita@hotmail.com',
      password: 'asd'
    });
  } catch(error) {
    throw error;
  }

  const clientService = app.service('clients');

  try{
    var clients = await clientService.find()
  } catch(error) {
    throw error;
  }

  console.log(clients);
}

main();
