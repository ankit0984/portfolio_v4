"use client"
import React from 'react'
import {
    IconBrain,
    IconCode,
    IconMessageCircle,
    IconCloud,
    IconChartBar,
    IconDeviceMobile,
    IconLayout,
    IconApi,
    IconPalette,
    IconCpu,
    IconSparkles,
    IconCheck,
} from "@tabler/icons-react";
import {Star} from "lucide-react";
import {PortableText} from "@portabletext/react";

export const services_data = [
    {
        title: "AI & Machine Learning Solutions",
        slug: "ai-ml-solutions",
        icon: "IconBrain",
        shortDescription:
            "Building intelligent systems that learn, predict, and automate using modern AI and ML technologies.",
        fullDescription:
            "Design and develop end-to-end AI and Machine Learning systems — from data collection and preprocessing to model training, optimization, and deployment. I specialize in predictive analytics, computer vision, and natural language processing, helping businesses make data-driven decisions and automate workflows.",
        features: [
            "End-to-end ML pipeline design",
            "Predictive and classification models",
            "Generative AI and LLM integration",
            "Custom computer vision applications",
            "Model optimization and deployment (TensorFlow, PyTorch, ONNX)",
        ],
        technologies: [
            { name: "Python", category: "Programming" },
            { name: "TensorFlow", category: "AI/ML" },
            { name: "PyTorch", category: "AI/ML" },
            { name: "OpenAI API", category: "AI/ML" },
            { name: "FastAPI", category: "Backend" },
        ],
        deliverable: "Custom-trained ML models with deployment-ready APIs",
        pricing: {
            startingPrice: 800,
            priceType: "project",
            description: "Starting at $800"
        },
        timeline: "2–6 weeks (depending on complexity)",
        featured: true,
        order: 1,
    },
    {
        title: "Web Application Development",
        slug: "web-application-development",
        icon: "IconCode",
        shortDescription:
            "Responsive, scalable, and user-friendly web apps built with modern frameworks.",
        fullDescription:
            "I create high-performance web applications using modern stacks like Next.js, React, and Node.js. From landing pages to complex dashboards, I deliver pixel-perfect, responsive, and accessible interfaces optimized for SEO and performance.",
        features: [
            "Responsive UI/UX design",
            "Full-stack web app development",
            "REST and GraphQL APIs",
            "Authentication and security",
            "SEO & performance optimization",
        ],
        technologies: [
            { name: "Next.js", category: "Frontend" },
            { name: "React", category: "Frontend" },
            { name: "TailwindCSS", category: "Frontend" },
            { name: "Node.js", category: "Backend" },
            { name: "MongoDB", category: "Database" },
        ],
        deliverable: "Fully functional, production-ready web app with deployment",
        pricing: {
            startingPrice: 600,
            priceType: "project",
            description: "Starting at $600"
        },
        timeline: "3–5 weeks",
        featured: true,
        order: 2,
    },
    {
        title: "Generative AI & Chatbot Development",
        slug: "generative-ai-chatbots",
        icon: "IconMessageCircle",
        shortDescription:
            "Custom AI chatbots and conversational agents powered by GPT and open-source LLMs.",
        fullDescription:
            "Design and build conversational chatbots using GPT-based LLMs, fine-tuned for your business needs. Integrate AI assistants into web apps, helpdesks, and SaaS products for automated and human-like conversations.",
        features: [
            "OpenAI GPT-4 integration",
            "Context-aware conversation memory",
            "Custom persona creation",
            "Multi-platform chatbot deployment",
            "Webhook and API connectivity",
        ],
        technologies: [
            { name: "OpenAI GPT-4", category: "AI/ML" },
            { name: "LangChain", category: "AI/ML" },
            { name: "Next.js", category: "Frontend" },
            { name: "Firebase", category: "Backend" },
            { name: "Pinecone", category: "Database" },
        ],
        deliverable: "Conversational AI bot integrated with client systems",
        pricing: {
            startingPrice: 500,
            priceType: "project",
            description: "Starting at $500"
        },
        timeline: "2–4 weeks",
        featured: true,
        order: 3,
    },
    {
        title: "Cloud Deployment & DevOps Automation",
        slug: "cloud-devops",
        icon: "IconCloud",
        shortDescription:
            "Automate CI/CD pipelines and deploy scalable cloud infrastructure with AWS, GCP, or Azure.",
        fullDescription:
            "Offer cloud-native solutions including containerized deployments, automated pipelines, and serverless computing. Implement monitoring, logging, and scaling strategies to ensure performance and reliability across your environments.",
        features: [
            "Docker & Kubernetes setup",
            "CI/CD with GitHub Actions or Jenkins",
            "Serverless deployments (AWS Lambda, Cloud Run)",
            "Infrastructure as Code (Terraform)",
            "Monitoring and logging setup",
        ],
        technologies: [
            { name: "AWS", category: "Cloud" },
            { name: "Docker", category: "DevOps" },
            { name: "Kubernetes", category: "DevOps" },
            { name: "Terraform", category: "DevOps" },
            { name: "GitHub Actions", category: "Automation" },
        ],
        deliverable: "Fully automated CI/CD pipeline with production-ready infrastructure",
        pricing: {
            startingPrice: 700,
            priceType: "project",
            description: "Starting at $700"
        },
        timeline: "3–6 weeks",
        featured: false,
        order: 4,
    },
    {
        title: "Data Science & Analytics Dashboard",
        slug: "data-analytics-dashboard",
        icon: "IconChartBar",
        shortDescription:
            "Turn your raw data into actionable insights with interactive analytics dashboards.",
        fullDescription:
            "Build end-to-end data analytics dashboards integrating live data pipelines, visualizations, and KPIs. Transform raw data into interactive dashboards for smarter business decisions.",
        features: [
            "Data wrangling and preprocessing",
            "Real-time dashboards",
            "Custom analytics and reports",
            "API & database integration",
            "Interactive visualizations (Chart.js, Recharts, D3.js)",
        ],
        technologies: [
            { name: "Python", category: "Programming" },
            { name: "Pandas", category: "Data Science" },
            { name: "React", category: "Frontend" },
            { name: "Recharts", category: "Visualization" },
            { name: "PostgreSQL", category: "Database" },
        ],
        deliverable: "Interactive analytics dashboard with data pipeline integration",
        pricing: {
            startingPrice: 650,
            priceType: "project",
            description: "Starting at $650"
        },
        timeline: "3–5 weeks",
        featured: false,
        order: 5,
    },
    {
        title: "Mobile App Development",
        slug: "mobile-app-development",
        icon: "IconDeviceMobile",
        shortDescription:
            "Cross-platform mobile apps with smooth performance and modern UI/UX.",
        fullDescription:
            "Develop fast and responsive mobile apps for Android and iOS using React Native and Expo. Focused on delivering engaging UI, smooth animations, and efficient performance.",
        features: [
            "Cross-platform app (iOS + Android)",
            "API integration & authentication",
            "Push notifications & analytics",
            "Offline data sync",
            "App store deployment",
        ],
        technologies: [
            { name: "React Native", category: "Mobile" },
            { name: "Expo", category: "Mobile" },
            { name: "Firebase", category: "Backend" },
            { name: "Redux", category: "State Management" },
            { name: "TailwindCSS", category: "Frontend" },
        ],
        deliverable: "Fully functional cross-platform mobile app",
        pricing: {
            startingPrice: 900,
            priceType: "project",
            description: "Starting at $900"
        },
        timeline: "4–8 weeks",
        featured: false,
        order: 6,
    },
    {
        title: "Portfolio Website Design",
        slug: "portfolio-design",
        icon: "IconLayout",
        shortDescription:
            "Personal or company portfolios that stand out with elegance and interactivity.",
        fullDescription:
            "Design and develop personalized portfolio websites that effectively showcase your brand, work, and achievements. Includes animations, SEO optimization, and smooth navigation.",
        features: [
            "Responsive portfolio layout",
            "Framer Motion animations",
            "SEO & meta optimization",
            "Dark/light theme toggle",
            "Hosting setup (Vercel/Netlify)",
        ],
        technologies: [
            { name: "Next.js", category: "Frontend" },
            { name: "TailwindCSS", category: "Frontend" },
            { name: "Framer Motion", category: "Animations" },
            { name: "Vercel", category: "Deployment" },
            { name: "Shadcn/UI", category: "UI Library" },
        ],
        deliverable: "Deployed responsive portfolio website",
        pricing: {
            startingPrice: 400,
            priceType: "project",
            description: "Starting at $400"
        },
        timeline: "1–3 weeks",
        featured: true,
        order: 7,
    },
    {
        title: "API Development & Integration",
        slug: "api-development-integration",
        icon: "IconApi",
        shortDescription:
            "Robust backend APIs for web and mobile applications.",
        fullDescription:
            "Develop scalable RESTful and GraphQL APIs with complete authentication, caching, and integration support. Perfect for connecting your frontend, mobile, or IoT apps.",
        features: [
            "REST & GraphQL API design",
            "Authentication & rate-limiting",
            "Third-party API integration",
            "Error handling & logging",
            "Scalable backend architecture",
        ],
        technologies: [
            { name: "Express.js", category: "Backend" },
            { name: "Node.js", category: "Backend" },
            { name: "GraphQL", category: "API" },
            { name: "MongoDB", category: "Database" },
            { name: "Redis", category: "Caching" },
        ],
        deliverable: "Secure, documented API ready for integration",
        pricing: {
            startingPrice: 550,
            priceType: "project",
            description: "Starting at $550"
        },
        timeline: "2–4 weeks",
        featured: false,
        order: 8,
    },
    {
        title: "UI/UX Design & Prototyping",
        slug: "ui-ux-design",
        icon: "IconPalette",
        shortDescription:
            "Beautiful and intuitive interfaces designed for conversion and usability.",
        fullDescription:
            "Design user interfaces and experiences that blend beauty, usability, and accessibility. Deliver high-fidelity Figma prototypes, ready for handoff to developers or direct build-out.",
        features: [
            "Wireframing & user flow creation",
            "Figma high-fidelity prototypes",
            "Design systems & reusable components",
            "Accessibility (WCAG) compliance",
            "Usability testing & iteration",
        ],
        technologies: [
            { name: "Figma", category: "Design" },
            { name: "Framer", category: "Design" },
            { name: "Adobe XD", category: "Design" },
            { name: "TailwindCSS", category: "Frontend" },
        ],
        deliverable: "Clickable Figma prototype and UI asset pack",
        pricing: {
            startingPrice: 350,
            priceType: "project",
            description: "Starting at $350"
        },
        timeline: "1–2 weeks",
        featured: false,
        order: 9,
    },
    {
        title: "IoT System Design & Automation",
        slug: "iot-system-design",
        icon: "IconCpu",
        shortDescription:
            "Smart IoT systems integrating hardware sensors with cloud analytics and automation.",
        fullDescription:
            "Develop embedded IoT systems with sensor networks, real-time monitoring dashboards, and automated workflows. Includes hardware integration, data logging, and cloud analytics.",
        features: [
            "IoT device firmware design",
            "Sensor calibration & data capture",
            "MQTT-based communication",
            "Real-time dashboards",
            "Cloud analytics & automation rules",
        ],
        technologies: [
            { name: "Raspberry Pi", category: "Hardware" },
            { name: "Arduino", category: "Hardware" },
            { name: "MQTT", category: "Networking" },
            { name: "Node-RED", category: "Automation" },
            { name: "AWS IoT Core", category: "Cloud" },
        ],
        deliverable: "Working IoT prototype with connected dashboard",
        pricing: {
            startingPrice: 950,
            priceType: "project",
            description: "Starting at $950"
        },
        timeline: "5–8 weeks",
        featured: false,
        order: 10,
    },
];
// map string name -> icon component
const ICON_MAP = {
    IconBrain,
    IconCode,
    IconMessageCircle,
    IconCloud,
    IconChartBar,
    IconDeviceMobile,
    IconLayout,
    IconApi,
    IconPalette,
    IconCpu,
};


