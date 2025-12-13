import React, { useRef, useEffect } from 'react';
import { projectData } from '../utils/data';
import Card from './Card';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
    const titleRef = useRef(null);
    const titleFrontRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (titleFrontRef.current) {
                gsap.fromTo(
                    titleFrontRef.current,
                    { width: '0%' },
                    {
                        width: '100%',
                        duration: 1.5,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: titleRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <section className="py-32" id={'work'}>
            <div className="pl-7 mb-20">
                <h2
                    ref={titleRef}
                    className="text-6xl
                     md:text-9xl font-bold uppercase relative inline-block overflow-hidden"
                >
                    <span className="text-gray-600 dark:text-gray-700 opacity-0">
                        Works
                    </span>

                    <span
                        ref={titleFrontRef}
                        className="absolute top-0 left-0 text-black dark:text-white whitespace-nowrap overflow-hidden"
                        style={{ width: '0%' }}
                    >
                        Works
                    </span>
                </h2>
            </div>

            <div className="flex flex-col border border-gray-300 dark:border-white/20">
                {projectData.map((project, index) => (
                    <Card
                        key={project.id}
                        data={project}
                        reverse={index % 2 !== 0}
                    />
                ))}
            </div>
        </section>
    );
}
