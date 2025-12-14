'use client'
import React, {useEffect, useState} from "react";
import axios from "axios";

export default function Page() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState([])

    useEffect(() => {
        axios
            .get("/api/portfolio/about/getAbout")
            .then((res) => {
                console.log(res.data);
                setTitle(res.data.data.title);
                setDescription(res.data.data.description);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <section id="about" className='py-20 px-6'>
            <div className='container mx-auto max-w-4xl'>
                <div className='text-center mb-12'>
                    <h2 className='text-4xl md:text-5xl font-bold mb-4'>About Me</h2>

                    <p className='text-xl text-muted-foreground'>
                        {title}
                    </p>
                </div>
                <div className='prose prose-lg dark:prose-invert max-w-none'>
                    <p className='text-muted-foreground leading-relaxed mb-4'>
                        {description[0]}
                    </p>

                    <p className='text-muted-foreground leading-relaxed mb-4'>
                        <span className='text-foreground font-bold'>My Approach:{" "}</span>
                        {description[1]}
                    </p>

                    <p className='text-muted-foreground leading-relaxed mb-4'>
                        <span className='text-foreground font-bold'>What I Do: </span>
                        {description[2]}

                    </p>

                    <p className='text-muted-foreground leading-relaxed'>
                        {description[3]}
                    </p>
                </div>
            </div>
        </section>
    );
}
