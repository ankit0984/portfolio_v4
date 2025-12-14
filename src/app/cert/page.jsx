'use client'
import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import {ExternalLink, Award} from "lucide-react"
import Link from "next/link";

export default function Page() {
    const [certData, setCertData] = useState([]);

    useEffect(() => {
        axios
            .get("/api/portfolio/certificates/getCertificates")
            .then((res) => {
                console.log(res.data);
                setCertData(res.data.data); // 👈 this is an array
            })
            .catch((err) => console.error(err));
    }, []);

    if (!certData || certData.length === 0) {
        return <div>Loading...</div>;
    }

    return (

    <section id='certifications' className="py-20 px-6 bg-muted/60">
        <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    Certification
                </h2>
                <p className="text-xl text-muted-foreground">
                    Professional credentials and certifications
                </p>
            </div>
            <div className="@container">
                <div className="grid grid-cols-1 @2xl:grid-cols-2 gap-6">
                    {/*card content*/}
                    {certData.slice(0,4).map((cert) => (
                        <Link
                            href={cert.credentialUrl}
                            key={`${cert.issueDate}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block h-full group"
                        >
                            <div
                                className="relative h-full flex flex-col gap-4 p-6 sm:p-8 light:bg-white rounded-lg hover:shadow-lg hover:border-blue-300 transition-all duration-300 border dark:border-slate-800 dark:hover:border-blue-600 border-slate-200">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-10 h-10 light:bg-blue-50 dark:border-2 rounded-lg flex items-center justify-center">
                                            <Award className="w-5 h-5 text-blue-600"/>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold light:text-slate-900 dark:text-primary dark:group-hover:text-blue-600 group-hover:text-blue-600 transition-colors">
                                                {cert.name}
                                            </h3>
                                            <p className="text-sm text-slate-500 dark:text-primary">{cert.issuer}</p>
                                        </div>
                                    </div>
                                    <ExternalLink
                                        className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors"/>
                                </div>

                                <p className="text-sm text-slate-600 dark:text-primary mb-4 line-clamp-2">{cert.description}</p>

                                <div className="flex flex-wrap gap-2">
                                    {cert.skills.map((skill) => (
                                        <span
                                            key={skill.name}
                                            className="inline-block px-3 py-1 bg-blue-50 dark:bg-muted/60 dark:text-primary text-blue-700 text-xs font-medium rounded-full"
                                        >
                                                {skill.name}
                                            </span>
                                    ))}
                                </div>

                                <div className="mt-4 pt-4 border-t border-slate-100">
                                    <p className="text-xs text-slate-500 dark:text-primary">
                                        Issued: {new Date(cert.issueDate).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long"
                                    })}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                {/*<Link href="#" className="text-center mb-16">View more</Link>*/}
            </div>

        </div>
    </section>
    );
}
