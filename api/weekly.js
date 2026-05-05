import { Buffer } from 'buffer';


export default async function handler(req, res) {
    const url = "https://api.track.toggl.com/reports/api/v2/weekly?workspace_id=8246498";

    const response = await fetch(url, {
        headers: {
            Authorization: `Basic ${Buffer
                .from(process.env.TOGGL_API_KEY + ":api_token")
                .toString("base64")}`
        }
    });

    const data = await response.json();
    res.status(200).json(data);
}