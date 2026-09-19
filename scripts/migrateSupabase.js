import fs from 'fs';
import path from 'path';
import pg from 'pg';
const { Client } = pg;

const password = encodeURIComponent('Ge@286296sumit');
const projectId = 'wyberzvcyrjipjqpotwe';

const connectionStrings = [
  // 1. Session Pooler (IPv4 compatible)
  `postgresql://postgres.${projectId}:${password}@aws-0-ap-south-1.pooler.supabase.com:5432/postgres`,
  // 2. Transaction Pooler
  `postgresql://postgres.${projectId}:${password}@aws-0-ap-south-1.pooler.supabase.com:6543/postgres`,
  // 3. Direct connection
  `postgresql://postgres:${password}@db.${projectId}.supabase.co:5432/postgres`
];

async function runMigration() {
  const sql = fs.readFileSync(path.resolve('./supabase_schema.sql'), 'utf-8');

  let connected = false;
  let client = null;

  for (const connStr of connectionStrings) {
    try {
      console.log('Attempting connection to Supabase...');
      client = new Client({
        connectionString: connStr,
        ssl: { rejectUnauthorized: false }
      });
      await client.connect();
      console.log('Connected successfully to Supabase PostgreSQL!');
      connected = true;
      break;
    } catch (err) {
      console.warn('Connection attempt failed:', err.message);
      if (client) {
        try { await client.end(); } catch (e) {}
      }
    }
  }

  if (!connected || !client) {
    console.error('All direct connection attempts failed.');
    process.exit(1);
  }

  try {
    console.log('Executing database schema migration...');
    await client.query(sql);
    console.log('SUCCESS! All tables, RLS policies, indexes, and seed accounts created successfully in Supabase.');
  } catch (err) {
    console.error('Migration execution error:', err.message);
  } finally {
    await client.end();
  }
}

runMigration();
