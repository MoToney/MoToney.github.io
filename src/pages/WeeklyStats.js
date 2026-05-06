import { useEffect, useState } from "react";

export default function WeeklyStats() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("/api/weekly")
            .then((res) => res.json())
            .then(setData)
            .catch(console.error);
    }, []);

    if (!data) return <p>Loading...</p>;

    return (
        <div>
            <h2>Weekly Activity</h2>
            <p>Total Hours: {data.totalHours}</p>
            <p>Entries: {data.entryCount}</p>
            <p>Last Updated: {new Date(data.lastUpdated).toLocaleString()}</p>
        </div>
    );
}