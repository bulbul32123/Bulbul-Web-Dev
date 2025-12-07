import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';


gsap.registerPlugin(ScrollTrigger);

export default function Card({ data }) {
    const { title, link, imgSrc, stacks, status } = data;

    const cardRef = useRef(null);
    const textRef = useRef(null);
    const imgRef = useRef(null);
    const stackRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: cardRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            }
        });

        tl.from(textRef.current, {
            x: -100,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        })
            .from(imgRef.current, {
                y: 100,
                opacity: 0,
                duration: 1.2,
                ease: 'power2.out'
            }, '-=0.8')
            .from(stackRef.current, {
                x: -50,
                opacity: 0,
                duration: 1,
                ease: 'power2.out'
            }, '-=0.6');

    }, []);

    return (
        <div ref={cardRef} className="w-full group flex flex-col items-center border-x border-b border-gray-300 dark:border-white/20 px-4 py-10 lg:py-20">
            <Link to={link}>
                <div className="overflow-hidden">
                    <div ref={textRef}>
                        <h2 className="mb-2 text-2xl font-bold uppercase">{title}</h2>
                    </div>
                </div>

                <div className="overflow-hidden block">
                    <div ref={imgRef}>
                        <div className="relative overflow-hidden scale-100 w-full">
                            <img
                                alt={title}
                                loading="lazy"
                                width="1500"
                                height="900"
                                decoding="async"
                                className="group transform object-cover opacity-100 transition duration-700 ease-out hover:scale-[97%] group-hover:opacity-100 lg:opacity-80"
                                src={imgSrc}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-between space-x-2">
                    <div>
                        <div className="tech-stack mt-2" ref={stackRef}>
                            <p className="text-[0.9rem] text-[#282829] dark:text-[#ccc] mb-[15px] font-medium ">Tech Stack</p>
                            <div className="flex gap-[5px]">
                                {stacks.map((stack) => {
                                    const IconComponent = stack.icon;
                                    return (
                                        <span title={stack.name} className="sm:w-10 sm:h-10 h-7 w-7  bg-[#f5f4f5] dark:bg-[#2a2a2a] rounded-[10px] flex items-center justify-center  transition-all duration-300 ease-in-out overflow-hidden relative" key={stack.name}>
                                            <IconComponent />
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="overflow-hidden mt-2">
                        <div className="flex gap-1">
                            {status.map((sta, idx) => (
                                <p key={idx} className='max-sm:text-sm'>{sta}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
