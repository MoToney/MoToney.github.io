// /api/refresh-weekly.js

import { kv } from "@vercel/kv";

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

        // ---- Example: aggregate weekly hours ----
        const totalSeconds = entries.reduce((sum, e) => {
            if (!e.duration || e.duration < 0) return sum;
            return sum + e.duration;
        }, 0);

        const totalHours = (totalSeconds / 3600).toFixed(2);

        const payload = {
            totalHours,
            entryCount: entries.length,
            lastUpdated: new Date().toISOString(),
        };

        // ---- Store in KV ----
        await kv.set("toggl:weekly", payload);

        res.status(200).json(payload);
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to refresh");
    }
}