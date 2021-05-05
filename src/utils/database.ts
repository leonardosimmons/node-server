
import Mysql from 'mysql2';

const pool: Mysql.Pool = Mysql.createPool({
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USERNAME,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD
});

export default pool.promise();