export default function ServiceSection() {
    const formatPrice = (pricing) => {
        if (!pricing) return null;

        const { startingPrice, priceType, description } = pricing;

        const priceTypeLabels = {
            hourly: "/hour",
            project: "/project",
            monthly: "/month",
            custom: "",
        };

        if (priceType === "custom") {
            return <span className="text-primary font-semibold">Custom Quote</span>;
        }
        return (
            <div>
                {startingPrice && (
                    <span className="text-2xl font-bold text-primary">
            ${startingPrice.toLocaleString()}
                        {priceType && priceTypeLabels[priceType]}
          </span>
                )}
                {description && (
                    <p className="text-sm text-muted-foreground mt-1">{description}</p>
                )}
            </div>
        );
    };
    // Separate featured and regular services
    const featured = services_data.filter((s) => s.featured);
    const regular = services_data.filter((s) => !s.featured);

  return (
      <section id="services" className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">Services</h2>
                  <p className="text-xl text-muted-foreground">What I can do for you</p>
              </div>

              {/* Featured Services */}
              {featured.length > 0 && (
                  <div className="mb-12">
                      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                          <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                          Featured Services
                      </h3>
                      <div className="@container">
                          <div className="grid grid-cols-1 @3xl:grid-cols-2 gap-8">
                              {featured.map((service) => (
                                  <div
                                      key={service.slug?.current || service.title}
                                      className="@container/card bg-card border-2 border-primary/20 rounded-lg p-6 @lg/card:p-8 hover:shadow-xl transition-all hover:scale-[1.02]"
                                  >
                                      {/*{serviceSection.icon && (*/}
                                      {/*    <div className="relative w-12 h-12 @md/card:w-16 @md/card:h-16 mb-4 @md/card:mb-6">*/}
                                      {/*        <Image*/}
                                      {/*            src={serviceSection.icon}*/}
                                      {/*            alt={serviceSection.title || "Service"}*/}
                                      {/*            fill*/}
                                      {/*            className="object-contain w-[64px] h-[64px]"*/}
                                      {/*        />*/}
                                      {/*    </div>*/}
                                      {/*)}*/}
                                      {service.icon && (
                                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                                              {React.createElement(ICON_MAP[service.icon] || IconSparkles, { className: "w-6 h-6" })}
                                          </div>
                                      )}


                                      <h3 className="text-xl @md/card:text-2xl font-bold mb-3">
                                          {service.title}
                                      </h3>

                                      {service.shortDescription && (
                                          <p className="text-muted-foreground mb-4 text-base @md/card:text-lg">
                                              {service.shortDescription}
                                          </p>
                                      )}

                                      {service.fullDescription && (
                                          <div className="prose prose-sm dark:prose-invert mb-6">
                                              <PortableText   value={[
                                                  {
                                                      _type: 'block',
                                                      children: [{ _type: 'span', text: String(service.fullDescription) }],
                                                  },
                                              ]} />
                                          </div>
                                      )}

                                      {service.features && service.features.length > 0 && (
                                          <div className="mb-6">
                                              <h4 className="font-semibold mb-3 text-sm @md/card:text-base">
                                                  Key Features:
                                              </h4>
                                              <ul className="space-y-2">
                                                  {service.features.map((feature, idx) => (
                                                      <li
                                                          key={`${service.title}-feature-${idx}`}
                                                          className="flex items-start gap-2"
                                                      >
                                                          <IconCheck className="w-4 h-4 @md/card:w-5 @md/card:h-5 text-primary mt-0.5 flex-shrink-0" />
                                                          <span className="text-muted-foreground text-sm @md/card:text-base">
                                {feature}
                              </span>
                                                      </li>
                                                  ))}
                                              </ul>
                                          </div>
                                      )}

                                      <div className="grid grid-cols-1 @xs/card:grid-cols-2 gap-4 mb-6 pt-4 border-t">
                                          {service.pricing && (
                                              <div>
                                                  <p className="text-xs @md/card:text-sm text-muted-foreground mb-1">
                                                      Pricing
                                                  </p>
                                                  {formatPrice(service.pricing)}
                                              </div>
                                          )}
                                          {service.timeline && (
                                              <div>
                                                  <p className="text-xs @md/card:text-sm text-muted-foreground mb-1">
                                                      Timeline
                                                  </p>
                                                  <p className="font-semibold text-sm @md/card:text-base">
                                                      {service.timeline}
                                                  </p>
                                              </div>
                                          )}
                                      </div>

                                      {service.technologies &&
                                          service.technologies.length > 0 && (
                                              <div className="flex flex-wrap gap-2">
                                                  {service.technologies.map((tech, idx) => {
                                                      const techData =
                                                          tech && typeof tech === "object" && "name" in tech
                                                              ? tech
                                                              : null;
                                                      return techData?.name ? (
                                                          <span
                                                              key={`${service.title}-tech-${idx}`}
                                                              className="px-2 py-1 @md/card:px-3 text-xs rounded-full bg-primary/10 text-primary"
                                                          >
                                {techData.name}
                              </span>
                                                      ) : null;
                                                  })}
                                              </div>
                                          )}
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>
              )}

              {/* Regular Services */}
              {regular.length > 0 && (
                  <div>
                      {featured.length > 0 && (
                          <h3 className="text-2xl font-bold mb-6">All Services</h3>
                      )}
                      <div className="@container">
                          <div className="grid grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3 gap-6">
                              {regular.map((service) => (
                                  <div
                                      key={service.slug?.current || service.title}
                                      className="@container/card bg-card border rounded-lg p-6 hover:shadow-lg transition-all hover:scale-105 flex flex-col"
                                  >
                                      {/*{serviceSection.icon && (*/}
                                      {/*    <div className="relative w-10 h-10 @md/card:w-12 @md/card:h-12 mb-4">*/}
                                      {/*        <Image*/}
                                      {/*            src={serviceSection.icon}*/}
                                      {/*            alt={serviceSection.title || "Service"}*/}
                                      {/*            fill*/}
                                      {/*            className="object-contain w-[48px] h-[48px]"*/}
                                      {/*        />*/}
                                      {/*    </div>*/}
                                      {/*)}*/}
                                      {service.icon && (
                                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                                              {React.createElement(ICON_MAP[service.icon] || IconSparkles, { className: "w-6 h-6" })}
                                          </div>
                                      )}


                                      <h3 className="text-lg @md/card:text-xl font-bold mb-2">
                                          {service.title}
                                      </h3>

                                      {service.shortDescription && (
                                          <p className="text-muted-foreground mb-4 text-sm @md/card:text-base flex-1 line-clamp-3">
                                              {service.shortDescription}
                                          </p>
                                      )}

                                      {service.features && service.features.length > 0 && (
                                          <ul className="space-y-1 mb-4">
                                              {service.features.slice(0, 3).map((feature, idx) => (
                                                  <li
                                                      key={`${service.title}-feature-${idx}`}
                                                      className="flex items-start gap-2 text-xs @md/card:text-sm"
                                                  >
                                                      <IconCheck className="w-3.5 h-3.5 @md/card:w-4 @md/card:h-4 text-primary mt-0.5 flex-shrink-0" />
                                                      <span className="text-muted-foreground line-clamp-2">
                              {feature}
                            </span>
                                                  </li>
                                              ))}
                                          </ul>
                                      )}

                                      <div className="pt-4 border-t space-y-2">
                                          {service.pricing && (
                                              <div className="text-xs @md/card:text-sm">
                                                  {formatPrice(service.pricing)}
                                              </div>
                                          )}
                                          {service.timeline && (
                                              <p className="text-xs @md/card:text-sm text-muted-foreground truncate">
                                                  ⏱️ {service.timeline}
                                              </p>
                                          )}
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>
              )}
          </div>
      </section>
  )
}
