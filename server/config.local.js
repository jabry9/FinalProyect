module.exports = {
  restApiRoot: "/api",
  host: "0.0.0.0",
  port: 3000,
  remoting: {
    context: false,
    rest: {
      handleErrors: false,
      normalizeHttpPath: false,
      xml: false
    },
    json: {
      strict: false,
      limit: "100kb"
    },
    urlencoded: {
      extended: true,
      limit: "100kb"
    },
    cors: false
  },
  db_host: process.env.DB_HOST || 'localhost',
  db_port: process.env.DB_PORT || 3306,
  db_user: process.env.DB_USER || 'root',
  db_password: process.env.DB_PASSWORD || 'alumno',
  db_database: process.env.DB_DATABASE || 'proyectoFinal',
  email_user: process.env.EMAIL_USER,
  email_password: process.env.EMAIL_PASSWORD
}
