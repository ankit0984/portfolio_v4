import axios from "axios";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const CATEGORY_ID = process.env.NEXT_PUBLIC_CATEGORY_ID;

async function getHeroData() {

    const res = await fetch(
        `${BASE_URL}/api/portfolio/hero/getSection?heroId=${process.env.HERO_ID}`,
        {
            next: { revalidate: 300 }, // cache for 5 min
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch Hero data");
    }

    const json = await res.json();
    return json?.data ?? null;
}

export const fetchExperienceData = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/api/portfolio/experience/getExp`, {
            params: {
                categoryId: CATEGORY_ID
            }
        });
        // Return only the data part
        return res.data?.data ?? [];
    } catch (err) {
        console.error("Error fetching experience:", err);
        throw new Error("Failed to load experience data");
    }
};

export const fetchEducationData = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/api/portfolio/education/getEdu`, {
            // params: {
            //     categoryId: CATEGORY_ID
            // }
        });
        // Return only the data part
        return res.data?.data ?? [];
    } catch (err) {
        console.error("Error fetching experience:", err);
        throw new Error("Failed to load experience data");
    }
}
export const fetchCertificationData = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/api/portfolio/certificates/getCertificates`, {
            // params: {
            //     categoryId: CATEGORY_ID
            // }
        });
        // Return only the data part
        return res.data?.data ?? [];
    } catch (err) {
        console.error("Error fetching experience:", err);
        throw new Error("Failed to load experience data");
    }
}

export { getHeroData };