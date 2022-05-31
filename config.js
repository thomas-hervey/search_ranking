export const DEFAULT_ELASTIC_CONFIG = {
  node: 'https://localhost:9200',
  auth: {
    username: 'elastic',
    password: 'example'
  },
  tls: {
    ca: fs.readFileSync('./certs/es01/es01.crt'),
    rejectUnauthorized: false
  }
}