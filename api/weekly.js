

import { kv } from "@vercel/kv";

export default async function handler(req, res) {
    try {
        const data = await kv.get("toggl:weekly");

        if (!data) {
            return res.status(404).json({ message: "No data yet" });
        }

        res.status(200).json(data);
    } catch ( err ) {
        res.status(500).send("Error fetching data");
    }
}