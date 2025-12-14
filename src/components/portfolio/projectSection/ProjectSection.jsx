import React from 'react'
import Image from "next/image";
import Link from "next/link";


const projects = [
    {
        title: "Smart Toll Gate Scanner",
        slug: "smart-toll-gate-scanner",
        tagline: "AI-powered device for automated toll fee collection using IR sensors and number plate recognition.",
        category: "IoT / AI",
        liveurl: "",
        githuburl: "https://github.com/ankit-ai/smart-toll-gate-scanner",
        coverimage: "/images/projects/toll-gate.jpg",
        technologies: ["Python", "OpenCV", "Raspberry Pi", "IR Sensor", "Flask", "Machine Learning"]
    },
    {
        title: "AI Resume Analyzer",
        slug: "ai-resume-analyzer",
        tagline: "Web app that uses NLP to analyze resumes and suggest improvements for ATS optimization.",
        category: "AI / Web App",
        liveurl: "https://ai-resume-analyzer.vercel.app/",
        githuburl: "https://github.com/ankit-ai/ai-resume-analyzer",
        coverimage: "/images/projects/resume-analyzer.jpg",
        technologies: ["Next.js", "TailwindCSS", "Node.js", "OpenAI API", "Express", "MongoDB"]
    },
    {
        title: "WeatherNow Dashboard",
        slug: "weathernow-dashboard",
        tagline: "Interactive weather dashboard displaying real-time conditions and 7-day forecasts using APIs.",
        category: "Web App",
        liveurl: "https://weathernow-dashboard.vercel.app/",
        githuburl: "https://github.com/ankit-ai/weathernow-dashboard",
        coverimage: "/images/projects/weather-dashboard.jpg",
        technologies: ["React", "TailwindCSS", "OpenWeather API", "Chart.js"]
    },
    {
        title: "Personal Portfolio Website",
        slug: "personal-portfolio",
        tagline: "My personal developer portfolio showcasing projects, achievements, and technical journey.",
        category: "Portfolio",
        liveurl: "https://ankitdev.vercel.app/",
        githuburl: "https://github.com/ankit-ai/portfolio",
        coverimage: "/images/projects/portfolio.jpg",
        technologies: ["Next.js", "TailwindCSS", "Framer Motion", "Shadcn/UI"]
    }
];


export default function ProjectSection() {
    return (
        <section id="projects" className="py-20 px-6 bg-muted/30">
            <div className="comtainer mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold md:text-5xl mb-4">
                        Featured Projects
                    </h2>
                    <p className="text-xl text-muted-foreground">Some of my best work</p>
                </div>
                <div className="@container">
                    <div className="grid grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <div key={project.slug}
                                 className="@container/card group bg-card border rounded-lg hover:shadow-xl overflow-hidden transition-all duration-300">
                                {/*  image  */}
                                <div className="relative aspect-video overflow-hidden ng-muted">
                                    <Image src={project.coverimage} alt='project'
                                           className='object-cover group-hover:scale-105 transition-transform duration-300'
                                           width={600} height={400}/>
                                    <div
                                        className="absolute inset-0 bg-background/40 backdrop-blur-[2px] transition-opacity duration-300"/>
                                </div>

                                {/*    project content */}
                                <div className="p-4 @md/card:p-6 @md/card:space-y-4 space-y-3">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                    <span
                                        className="text-xs px-2 py-0 5 rounded-full bg-primary/10 text-primary @md/card:py-1 ">
                                        {project.category}
                                    </span>
                                        </div>
                                        <h3 className="text-lg @md/card:text-xl font-semibold mb-2 line-clamp-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-muted-foreground @ms/card:text-sm text-xs line-clamp-2">
                                            {project.tagline}
                                        </p>
                                    </div>
                                    {/*    tech stack */}
                                    {project.technologies && project.technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 @md/card:gap-2">
                                            {project.technologies.slice(0, 4).map((tech, idx) => (
                                                <span key={idx}
                                                      className="text-xs px-2 py-0.5 @md/card:py-1 rounded-md bg-muted">
                                    {tech}
                                </span>
                                            ))}
                                            {project.technologies.length > 4 && (
                                                <span
                                                    className="text-xs px-2 py-0.5 rounded-md bg-muted @md/card:py-1 ">
                                    +{project.technologies.length - 4}
                                </span>
                                            )}
                                        </div>
                                    )}
                                    {/*    Actions  */}

                                    <div className="flex flex-col gap-2 pt-2">
                                        <Link
                                            href={project.liveurl}
                                            target={`_blank`}
                                            rel="noopener noreferrer"
                                            className="flex-1 text-center px-3 py-2 rounded-lg bg-primary text-primary-foreground @md/card:px-4 hover:bg-primary/90 transition-colors text-xs"
                                        >
                                            Live Demo
                                        </Link>
                                        {project.githuburl && (
                                            <Link
                                                href={project.githuburl}
                                                target={`_blank`}
                                                rel="noopener noreferrer"
                                                className="px-3 py-2 @md/card:px-4 @md/card:text-sm rounded-lg border hover:bg-accent transition-colors text-xs text-center"
                                            >
                                                GitHub
                                            </Link>
                                        )}
                                    </div>

                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
