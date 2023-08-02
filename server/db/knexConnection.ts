import knexFile from './knexfile.js'
import knex from 'knex'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment 
const config = knexFile[environment]
const connection = knex(config)

export default connection
