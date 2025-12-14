"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {IconExternalLink, IconCalendar} from "@tabler/icons-react";
import { format } from "date-fns";

const achievement_data = [
    {
        title: "Design Patent: Device for Scanning the Vehicles at Toll Gate",
        type: "Patent",
        issuer: "Indian Patent Office (Designs Act, 2000)",
        date: "2024-05-28",
        description:
            "Co-invented and registered a patent for a smart toll gate system that scans vehicle number plates using an IR sensor-based camera. The device automatically calculates toll duration and deducts applicable fees from the user’s wallet.",
        image: "/images/achievements/patent-tollgate.jpg",
        url: "https://ipindia.gov.in/",
        featured: true,
        order: 1,
    },
    {
        title: "Winner – Smart India Hackathon (AI Category)",
        type: "Hackathon",
        issuer: "Ministry of Education, Government of India",
        date: "2024-01-20",
        description:
            "Led a 4-member team to develop an AI-based solution for intelligent traffic monitoring using real-time image data and predictive modeling.",
        image: "/images/achievements/sih-winner.jpg",
        url: "https://www.sih.gov.in/",
        featured: true,
        order: 2,
    },
    {
        title: "Google Cloud Career Practitioner Program",
        type: "Certification",
        issuer: "Google Cloud",
        date: "2023-12-10",
        description:
            "Completed Google Cloud's practitioner-level certificationSection covering cloud fundamentals, AI services, and data analytics workflows.",
        image: "/images/achievements/google-cloud.jpg",
        url: "https://cloud.google.com/",
        featured: false,
        order: 3,
    },
    {
        title: "Top 5 Finalist – NIET Project Expo 2024",
        type: "Competition",
        issuer: "Noida Institute of Engineering & Technology",
        date: "2024-03-18",
        description:
            "Presented an AI-powered system for predictive vehicle maintenance using sensor data and machine learning techniques.",
        image: "/images/achievements/niet-expo.jpg",
        url: "https://www.niet.co.in/",
        featured: false,
        order: 4,
    },
    {
        title: "IBM AI Engineering Professional Certificate",
        type: "Certification",
        issuer: "IBM / Coursera",
        date: "2023-11-22",
        description:
            "Earned a professional certificate focused on neural networks, deep learning, and practical model deployment using TensorFlow and PyTorch.",
        image: "/images/achievements/ibm-ai.jpg",
        url: "https://www.coursera.org/professional-certificates/ai-engineering",
        featured: false,
        order: 5,
    },
    {
        title: "First Place – College Coding Marathon",
        type: "Competition",
        issuer: "NIET Coding Club",
        date: "2023-09-10",
        description:
            "Secured first place among 200+ participants by solving algorithmic challenges on data structures and optimization problems in under 2 hours.",
        image: "/images/achievements/coding-marathon.jpg",
        url: "",
        featured: false,
        order: 6,
    },
    {
        title: "OpenAI Developer Community Contributor",
        type: "Recognition",
        issuer: "OpenAI",
        date: "2024-06-15",
        description:
            "Recognized for contributing prompt engineering guides and community tutorials for leveraging GPT APIs in production environments.",
        image: "/images/achievements/openai-dev.jpg",
        url: "https://openai.com/",
        featured: false,
        order: 7,
    },
    {
        title: "AI & ML Workshop Speaker",
        type: "Event",
        issuer: "TechFest 2024, NIET",
        date: "2024-02-10",
        description:
            "Delivered a hands-on workshop introducing students to AI model building using Python, scikit-learn, and TensorFlow.",
        image: "/images/achievements/ai-workshop.jpg",
        url: "",
        featured: false,
        order: 8,
    },
    {
        title: "DeepLearning.AI – Prompt Engineering for ChatGPT",
        type: "Certification",
        issuer: "DeepLearning.AI / OpenAI",
        date: "2024-05-10",
        description:
            "Completed specialized training in designing optimized prompts for large language models like GPT-4, with practical applications in automation.",
        image: "/images/achievements/prompt-engineering.jpg",
        url: "https://www.deeplearning.ai/short-courses/prompt-engineering/",
        featured: false,
        order: 9,
    },
    {
        title: "Best Innovation Award – College Tech Carnival 2023",
        type: "Award",
        issuer: "NIET",
        date: "2023-04-02",
        description:
            "Awarded for developing a computer vision-based attendance system that utilizes facial recognition and real-time student tracking.",
        image: "/images/achievements/innovation-award.jpg",
        url: "",
        featured: false,
        order: 10,
    },
];


