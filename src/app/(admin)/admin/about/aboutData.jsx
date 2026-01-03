'use client'
import React, {useEffect, useState} from "react";
import {fetchAboutData, fetchEducationData} from "@/apiData/api";


/* ---------------- Component ---------------- */

export default function AboutSection() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        // Call the API function directly
        fetchAboutData()
            .then((data) => {
                // Logic after success
                setData(data);
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
        <section id="about" className="py-20 px-6">
            <div className="container mx-auto max-w-4xl">

                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        About Me
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        {data.title}
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                    {data.description?.map((paragraph, index) => {
                        // Paragraph with heading
                        if (index === 1) {
                            return (
                                <p
                                    key={index}
                                    className="text-muted-foreground leading-relaxed mb-4"
                                >
                  <span className="text-foreground font-bold">
                    My Approach:
                  </span>{" "}
                                    {paragraph}
                                </p>
                            );
                        }

                        if (index === 2) {
                            return (
                                <p
                                    key={index}
                                    className="text-muted-foreground leading-relaxed mb-4"
                                >
                  <span className="text-foreground font-bold">
                    What I Do:
                  </span>{" "}
                                    {paragraph}
                                </p>
                            );
                        }

                        // Normal paragraph
                        return (
                            <p
                                key={index}
                                className="text-muted-foreground leading-relaxed mb-4"
                            >
                                {paragraph}
                            </p>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}

