import path from 'path';

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite'),
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
  },
  useNullAsDefault: true,
};

// "scripts": {
//   "test": "echo \"Error: no test specified\" && exit 1",
//   "dev": "ts-node-dev src/server.ts",
//   "knex:migrate": "knex --knexfile knexfile.ts migrate:latest",
//   "knex:seed": "knex --knexfile knexfile.ts seed:run"
// },
//
//npm run knex:xxxx
//
