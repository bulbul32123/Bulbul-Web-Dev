import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GameTitle() {
    const titleRef = useRef(null);
    const title2Ref = useRef(null);
    const titleFrontRef = useRef(null);
    const titleFront2Ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (titleFront2Ref.current) {
                gsap.fromTo(
                    titleFront2Ref.current,
                    { width: "0%" },
                    {
                        width: "100%",
                        duration: 1.5,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: title2Ref.current,
                            start: "top 105%", 
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (titleFrontRef.current) {
                gsap.fromTo(
                    titleFrontRef.current,
                    { width: "0%" },
                    {
                        width: "110%",
                        duration: 1.5,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: titleRef.current,
                            start: "top 100%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="mb-5">
            <h1
                ref={titleRef}
                className="text-6xl md:text-8xl font-bold uppercase relative flex flex-wrap overflow-hidden"
            >
                <span className="dark:text-white text-black opacity-0">
                    How I cleanup
                </span>

                <span
                    ref={titleFrontRef}
                    className="absolute top-0 left-0 dark:text-white text-black whitespace-nowrap overflow-hidden"
                    style={{ width: "0%" }}
                >
                    How I cleanup
                </span>
            </h1>
            <h1
                ref={title2Ref}
                className="text-6xl md:text-8xl font-bold uppercase relative flex flex-wrap overflow-hidden"
            >
                <span className="dark:text-white text-black opacity-0">
                    my code
                </span>

                <span
                    ref={titleFront2Ref}
                    className="absolute top-0 left-0 dark:text-white text-black whitespace-nowrap overflow-hidden"
                    style={{ width: "0%" }}
                >
                    my code 
                </span>
            </h1>
        </div>
    );
}
