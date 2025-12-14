import React from "react";

export default function AboutSection() {
	return (
		<section id="about" className='py-20 px-6'>
			<div className='container mx-auto max-w-4xl'>
				<div className='text-center mb-12'>
					<h2 className='text-4xl md:text-5xl font-bold mb-4'>About Me</h2>
					<p className='text-xl text-muted-foreground'>
						Full-Stack Developer & AI Enthusiast
					</p>
				</div>
				<div className='prose prose-lg dark:prose-invert max-w-none'>
					<p className='text-muted-foreground leading-relaxed mb-4'>
						Hi! I'm a passionate full-stack developer, crafting elegant
						solutions to complex problems. My journey in tech began with a
						facination for how things work, Which led me to pursue Computer
						Science and eventually specialize in web development and artificial
						intellignce.
					</p>

					<p className='text-muted-foreground leading-relaxed mb-4'>
						<span className='text-foreground font-bold'>My Approach:</span> I
						believe in writing clean, maintainable code that scales. I'm a strong
                        advocate for test-driven development and continuous integration. I thrive in collaborative environments, where I can learn and grow alongside a team. Also i use youtube or other platforms like developers community, documentaion to learn new technology and also follow the trends.
					</p>

					<p className='text-muted-foreground leading-relaxed mb-4'>
						<span className='text-foreground font-bold'>What I Do: </span>I
						specialize in building full-stack applications using React, Next.js,
						and nodejs with expertise in modern JavaScript frameworks and
						server-side technologies. Recently, I've been focusing on
						integrating AI capabilities into web applications, leveraging
						technologies like google gemini models. Additionally, I've been
						diving deep into Generative AI development with Python, utilizing
						frameworks like LangChain for building sophisticated AI workflows,
						and implementing vector databases such as Pinecone and AstraDB for
						semantic search and retrieval-augmented generation (RAG) systems.
						I'm also experienced in cloud infrasturcture particularly in AWS
						services including EC2, Lambda, S3.
					</p>

					<p className='text-muted-foreground leading-relaxed'>
						When I'm not coding, you'll find me experimenting with new
						frameworks, contributing to open source projects, writing technical
						blogs, or planning my next big project. I'm passionate about sharing
						knowledge with the developer community and believe that the best way
						to learn is by building real-world applications. I'm always excited
						to collaborate on innovative projects and take on new challenges.
					</p>
				</div>
			</div>
		</section>
	);
}
