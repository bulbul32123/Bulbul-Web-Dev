import React, { useState } from 'react';
import gsap from 'gsap';
import TextReveal from '../components/animations/TextReveal';
import Celebration from '../components/Celebration';
export default function ResumeButton({ dashRef, playClick, setIsResumeVisible, isResumeVisible, play, addEasterEgg }) {
    const [show, setShow] = useState(false);
    const handleClick = () => {
        const tl = gsap.timeline();

        if (!isResumeVisible) {
            tl.to(dashRef.current, {
                scale: 1,
                duration: 0.2,
                ease: "power2.out",
            }).to(dashRef.current, {
                scale: 0.6,
                duration: 0.3,
                ease: "power2.out",
            }).to(dashRef.current, {
                text: "Resume",
                scale: 5,
                duration: 0.4,
                ease: "power2.out",
            }, "-=0.1");

            setIsResumeVisible(true);
            setShow(true)
            play()
            addEasterEgg('egg-resume', 'Just found the Hidden Resume');
        } else {
            window.open("/Bulbul'sResume.pdf", "_blank");

            tl.to(dashRef.current, {
                scale: 0.6,
                duration: 0.2,
                ease: "power2.out",
            }).to(dashRef.current, {
                text: " ",
                scale: 1,
                duration: 0.3,
                color: "#ffffff",
                ease: "power2.out",
            });

            setIsResumeVisible(false);
        }
    };

    return (
        <>
            <Celebration show={show} />
            <div>
                <span className='z-[300]'>
                    <TextReveal allowOverflow>
                        <span
                            ref={dashRef}
                            onClick={() => { handleClick(); playClick(); }}
                            className="inline-flex items-center justify-center transition-all duration-200 align-middle bg-[#282829] dark:bg-white !text-[#caf291] dark:!text-black rounded-full cursor-pointer"
                            style={{
                                width: '4rem',
                                height: '1.4rem',
                                fontSize: '0.65rem',
                                textAlign: 'center',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                display: 'inline-flex',
                                verticalAlign: 'middle',
                            }}
                        ></span>
                    </TextReveal>
                </span>
            </div>
        </>
    )
}
