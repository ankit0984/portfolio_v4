import React from 'react'
import {ExternalLink, Award} from "lucide-react"
import Link from "next/link";

const certificate_data = [
    {
        name: "Machine Learning Specialization",
        issuer: "DeepLearning.AI & Stanford University (Coursera)",
        issueDate: "2024-03-15",
        expiryDate: "",
        credentialId: "ML-SP-2024-00123",
        credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/MLSP2024",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Coursera_logo.svg",
        description:
            "A comprehensive specialization by Andrew Ng covering supervised, unsupervised, and advanced machine learning methods including model optimization and best practices.",
        skills: [
            {name: "Machine Learning", category: "AI/ML"},
            {name: "Supervised Learning", category: "AI/ML"},
            {name: "Python", category: "Programming"},
        ],
        order: 1,
    },
    {
        name: "Generative AI Fundamentals",
        issuer: "Google Cloud",
        issueDate: "2024-07-02",
        expiryDate: "",
        credentialId: "GENAI-GOOGLE-2024-0147",
        credentialUrl: "https://www.cloudskillsboost.google/public_profiles/",
        logo: "https://www.gstatic.com/devrel-devsite/prod/vfb09a859c547f58659b3e81c1f6bb01b7160158cbf2a8b8044a69c02caa91550/cloud/images/favicons/onecloud/apple-icon.png",
        description:
            "Learned the core concepts of Generative AI, Large Language Models (LLMs), and their real-world applications using Google Cloud tools like Vertex AI and Model Garden.",
        skills: [
            {name: "Generative AI", category: "AI/ML"},
            {name: "LLMs", category: "AI/ML"},
            {name: "Google Cloud", category: "Cloud Computing"},
        ],
        order: 2,
    },
    {
        name: "Prompt Engineering for ChatGPT",
        issuer: "OpenAI & DeepLearning.AI",
        issueDate: "2024-05-10",
        expiryDate: "",
        credentialId: "PE-GPT-2024-0874",
        credentialUrl: "https://www.deeplearning.ai/short-courses/prompt-engineering/",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Coursera_logo.svg",
        description:
            "Completed the official Prompt Engineering course focused on designing, optimizing, and testing effective prompts for ChatGPT and other large language models.",
        skills: [
            {name: "Prompt Engineering", category: "AI/ML"},
            {name: "ChatGPT", category: "AI/ML"},
            {name: "Natural Language Processing", category: "AI/ML"},
        ],
        order: 3,
    },
    {
        name: "AI For Everyone",
        issuer: "DeepLearning.AI (Coursera)",
        issueDate: "2023-12-08",
        expiryDate: "",
        credentialId: "AIFE-2023-0642",
        credentialUrl: "https://www.coursera.org/account/accomplishments/certificate/AIFE2023",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Coursera_logo.svg",
        description:
            "An introductory course by Andrew Ng explaining the societal and business impact of artificial intelligence, with emphasis on responsible AI development.",
        skills: [
            {name: "Artificial Intelligence", category: "AI/ML"},
            {name: "Ethical AI", category: "AI/ML"},
            {name: "AI Strategy", category: "Management"},
        ],
        order: 4,
    },
    {
        name: "Introduction to Machine Learning",
        issuer: "IBM Skills Network (Coursera)",
        issueDate: "2023-11-05",
        expiryDate: "",
        credentialId: "IBM-ML-2023-0928",
        credentialUrl: "https://www.coursera.org/account/accomplishments/certificate/IBMML2023",
        logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
        description:
            "Learned key machine learning concepts such as regression, classification, and clustering using Python and scikit-learn with practical exercises.",
        skills: [
            {name: "Machine Learning", category: "AI/ML"},
            {name: "Python", category: "Programming"},
            {name: "scikit-learn", category: "Libraries"},
        ],
        order: 5,
    },
    {
        name: "Deep Learning Specialization",
        issuer: "DeepLearning.AI (Coursera)",
        issueDate: "2024-09-01",
        expiryDate: "",
        credentialId: "DL-SP-2024-0623",
        credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/DLSP2024",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Coursera_logo.svg",
        description:
            "Comprehensive five-course specialization covering neural networks, CNNs, RNNs, and hyperparameter tuning for modern deep learning systems.",
        skills: [
            {name: "Deep Learning", category: "AI/ML"},
            {name: "Neural Networks", category: "AI/ML"},
            {name: "TensorFlow", category: "Libraries"},
        ],
        order: 6,
    },
    {
        name: "Building Systems with the ChatGPT API",
        issuer: "OpenAI & DeepLearning.AI",
        issueDate: "2024-08-12",
        expiryDate: "",
        credentialId: "OPENAI-SYS-2024-0812",
        credentialUrl: "https://www.deeplearning.ai/short-courses/building-systems-with-chatgpt-api/",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Coursera_logo.svg",
        description:
            "Hands-on course on using the ChatGPT API to design multi-step AI workflows, build autonomous agents, and integrate LLMs into real-world applications.",
        skills: [
            {name: "ChatGPT API", category: "AI/ML"},
            {name: "API Development", category: "Software Engineering"},
            {name: "AI System Design", category: "Architecture"},
        ],
        order: 7,
    },
    {
        name: "AI-Powered Data Analysis with Python",
        issuer: "IBM SkillsBuild",
        issueDate: "2023-08-24",
        expiryDate: "",
        credentialId: "AIDA-IBM-2023-0723",
        credentialUrl: "https://skillsbuild.org/",
        logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
        description:
            "Focused on leveraging Python’s data science stack (Pandas, NumPy, Matplotlib) along with AI models to analyze and visualize complex datasets.",
        skills: [
            {name: "Data Analysis", category: "Data Science"},
            {name: "AI Tools", category: "AI/ML"},
            {name: "Python", category: "Programming"},
        ],
        order: 8,
    },
    {
        name: "Computer Vision Fundamentals",
        issuer: "DeepLearning.AI",
        issueDate: "2023-10-02",
        expiryDate: "",
        credentialId: "CVF-2023-0902",
        credentialUrl: "https://www.deeplearning.ai/short-courses/computer-vision-fundamentals/",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Coursera_logo.svg",
        description:
            "Learned how to apply deep learning techniques to computer vision tasks such as image classification, object detection, and segmentation.",
        skills: [
            {name: "Computer Vision", category: "AI/ML"},
            {name: "CNN", category: "AI/ML"},
            {name: "Image Processing", category: "AI/ML"},
        ],
        order: 9,
    },
    {
        name: "Introduction to NoSQL Databases",
        issuer: "Coursera",
        issueDate: "2022-10-01",
        expiryDate: "",
        credentialId: "NOSQL-2022-0415",
        credentialUrl: "https://www.coursera.org/account/accomplishments/certificate/NOSQL2022",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Coursera_logo.svg",
        description:
            "An overview of NoSQL database concepts, data modeling, and scalability techniques across MongoDB, Cassandra, and DynamoDB systems.",
        skills: [
            {name: "NoSQL", category: "Database"},
            {name: "MongoDB", category: "Database"},
            {name: "Data Modeling", category: "Software Engineering"},
        ],
        order: 10,
    },
];


export default function CertificationSection() {
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
                        {certificate_data.slice(0,4).map((cert) => (
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
    )
}