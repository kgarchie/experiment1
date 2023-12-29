import { defineConfig } from 'drizzle-kit'

const configHasNullValues = (config: any) => {
    return Object.keys(config).some(key => config[key] == null)
}

let config = {
    host: process.env.MYSQL_HOST_PROD,
    port: parseInt(process.env.MYSQL_PORT_PROD),
    user: process.env.MYSQL_USER_PROD,
    password: process.env.MYSQL_PASSWORD_PROD,
    database: process.env.MYSQL_DATABASE_PROD
}

if(process.env.DEBUG?.toString().trim().toLowerCase() === 'true' || configHasNullValues(config)){
    config = {
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT),
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    }
}

if(configHasNullValues(config)) throw new Error('Missing database credentials. Please check your .env file.')

export const credentials = config

export default defineConfig({
    schema: "./db/drizzle/schema/*",
    driver: 'mysql2',
    dbCredentials: config,
    verbose: true,
    strict: true,
    out: './db/drizzle',
})
