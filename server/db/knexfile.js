import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const development = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: join(__dirname, 'dev.sqlite3'),
  },
  pool: {
    afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb),
  },
};

// The rest of the configuration...


const test = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: ':memory:',
  },
  migrations: {
    directory: join(__dirname, 'migrations'),
  },
  seeds: {
    directory: join(__dirname, 'seeds'),
  },
  pool: {
    afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb),
  },
};

const production = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: '/app/storage/prod.sqlite3',
  },
  pool: {
    afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb),
  },
};

export default { development, test, production };
