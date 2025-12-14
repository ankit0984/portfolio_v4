import Image from "next/image";
import {Badge} from "@/components/ui/badge.jsx";

const expdata = [
    {
        "company": "NeuroScale AI",
        "position": "Senior Machine Learning Engineer",
        "employment_type": "Full-time",
        "location": "Bengaluru, India",
        "start_date": "2021-09-01",
        "end_date": null,
        "current": true,
        "description": "Designing and productionizing deep learning models for real-time computer vision and multimodal systems used in industrial automation.",
        "responsibilities": [
            "Lead model architecture design, training, and evaluation for object detection and multimodal fusion.",
            "Build and maintain ML inference pipelines to deploy models to edge devices and cloud.",
            "Mentor junior ML engineers and review model experiments and code.",
            "Collaborate with backend and MLOps teams to ensure scalable model serving and monitoring."
        ],
        "achievements": [
            "Reduced inference latency by 60% through model pruning + quantization while retaining 98% of baseline accuracy.",
            "Launched an end-to-end CI/CD pipeline for models that reduced deployment time from weeks to hours.",
            "Published internal whitepaper on multimodal sensor fusion used across 3 product lines."
        ],
        "technologies": [
            {"name": "PyTorch", "category": "AI/ML Framework"},
            {"name": "TensorRT", "category": "Inference Optimization"},
            {"name": "Kubernetes", "category": "Orchestration"},
            {"name": "FastAPI", "category": "Backend"},
            {"name": "Prometheus", "category": "Monitoring"}
        ],
        "company_logo": '/company_logo/neuroscale.svg',
        "company_website": "https://neuroscale.ai/"
    },
    {
        "company": "Aperture",
        "position": "Backend Engineer — AI Services",
        "employment_type": "Full-time",
        "location": "San Francisco, USA",
        "start_date": "2019-05-15",
        "end_date": "2021-08-31",
        "current": false,
        "description": "Built scalable backend services to host AI microservices, feature stores, and inference endpoints for enterprise analytics.",
        "responsibilities": [
            "Designed and implemented REST/GRPC microservices for model inference and feature retrieval.",
            "Optimized database schemas and caching layers to support low-latency feature serving.",
            "Worked with data scientists to productionize model APIs and ensure SLA-driven performance.",
            "Implemented authentication, rate-limiting, and observability for AI endpoints."
        ],
        "achievements": [
            "Scaled inference platform to handle 10× traffic while maintaining p95 latency under 120 ms.",
            "Cut cloud costs by 30% by introducing autoscaling policies and reserved instances for stable workloads.",
            "Delivered a feature-store serviceSection used by 12 cross-functional teams."
        ],
        "technologies": [
            {"name": "Go", "category": "Backend"},
            {"name": "gRPC", "category": "API"},
            {"name": "Redis", "category": "Caching/Feature Store"},
            {"name": "PostgreSQL", "category": "Database"},
            {"name": "AWS SageMaker", "category": "AI Platform"}
        ],
        "company_logo": "https://aperture.ai/hs-fs/hubfs/Aperture_Logo_Black(large)-2-1.png?width=303&height=100&name=Aperture_Logo_Black(large)-2-1.png",
        "company_website": "https://aperture.ai/"
    },
    {
        "company": "Backend.AI",
        "position": "ML Platform Engineer (Backend)",
        "employment_type": "Contract",
        "location": "Remote",
        "start_date": "2018-02-01",
        "end_date": "2019-04-30",
        "current": false,
        "description": "Contracted to build backend platform components enabling experiment tracking, model registry, and automated training pipelines.",
        "responsibilities": [
            "Developed microservices for experiment tracking and model metadata management.",
            "Integrated CI/CD with training jobs and model promotion workflows.",
            "Built role-based access controls and audit trails for model artifacts.",
            "Automated scheduled retraining and drift-detection triggers."
        ],
        "achievements": [
            "Delivered a model registry with versioning that reduced accidental model overwrites to zero.",
            "Integrated drift detection that automatically triggered retraining for two critical models.",
            "Designed APIs adopted by client teams to standardize model artifact handling."
        ],
        "technologies": [
            {"name": "Python", "category": "Backend"},
            {"name": "Airflow", "category": "Workflow Orchestration"},
            {"name": "Docker", "category": "Containerization"},
            {"name": "Elasticsearch", "category": "Logging/Indexing"},
            {"name": "SQLAlchemy", "category": "ORM"}
        ],
        "company_logo": "/company_logo/backend.svg",
        "company_website": "https://www.backend.ai/"  // verified website :contentReference[oaicite:0]{index=0}
    },
    {
        "company": "Xano",
        "position": "Lead Backend Engineer",
        "employment_type": "Full-time",
        "location": "Berlin, Germany",
        "start_date": "2015-06-01",
        "end_date": "2018-01-31",
        "current": false,
        "description": "Led the backend team building resilient APIs and data services powering edge-deployed ML applications.",
        "responsibilities": [
            "Architected microservice patterns and event-driven data pipelines.",
            "Owned CI/CD and blue/green deployment strategies for backend services.",
            "Coached engineers on backend best practices, observability, and testing.",
            "Collaborated with hardware and firmware teams to integrate edge telemetry into cloud services."
        ],
        "achievements": [
            "Introduced event-sourcing pattern that improved replayability and debugging of streaming ML data.",
            "Improved system uptime to 99.995% via redundancy and improved monitoring.",
            "Decreased mean-time-to-recover (MTTR) by 40% by implementing runbook automation."
        ],
        "technologies": [
            {"name": "Java (Spring Boot)", "category": "Backend"},
            {"name": "Kafka", "category": "Streaming"},
            {"name": "AWS Lambda", "category": "Serverless"},
            {"name": "Grafana", "category": "Monitoring"},
            {"name": "Cassandra", "category": "Distributed Database"}
        ],
        "company_logo": "/company_logo/xano.svg",
        "company_website": "https://www.xano.com/"  // verified website :contentReference[oaicite:1]{index=1}
    },
    {
        "company": "Cortex AI Ltd",
        "position": "AI Research Engineer",
        "employment_type": "Part-time",
        "location": "London, UK",
        "start_date": "2013-09-01",
        "end_date": "2015-05-31",
        "current": false,
        "description": "Researched novel neural architectures and prototyped scalable training routines for NLP and recommendation systems.",
        "responsibilities": [
            "Conducted literature reviews and implemented state-of-the-art models in prototypes.",
            "Designed distributed training experiments and hyperparameter search strategies.",
            "Produced reproducible research artifacts and open-source demos.",
            "Presented findings at internal and external technical meetings."
        ],
        "achievements": [
            "Co-authored two open-source model implementations adopted by academic collaborators.",
            "Achieved a 12% lift in recommendation relevance through a hybrid model prototype.",
            "Reduced training time by 25% using optimized data sharding and mixed-precision."
        ],
        "technologies": [
            {"name": "TensorFlow", "category": "AI/ML Framework"},
            {"name": "Horovod", "category": "Distributed Training"},
            {"name": "Kubeflow", "category": "MLOps"},
            {"name": "NumPy", "category": "Data Science"},
            {"name": "Linux", "category": "OS/Platform"}
        ],
        "company_logo": "/company_logo/cortex.svg",
        "company_website": "https://withcortex.ai/"
    }
]


export default function ExperienceSection() {
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
                    {expdata.map((item) => (
                        <div key={`${item.company}-${item.position}-${item.start_date}`}
                             className="relative pl-8 pb-8 border-l-2 border-muted last:border-l-0">
                            {/*    timeline dot */}
                            <div
                                className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background"/>
                            <div
                                className="@container/card bg-card border rounded-lg p-4 transition-shadow hover:shadow-lg @md/card:p-6">
                                <div className="flex flex-col gap-4 mb-4 @md/card:items-start @md/card:flex-row">
                                    <Image src={item.company_logo} alt="logo" width={64} height={64}
                                           className="object-cover"/>
                                </div>
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
                                        <h3 className="mr-4">{item.start_date} - {item.current? "Present": item.end_date}</h3>
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
                                        {item.technologies.map((technology) => (
                                            <Badge variant="secondary" key={technology.category}>{technology.name}</Badge>
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