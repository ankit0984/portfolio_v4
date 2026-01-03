'use client'
import {Badge} from "@/components/ui/badge.jsx";
import {useEffect, useState} from "react";
import {fetchExperienceData} from "@/apiData/api";


export default function ExperienceSection() {
    const [expData, setExpData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Call the API function directly
        fetchExperienceData()
            .then((data) => {
                // Logic after success
                setExpData(data);
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
        <section id="experience" className="py-28 px-6">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Work Experience
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        My professional journey
                    </p>
                </div>
                <div className="space-y-8">
                    {expData.map((item) => (
                        <div key={`${item.company}-${item.position}-${item.start_date}`}
                             className="relative pl-8 pb-8 border-l-2 border-muted last:border-l-0">
                            {/*    timeline dot */}
                            <div
                                className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background"/>
                            <div
                                className="@container/card bg-card border rounded-lg p-4 transition-shadow hover:shadow-lg @md/card:p-6">
                                {/*<div className="flex flex-col gap-4 mb-4 @md/card:items-start @md/card:flex-row">*/}
                                {/*    <Image src={item.company_logo} alt="logo" width={64} height={64}*/}
                                {/*           className="object-cover"/>*/}
                                {/*</div>*/}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-xl @ms/card:text-2xl font-semibold line-clamp-2">
                                        {item.position}
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-2 mt-1">
                                        <p className="text-base @md/card:text-lg text-primary font-medium truncated">
                                            {item.company}
                                        </p>

                                        <span className="text-muted-foreground">💠</span>
                                        <span
                                            className="text-xs @md/card:text-sm text-muted-foreground">{item.employment_type}</span>
                                    </div>
                                    <div className="flex flex-row text-sm gap-2.5 text-muted-foreground">
                                        <h3 className="mr-4">
                                            {new Date(item.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} -
                                            {item.current ? " Present" : ` ${new Date(item.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
                                        </h3>
                                        <li>{item.location}</li>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {item.description}
                                    </p>
                                    <div className="mt-2.5 mb-2.5">
                                        <h3 className="@md/card:text-lg text-primary font-semibold">
                                            Key Responsibilities :
                                        </h3>
                                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                                            {item.responsibilities.map((responsibility, index) => (
                                                <li key={index}>{responsibility}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>


                                        <h3 className="@md/card:text-lg text-primary font-semibold">
                                            Achievements :
                                        </h3>
                                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                                            {item.achievements.map((achievement, index) => (
                                                <li key={index}>{achievement}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex w-full flex-wrap gap-2 mt-2.5">
                                        {item.technologies.map((technology, index) => (
                                            <Badge variant="secondary" key={index}>
                                                {typeof technology === 'string' ? technology : technology.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    )
}