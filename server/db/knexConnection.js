import knexFile from './knexfile.js'
import knex from 'knex'



const environment = (process.env.NODE_ENV || 'development') 
const config = knexFile[environment]
const connection = knex(config)

export default connection
