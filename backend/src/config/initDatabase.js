import fs from 'node:fs/promises';
import path from 'node:path';
import { pool } from './database.js';

const root = process.cwd();
const schema = await fs.readFile(path.join(root, 'sql', 'schema.sql'), 'utf8');
const seed = await fs.readFile(path.join(root, 'sql', 'seed.sql'), 'utf8');

await pool.query(schema);
await pool.query(seed);
await pool.end();
console.log('Database initialized');
