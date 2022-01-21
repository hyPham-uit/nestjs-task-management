const Pool = require("pg").Pool
const pool = new Pool({
    user: "postgres"||process.env.DB_user,
    password: "postgres"||process.env.DB_password,
    database: "todo_database",
    host: "localhost",
    port: 5432||process.env.DB_port
})

module.exports = pool