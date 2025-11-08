import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ServiceTitle({ text, className,textSize }) {
    const titleRef = useRef(null);
    const titleFrontRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (titleFrontRef.current) {
                gsap.fromTo(
                    titleFrontRef.current,
                    { width: "0%" },
                    {
                        width: "100%",
                        duration: 1.5,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: titleRef.current,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="mb-10 pl-5">
            <h1
                ref={titleRef}
                className={`${textSize} font-bold uppercase relative inline-block overflow-hidden`}
            >
                <span className={`text-gray-600 dark:text-gray-700 opacity-0`}>
                    {text}
                </span>

                <span
                    ref={titleFrontRef}
                    className={`absolute top-0 left-0 whitespace-nowrap overflow-hidden ${className}`}
                    style={{ width: "0%" }}
                >
                    {text}
                </span>
            </h1>
        </div>
    );
}
