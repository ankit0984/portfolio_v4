import axios from "axios";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const CATEGORY_ID = process.env.NEXT_PUBLIC_CATEGORY_ID;
const HERO_ID = process.env.NEXT_PUBLIC_HERO_ID;

export const getHeroData=async ()=> {

    try {
        const res = await axios.get(`${BASE_URL}/api/portfolio/hero/getSection`, {
            params: {
                heroId: HERO_ID
            }
        });
        // Return only the data part
        return res.data?.data ?? [];
    } catch (err) {
        console.error("Error fetching experience:", err);
        throw new Error("Failed to load experience data");
    }
}

export const fetchAboutData = async ()=>{
    try {
        const res = await axios.get(`${BASE_URL}/api/portfolio/about/getAbout`);
        // Return only the data part
        return res.data?.data ?? [];
    } catch (err) {
        console.error("Error fetching experience:", err);
        throw new Error("Failed to load experience data");
    }
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