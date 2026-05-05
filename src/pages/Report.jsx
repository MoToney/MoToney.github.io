import { useEffect, useState } from "react";

function WeeklyReport() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("/api/weekly")
            .then(res => res.json())
            .then(setData)
            .catch(console.error);
    }, []);

    if (!data) return <p>Loading...</p>;

    return (
        <div>
            <h2>Weekly Report</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

export default WeeklyReport;