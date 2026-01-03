'use client'
import Image from "next/image";
import Link from "next/link";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import HeroIdDropdown from "@/app/(admin)/admin/hero/heroIdDropdown";
import { getHeroData} from "@/apiData/api";
import React, {useEffect, useState} from "react";

/* ---------------- Component ---------------- */

export default function HeroComponent() {
    const [hero, setHero] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        // Call the API function directly
        getHeroData()
            .then((data) => {
                // Logic after success
                setHero(data);
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
        <section
            id="home"
            className="relative max-h-screen flex items-center justify-center px-6 py-20 overflow-hidden"
        >
            <HeroIdDropdown heroId={hero.heroId} />
            <BackgroundRippleEffect />

            <div className="relative z-10 container mx-auto max-w-6xl">
                <div className="@container">
                    <div className="grid grid-cols-1 @3xl:grid-cols-2 gap-8 @lg:gap-12 items-center">

                        {/* ---------- Text Content ---------- */}
                        <div className="@container/hero space-y-4">
                            <h1 className="text-4xl @md/hero:text-5xl @lg/hero:text-7xl font-bold tracking-tight">
                                <span className="text-primary">{hero.fullName}</span>
                            </h1>

                            <LayoutTextFlip
                                text="I build "
                                words={hero.flipText}
                                duration={3000}
                                className="text-xl @md/hero:text-2xl @lg/hero:text-3xl text-muted-foreground"
                            />

                            <p className="text-base @md/hero:text-lg text-muted-foreground leading-relaxed">
                                {hero.bio}
                            </p>

                            {/* ---------- Social Links ---------- */}
                            <div className="flex flex-wrap gap-3 pt-4">
                                {hero.socialLinks?.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        target="_blank"
                                        className="px-4 py-2 rounded-lg border hover:bg-accent transition-colors text-sm"
                                    >
                                        {link.platform}
                                    </Link>
                                ))}
                            </div>

                            {/* ---------- Meta Info ---------- */}
                            <div className="flex flex-wrap gap-4 pt-4 text-xs text-muted-foreground">
                                <div className="flex gap-2 items-center">
                                    <span>✉️</span>
                                    <span className="truncate">{hero.email}</span>
                                </div>

                                <div className="flex gap-2 items-center">
                                    <span>📍</span>
                                    <span className="truncate">{hero.location}</span>
                                </div>

                                <div className="flex gap-2 items-center">
                                    <span>✅</span>
                                    <span className="truncate">Open</span>
                                </div>
                            </div>
                        </div>

                        {/* ---------- Image ---------- */}
                        <div className="relative aspect-square rounded-2xl overflow-hidden border-4 border-primary/20 group w-full">
                            <Image
                                src={hero.imageUrl}
                                alt={hero.fullName}
                                width={600}
                                height={600}
                                priority
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                            <div className="absolute top-4 right-4 flex items-center gap-2 backdrop-blur-sm px-3 py-1 rounded-full bg-black/60">
                                <div className="relative">
                                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                                    <div className="absolute inset-0 w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
                                </div>
                                <span className="text-xs font-medium text-white">
                  Available for work
                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
