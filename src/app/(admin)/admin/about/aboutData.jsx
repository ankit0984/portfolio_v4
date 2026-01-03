import React from "react";


async function getAboutData() {
    const res = await fetch(
        'http://localhost:3000/api/portfolio/about/getAbout',
        {
            next: { revalidate: 300 }, // cache for 5 minutes
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch About section data");
    }

    const json = await res.json();

    if (!json?.success || !json?.data) {
        return null;
    }

    // API may return array or object → normalize
    return Array.isArray(json.data) ? json.data[0] : json.data;
}

/* ---------------- Component ---------------- */

export default async function AboutSection() {
    const data = await getAboutData();

    if (!data) return null;

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

