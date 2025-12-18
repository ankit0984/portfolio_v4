export async function getGeo(ip) {
    try {
        const res = await fetch(`https://ipapi.co/${ip}/json/`);
        const data = await res.json();

        return {
            country: data.country_name || "Unknown",
            city: data.city || "Unknown"
        };
    } catch (err) {
        return {
            country: "Unknown",
            city: "Unknown"
        };
    }
}
