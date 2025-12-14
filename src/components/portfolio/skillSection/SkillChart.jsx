'use client'
import React from "react";
import {
    Bar,
    BarChart,
    Cell,
    LabelList,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from "recharts";
import usePersistedSkillColors from "../../../hooks/usePersistedSkillColors.js";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/* ---------- data: keep this central or import from a data file ---------- */
const SKILLS = [
    { name: "Next.js", category: "frontend", proficiency: 95 },
    { name: "React.js", category: "frontend", proficiency: 90 },
    { name: "JavaScript", category: "frontend", proficiency: 92 },
    { name: "Node.js", category: "backend", proficiency: 88 },
    { name: "Express", category: "backend", proficiency: 85 },
    { name: "MongoDB", category: "backend", proficiency: 82 },
    { name: "MySQL", category: "backend", proficiency: 80 },
    { name: "Jenkins", category: "devops", proficiency: 78 },
    { name: "Docker", category: "devops", proficiency: 85 },
    { name: "Linux", category: "devops", proficiency: 88 },
    { name: "AWS", category: "devops", proficiency: 82 },
    { name: "Python", category: "ai", proficiency: 87 },
    { name: "LangChain", category: "ai", proficiency: 83 },
    { name: "Pinecone", category: "ai", proficiency: 80 },
    { name: "RAG", category: "ai", proficiency: 82 },
    { name: "Next.js", category: "frontend", proficiency: 95 },
    { name: "React.js", category: "frontend", proficiency: 90 },
    { name: "JavaScript", category: "frontend", proficiency: 92 },
    { name: "Node.js", category: "backend", proficiency: 88 },
    { name: "Express", category: "backend", proficiency: 85 },
    { name: "MongoDB", category: "backend", proficiency: 82 },
    { name: "MySQL", category: "backend", proficiency: 80 },
    { name: "Jenkins", category: "devops", proficiency: 78 },
    { name: "Docker", category: "devops", proficiency: 85 },
    { name: "Linux", category: "devops", proficiency: 88 },
    { name: "AWS", category: "devops", proficiency: 82 },
    { name: "Python", category: "ai", proficiency: 87 },
    { name: "LangChain", category: "ai", proficiency: 83 },
    { name: "Pinecone", category: "ai", proficiency: 80 },
    { name: "RAG", category: "ai", proficiency: 82 },
];

const CATEGORIES = [
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "devops", label: "DevOps" },
    { id: "ai", label: "AI/ML" },
];

/* compute groupedSkills inside component so it's always defined on first render */
function buildGroupedSkills(skills = [], categories = []) {
    const grouped = {};
    categories.forEach((c) => {
        grouped[c.id] = skills.filter((s) => s.category === c.id);
    });
    return grouped;
}

const chartConfig = {
    level: { label: "Skill Level", color: "hsl(var(--chart-1))" },
    default: { color: "hsl(var(--primary))" },
};

export default function SkillConfig({ version = "v1" }) {
    const groupedSkills = buildGroupedSkills(SKILLS, CATEGORIES);

    // hook returns null while loading or if groupedSkills empty
    const colorsByCategory = usePersistedSkillColors(groupedSkills, {
        version,
        validateLength: true,
    });

    if (!colorsByCategory) {
        // skeleton / loader to avoid crash
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CATEGORIES.map((category) => (
                    <Card key={category.id}>
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">{category.label}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[260px] sm:h-[300px] md:h-[320px] w-full flex items-center justify-center">
                                <div className="text-sm text-muted-foreground">Loading chart…</div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {CATEGORIES.map((category, index) => (
            <Card key={index}>
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                        {category.label}
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <ChartContainer
                        config={chartConfig}
                        className="h-[260px] sm:h-[300px] md:h-[320px] w-full"
                    >
                        <ResponsiveContainer>
                            <BarChart
                                accessibilityLayer={true}
                                data={groupedSkills[category.id]}
                                layout="vertical"
                                margin={{ left: 0, right: 28, top: 5, bottom: 5 }}
                            >
                                <XAxis type="number" domain={[0, 100]} hide />
                                <YAxis
                                    type="category"
                                    dataKey="name"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    width={85}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={
                                        <ChartTooltipContent
                                            indicator="line"
                                            labelFormatter={(value) => value}
                                        />
                                    }
                                />
                                <Bar dataKey="proficiency" radius={[6, 6, 6, 6]} barSize={28}>
                                    {(groupedSkills[category.id] || []).map((entry, index) => {
                                        const fill = (colorsByCategory[category.id] || [])[index] || "hsl(0, 0%, 60%)";
                                        return <Cell key={`cell-${category.id}-${index}`} fill={fill} />;
                                    })}
                                    <LabelList
                                        dataKey="proficiency"
                                        position="right"
                                        offset={4}
                                        className="fill-foreground text-[10px] font-medium"
                                        formatter={(value) => `${value}%`}
                                    />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
        ))}
    </div>
    );
}
