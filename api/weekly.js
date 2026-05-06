// /api/get-weekly.js

import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res ) {
    const result = await sql`SELECT * FROM weekly_stats WHERE id = 1`;
    res.status(200).json(result[0]);
}