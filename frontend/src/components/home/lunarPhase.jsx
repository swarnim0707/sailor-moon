import { useState, useEffect } from "react";

export default function LunarPhase() {
    const [moonPhase, setMoonPhase] = useState("");

    useEffect(() => {
        const baseUrl = "https://sailor-moon-backend.onrender.com/home/currentLunarPhase";
        console.log(`Fetching API data with the following URL: ${baseUrl}`);
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setMoonPhase(data.moonPhase);
                console.log(`Fetched data is ${JSON.stringify(data)} and moon phase is ${moonPhase}`);
            })
            .catch((error) => console.error("Error fetching lunar phase:", error));
            }, []);

    return(
        <span>{moonPhase}</span>
    );
}