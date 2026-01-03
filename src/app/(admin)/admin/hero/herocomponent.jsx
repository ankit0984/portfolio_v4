// 'use client'
// import {BackgroundRippleEffect} from "@/components/ui/background-ripple-effect";
// import {LayoutTextFlip} from "@/components/ui/layout-text-flip";
// import Link from "next/link";
// import Image from "next/image";
// import * as React from "react";
// import {useEffect, useState} from "react";
// import axios from "axios";
//
// export default function Herocomponent(){
//
//     const [heroData, setHeroData] = useState([])
//     useEffect(()=>{
//         const fetchHeroData = async () => {
//             try {
//                 const res=await axios.get(`/api/portfolio/hero/getSection?heroId=369502fe-08ac-41e3-8103-dd30fcefcd14`)
//                 console.log(res.data)
//             }
//             catch(err){
//                 console.log(err)
//             }
//         }
//         fetchHeroData()
//     },[])
//
//
//     return (
//         <section
//             id='home'
//             className='relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden'
//         >
//             <BackgroundRippleEffect />
//             <div className='relative z-10 container mx-auto max-w-6xl'>
//                 <div className='@container'>
//                     <div className='grid grid-cols-1 @3xl:grid-cols-2 gap-8 @lg:gap-12 items-center'>
//                         {/* text content */}
//                         <div className='@container/hero @lg/hero:space-y-2 @md/hero:space-y-2'>
//                             <h1 className='text-4xl @md/hero:text-5xl @lg/hero:text-7xl font-bold tracking-tight'>
//                                 <span className='text-primary'>Ankit Kumar</span>
//                             </h1>
//                             <LayoutTextFlip
//                                 text='I build '
//                                 words={[
//                                     "scalable product",
//                                     "amazing products",
//                                     "AI solutions",
//                                     "cloud Infra",
//                                 ]}
//                                 duration={3000}
//                                 className='text-xl @md/hero:text-2xl @lg/hero:text-3xl text-muted-foreground'
//                             />
//                             <p className='text-base @md/hero:text-lg text-muted-foreground leading-relaxed'>
//                                 I’m an AI Software Development Engineer passionate about
//                                 building intelligent systems that bridge the gap between machine
//                                 learning and real-world applications, With a strong foundation
//                                 in Python, Node.js, and modern AI frameworks.
//                             </p>
//                             {/* social icons */}
//                             <div className='flex flex-wrap gap-3 @md/hero:gap-4 pt-4'>
//                                 <Link
//                                     href='https://www.linkedin.com/in/ankit-kumar-7419a5232/'
//                                     target='_blank'
//                                     className='px-4 py-2 @md/hero:px-6 @md/hero:py-3 rounded-lg border hover:bg-accent transition-colors text-sm @md/hero:text-base'
//                                 >
//                                     Github
//                                 </Link>
//                                 <Link
//                                     href='https://www.linkedin.com/in/ankit-kumar-7419a5232/'
//                                     target='_blank'
//                                     className='px-4 py-2 @md/hero:px-6 @md/hero:py-3 rounded-lg border hover:bg-accent transition-colors text-sm @md/hero:text-base'
//                                 >
//                                     Linkedin
//                                 </Link>
//                                 <Link
//                                     href='https://www.linkedin.com/in/ankit-kumar-7419a5232/'
//                                     target='_blank'
//                                     className='px-4 py-2 @md/hero:px-6 @md/hero:py-3 rounded-lg border hover:bg-accent transition-colors text-sm @md/hero:text-base'
//                                 >
//                                     Leetcode
//                                 </Link>
//                             </div>
//                             <div className='flex flex-wrap gap-4 pt-4 text-xs text-muted-foreground'>
//                                 <div className='flex gap-2 items-center'>
//                                     {/* <span><MailIcon/></span> */}
//                                     <span>✉️</span>
//                                     <span className='truncate'>
// 										en.ankitkumarpandey@gmail.com
// 									</span>
//                                 </div>
//                                 <div className='flex gap-2 items-center'>
//                                     {/* <span><MailIcon/></span> */}
//                                     <span>📍</span>
//                                     <span className='truncate'>Delhi, India(Remote)</span>
//                                 </div>
//                                 <div className='flex gap-2 items-center'>
//                                     <span>✅</span>
//                                     <span className='truncate'>Open</span>
//                                 </div>
//                             </div>
//                         </div>
//                         {/* image content */}
//                         <div className='relative aspect-square rounded-2xl overflow-hidden border-4 border-primary/20 block group w-full'>
//                             <Image
//                                 src={`/professional image.png`}
//                                 alt='img'
//                                 width={600}
//                                 height={600}
//                                 priority
//                                 className='object-cover transition-transform duration-300 group-hover:scale-105'
//                             />
//                             <div className='absolute top-4 right-4 flex items-center gap-2 backdrop-blur-sm px-3 py-1 5 rounded-full bg-black/60'>
//                                 <div className='relative'>
//                                     <div className='w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse' />
//                                     <div className='absolute inset-0 w-2.5 h-2.5 bg-green-500 rounded-full animate-ping' />
//                                 </div>
//                                 <span className='text-xs font-medium text-white'>
// 									Available for work
// 								</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>)
// }


import Image from "next/image";
import Link from "next/link";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import HeroIdDropdown from "@/app/(admin)/admin/hero/heroIdDropdown";
import {getHeroData} from "@/apiData/api";

/* ---------------- Component ---------------- */

export default async function HeroComponent() {
    const hero = await getHeroData();

    if (!hero) return null;

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