// helper: check for non-empty string
const isNonEmptyString = (v) => typeof v === "string" && v.trim() !== "";

// safe date formatting
const safeFormat = (dateStr, fmt = "dd MMM yyyy") => {
    if (!isNonEmptyString(dateStr)) return "";
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return "";
    return format(d, fmt);
};

export default function AchievementSection({ showFeaturedFirst = true }) {
    // copy & sort: featured first (if option true), then by order ascending
    const sorted = achievement_data
        .slice()
        .sort((a, b) => {
            if (showFeaturedFirst) {
                if (a.featured && !b.featured) return -1;
                if (!a.featured && b.featured) return 1;
            }
            return (a.order ?? 999) - (b.order ?? 999);
        });


    return (

    <section id="achievements" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    Achievements & Awards
                </h2>
                <p className="text-xl text-muted-foreground">
                    Milestones & recognition
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sorted.map((ach, i) => {
                    const imgSrc = isNonEmptyString(ach.image) ? ach.image : "/images/achievements/default.jpg";

                    return (
                        <motion.article
                            key={ach.title + i}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, delay: i * 0.06 }}
                            viewport={{ once: true }}
                            className={`group relative bg-card border rounded-xl overflow-hidden p-4 flex flex-col transition hover:shadow-lg ${
                                ach.featured ? "ring-2 ring-primary/20" : ""
                            }`}
                        >
                            {/* top: image + meta */}
                            <div className="flex items-start gap-4">
                                <div className="relative w-16 h-16 rounded-md overflow-hidden border border-primary/10 shrink-0 bg-white">
                                    {/* safe Image render */}
                                    {isNonEmptyString(imgSrc) ? (
                                        <Image
                                            src={imgSrc}
                                            alt={ach.title}
                                            fill
                                            sizes="64px"
                                            style={{ objectFit: "cover" }}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                                            N/A
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <h3 className="text-sm font-semibold line-clamp-2">{ach.title}</h3>

                                        {ach.featured && (
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                          Featured
                        </span>
                                        )}
                                    </div>

                                    <p className="text-xs text-muted-foreground mt-1">
                                        <span className="font-medium">{ach.type}</span>
                                        {ach.issuer ? ` • ${ach.issuer}` : ""}
                                    </p>

                                    {ach.date && (
                                        <div className="text-xs text-muted-foreground mt-1 inline-flex items-center gap-1">
                                            <IconCalendar className="w-3 h-3 text-muted-foreground" />
                                            <span>{safeFormat(ach.date)}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* description */}
                            {ach.description && (
                                <p className="text-sm text-muted-foreground mt-3 line-clamp-4">{ach.description}</p>
                            )}

                            <div className="mt-4 flex items-center justify-between gap-4">
                                <div className="text-xs text-muted-foreground">#{ach.type.toLowerCase()}</div>
                                <div className="flex items-center gap-2">
                                    {isNonEmptyString(ach.url) && (
                                        <a
                                            href={ach.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-xs text-primary hover:underline"
                                        >
                                            <IconExternalLink className="w-4 h-4" />
                                            <span>View</span>
                                        </a>
                                    )}
                                    <span className="text-xs text-muted-foreground">#{ach.order ?? "-"}</span>
                                </div>
                            </div>
                        </motion.article>
                    );
                })}
            </div>

        </div>
    {/*    3.06.3*/}
    </section>

  )
}
