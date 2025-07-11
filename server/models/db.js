import 'dotenv/config'
import pkg from 'pg'
const {Pool} = pkg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  
});

pool.on('connect',()=>{

    console.log('postgres is connected')
})

export default pool