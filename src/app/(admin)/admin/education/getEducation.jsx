'use client'
import React, {useEffect, useState} from 'react'
import {IconAward, IconCalendar} from "@tabler/icons-react";
import {formatDate} from "date-fns";
import {fetchEducationData, fetchExperienceData} from "@/apiData/api";

export default function GetEducationSection() {
    const [edu_data, setEdu_data] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        // Call the API function directly
        fetchEducationData()
            .then((data) => {
                // Logic after success
                setEdu_data(data);
            })
            .catch((err) => {
                // Logic after error
                setError(err.message);
            })
            .finally(() => {
                // Logic that runs in both cases
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <section id="education" className="relative py-20 px-6 bg-muted/30 overflow-hidden">
            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Education</h2>
                    <p className="text-xl text-muted-foreground">My academic background</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {edu_data.map((edu, index) => (
                        <div key={`${edu.institution}-${edu.degree}-${edu.start_date}`}
                             className="group relative bg-card border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
                            {/*accent gradient bar*/}
                            <div
                                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/60 to-primary/30 z-10"/>
                            <div className="relative z-10 p-6">
                                <div className="flex item-start gap-4 mb-4">
                                    {/*<div className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-primary/20 group-hover:border-primary/40 shrink-0 transition-colors">*/}
                                    {/*    <Image src={edu.logo} alt="logo" fill className="w-[64px] h-[64] object-cover"/>*/}
                                    {/*</div>*/}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-xl font-bold mb-1 line-clamp-2 group-hover:text-primary transition-colors">{edu.degree}</h3>
                                        <p className="text-lg font-medium text-primary mb-1">{edu.institution}</p>
                                        <p className="text-sm text-muted-foreground">{edu.fieldOfStudy}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <div
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-sm">
                                            <IconCalendar className="w-3.5 h-3.5"/>
                                            <span>
                                                {edu.start_date && formatDate(edu.start_date, "yyyy")} -{" "}
                                                {edu.current ? "Present" : edu.end_date ? formatDate(edu.end_date, "yyyy") : "N/A"}
                                            </span>
                                        </div>
                                        {edu.gpa &&
                                            <div className="inline-flex items-center gap-1.5 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium">
                                                <IconAward className="w-3.5 h-3.5"/>
                                                <span>CGPA: {edu.gpa}</span>
                                                {/*{edu.gpa && <span>CGPA: {edu.gpa}</span>}*/}
                                            </div>}

                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{edu.description}</p>
                                {/*    Achievement*/}
                                {edu.achievement && edu.achievement.length > 0 && (
                                    <div key={index} className="mb-4 p-3 rounded-lg bg-muted/50">
                                        <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                            <IconAward className="w-3.5 h-3.5 text-primary" />
                                            Achievement & Honors
                                        </h4>
                                        <ul className="space-y-1.5">
                                            {edu.achievement.map((achievement, i) => (
                                                <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                                                    <span className="text-primary">•</span>
                                                    <span className="flex-1">{achievement}</span>
                                                </li>
                                            ))}
                                        </ul>

                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
