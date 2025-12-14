import React from "react";
import Link from "next/link";
import Image from "next/image";

const blog_data = [
    {
        title: "How AI is Transforming Software Development",
        slug: "ai-transforming-software-development",
        excerpt:
            "Artificial Intelligence is reshaping how developers code, test, and deploy. From AI pair programmers to autonomous QA, here’s how it’s changing the game.",
        category: "Artificial Intelligence",
        tags: ["AI", "Machine Learning", "Software Engineering"],
        publishedTime: "2024-11-15",
        readTime: 6,
        featuredImage: "",
    },
    {
        title: "Getting Started with Generative AI and Prompt Engineering",
        slug: "getting-started-with-generative-ai",
        excerpt:
            "Learn the fundamentals of Generative AI, how large language models work, and practical tips for designing powerful prompts for ChatGPT and beyond.",
        category: "AI/ML",
        tags: ["Generative AI", "Prompt Engineering", "LLM"],
        publishedTime: "2024-08-10",
        readTime: 7,
        featuredImage: "",
    },
    {
        title: "Building a Smart Toll System Using AI and IoT",
        slug: "smart-toll-system-ai-iot",
        excerpt:
            "A behind-the-scenes look at how we designed our patent-pending toll gate scanner using IR sensors, computer vision, and automation technologies.",
        category: "Projects",
        tags: ["IoT", "Computer Vision", "Automation", "AI Project"],
        publishedTime: "2024-05-28",
        readTime: 5,
        featuredImage: "",
    },
    {
        title: "Top 10 Python Libraries Every AI Engineer Should Know",
        slug: "top-10-python-libraries-for-ai",
        excerpt:
            "Explore the most essential Python libraries for AI and Machine Learning — from TensorFlow to LangChain — and how they simplify your development workflow.",
        category: "Programming",
        tags: ["Python", "AI Tools", "Deep Learning"],
        publishedTime: "2024-09-02",
        readTime: 8,
        featuredImage: "",
    },
    {
        title: "From Cloud to Edge: Deploying AI Models in Real-World Environments",
        slug: "deploying-ai-models-cloud-edge",
        excerpt:
            "Discover how to efficiently deploy AI and ML models using cloud platforms like AWS and GCP, and the challenges of running inference on edge devices.",
        category: "Cloud Computing",
        tags: ["AWS", "Edge AI", "MLOps", "Deployment"],
        publishedTime: "2024-12-03",
        readTime: 9,
        featuredImage: "",
    },
    {
        title: "Mastering Data Visualization with React and Chart.js",
        slug: "data-visualization-with-react-and-chartjs",
        excerpt:
            "Learn how to create stunning, interactive dashboards in React using Chart.js — perfect for displaying real-time data and analytics in your web apps.",
        category: "Web Development",
        tags: ["React", "Chart.js", "Data Visualization"],
        publishedTime: "2024-10-19",
        readTime: 6,
        featuredImage: "",
    },
];


export default function BlogSection() {

    const formatDate=(date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }
  return (
    <section id="blog" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    Latest Blog Posts
                </h2>
                <p className="text-xl text-muted-foreground">
                    Thoughts, tutorials, and insights
                </p>
            </div>
            <div className="@container">
                <div className="grid grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3 gap-8">
                    {blog_data.map((post, index) => (
                        <article
                            key={index}
                            className="@container/card group bg-card border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                        >
                            {post.featuredImage && (
                                <div className="relative aspect-video overflow-hidden bg-muted">
                                    <Image
                                    src={post.featuredImage}
                                    alt={post.tags}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300 w-[600] h-[400]"
                                    />
                                </div>
                            )}
                            <div className="p-4 @md/card:p-6 space-y-3 @md/card:space-y-4">
                                <div className="flex flex-col @xs/card:flex-row @xs/card:items-center gap-2 text-xs @md/card:text-sm text-muted-foreground">
                                    {post.category && (
                                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs w-fit">
                                            {post.category}
                                        </span>
                                    )}
                                    <div className="flex items-center gap-2">
                                        {post.publishedTime && (
                                            <span className="truncate">
                                                ({formatDate(post.publishedTime)})
                                            </span>
                                        )}
                                    </div>
                                    {post.readTime&&(
                                        <>
                                            <span>•</span>
                                            <span>{post.readTime} min read</span>
                                        </>
                                    )}
                                </div>
                                <h3 className="text-lg font-semibold @md/card:text-xl group-hover:text-primary transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-muted-foreground text-xs @md/card:text-sm line-clamp-3">{post.excerpt}</p>
                                {post.tags && post.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 @md/card:gap-2 ">
                                        {post.tags.slice(0,3).map((tag) => (
                                            <span key={`${post.slug?.current}-${tag}`} className="text-xs px-2 py-0.5 @md/card:py-1 rounded-md bg-muted">#{tag}</span>
                                        ))}
                                    </div>
                                )}
                                <Link
                                    href={`/blog/${post.slug?.current}`}
                                    className="inline-flex items-center text-primary hover:underline text-xs @md/card:text-sm font-medium"
                                >
                                    Read More →
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    </section>

  );
}
