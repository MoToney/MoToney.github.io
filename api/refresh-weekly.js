// /api/refresh-weekly.js

import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
    try {
        const response = await fetch(
            "https://api.track.toggl.com/api/v9/me/time_entries",
            {
                headers: {
                    Authorization: `Basic ${Buffer.from(
                        process.env.TOGGL_API_KEY + ":api_token"
                    ).toString("base64")}`,
                },
            }
        );

        const entries = await response.json();

        const totalSeconds = entries.reduce((sum, e) => {
            if (!e.duration || e.duration < 0) return sum;
            return sum + e.duration;
        }, 0);

        const totalHours = (totalSeconds / 3600).toFixed(2);

        // store in DB
        await sql`
      INSERT INTO weekly_stats (id, total_hours, entry_count, updated_at)
      VALUES (1, ${totalHours}, ${entries.length}, NOW())
      ON CONFLICT (id)
      DO UPDATE SET
        total_hours = EXCLUDED.total_hours,
        entry_count = EXCLUDED.entry_count,
        updated_at = NOW();
    `;

        res.status(200).json({ totalHours });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
}