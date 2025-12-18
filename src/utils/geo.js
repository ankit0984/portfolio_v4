export async function getGeo(ip) {
    try {
        const res = await fetch(`https://ipapi.co/${ip}/json/`);
        const data = await res.json();

        return {
            country: data.country_name || "Unknown",
            region: data.region || data.region_code || "Unknown",
            city: data.city || "Unknown"
        };
    } catch {
        return {
            country: "Unknown",
            region: "Unknown",
            city: "Unknown"
        };
    }
}
