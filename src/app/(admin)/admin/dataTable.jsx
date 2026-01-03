"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/sidebar/data-table";

export default function DashboardPage() {
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSections() {
            const res = await fetch("/api/portfolio/section/getSection");
            const json = await res.json();
            const rawData = json.data?.[0] || {};
            console.log(rawData)
            
            // Map the nested sections into a flat array
            const sectionsList = [
                { ...rawData.hero, id: "hero", header: "Hero", type: "Single", userid: rawData.userid, heroId: rawData.hero?.id },
                { ...rawData.about, id: "about", header: "About", type: "Single", userid: rawData.userid, aboutId: rawData.about?.id },
                { ...rawData.contact, id: "contact", header: "Contact", type: "Single", userid: rawData.userid, contactId: rawData.contact?.id },
                { id: "blogs", header: "Blogs", type: "Multi", userid: rawData.userid, items: rawData.blogs?.map(item => ({ ...item, blogId: item.id })) },
                { id: "achievements", header: "Achievements", type: "Multi", userid: rawData.userid, items: rawData.achievements?.map(item => ({ ...item, achievementId: item.id })) },
                { id: "certifications", header: "Certifications", type: "Multi", userid: rawData.userid, items: rawData.certifications?.map(item => ({ ...item, certificationId: item.id })) },
                { id: "education", header: "Education", type: "Multi", userid: rawData.userid, items: rawData.education?.map(item => ({ ...item, educationId: item.id })) },
                { id: "experience", header: "Experience", type: "Multi", userid: rawData.userid, items: rawData.experience?.map(item => ({ ...item, experienceId: item.id })) },
                { id: "projects", header: "Projects", type: "Multi", userid: rawData.userid, items: rawData.projects?.map(item => ({ ...item, projectId: item.id })) },
                { id: "services", header: "Services", type: "Multi", userid: rawData.userid, items: rawData.services?.map(item => ({ ...item, serviceId: item.id })) },
            ];

            setSections(sectionsList);
            setLoading(false);
        }

        fetchSections();
    }, []);

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    return (
        <div className="p-6">
            <DataTable data={sections} setData={setSections} />
        </div>
    );
}
