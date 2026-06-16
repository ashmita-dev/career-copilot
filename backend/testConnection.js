require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function test() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("SUCCESS");
    console.log(result.rows[0]);
  } catch (error) {
    console.log("FAILED");
    console.log(error.message);
  } finally {
    await pool.end();
  }
}

test();