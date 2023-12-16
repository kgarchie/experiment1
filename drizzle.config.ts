import { defineConfig } from 'drizzle-kit'

export const credentials = {
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}
export default defineConfig({
    schema: "./db/drizzle/schema/*",
    driver: 'mysql2',
    dbCredentials: credentials,
    verbose: true,
    strict: true,
    out: './db/drizzle',
})
