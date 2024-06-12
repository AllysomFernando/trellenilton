require('dotenv').config();

const {neon} = require('@neondatabase/serverless');

const {PGHOST, PGDATABASE, PGUSER, PGPASSWORD} = process.env;

const sql = neon(`postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`);

async function getPgVersion(){
    const result = await sql`SELECT version()`;
    console.log(result[0]);
}

getPgVersion(); 