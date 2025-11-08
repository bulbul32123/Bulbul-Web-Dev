import React, { useEffect, useRef, useState } from 'react';
import { FaCaretLeft } from "react-icons/fa6";

import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { Link } from 'react-router-dom';
import { useEasterEgg } from '../context/EasterEggContext';
import useSound from 'use-sound';
import hoverSound from '/sounds/hover.MP3';
import clickSound from '/sounds/click.MP3';

export default function Avatar({ play, scrollToTop }) {
    const [openExpandAvatar, setOpenExpandAvatar] = useState(false);
    const { addEasterEgg } = useEasterEgg();
    const [playClick] = useSound(clickSound, { volume: 0.5, interrupt: true });
    const [playHover] = useSound(hoverSound, { volume: 0.5, interrupt: true });
    const lastScrollY = useRef(0);
    const STATE_MACHINE_NAME = "State Machine 1";

    const { RiveComponent, rive } = useRive({
        src: "/models/avatar.riv",
        stateMachines: STATE_MACHINE_NAME,
        autoplay: true,
    });

    const pokeLeft = useStateMachineInput(rive, STATE_MACHINE_NAME, "poked left eye");

    useEffect(() => {
        if (!pokeLeft) return;

        const canvas = document.querySelector("canvas");
        if (!canvas) return;

        const handleMouseEnter = () => {
            pokeLeft.value = true;
        };

        const handleMouseLeave = () => {
            pokeLeft.value = false;
        };

        canvas.addEventListener("mouseenter", handleMouseEnter);
        canvas.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            canvas.removeEventListener("mouseenter", handleMouseEnter);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [pokeLeft]);
    const handleAvatarExpand = () => {
        addEasterEgg('egg-avatar-detail', 'Exploring the Avatar');
        play()
        setOpenExpandAvatar((pre) => !pre)
    }

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 100 && currentScrollY > lastScrollY.current) {
                setOpenExpandAvatar(false);
            }
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`${openExpandAvatar ? "w-[300px] h-[300px]" : "w-[70px] h-[70px]"}  fixed top-5 left-5 z-[500] avatar transition-all duration-200 ease-in-out rounded-4xl`}>
            <div className="relative expand-icon" onMouseEnter={playHover} onClick={playClick}>
                <div className="-rotate-45 relative cursor-pointer " onClick={handleAvatarExpand}>
                    <span className={` absolute -top-8 ${openExpandAvatar && "-rotate-180"} left-0`}><FaCaretLeft size={openExpandAvatar ? 18 : 13} /></span>
                    <span className={`absolute -top-8  ${!openExpandAvatar ? "rotate-180 left-1.5" : "rotate-0 left-3.5"}  `}><FaCaretLeft size={openExpandAvatar ? 18 : 13} /></span>
                </div>
            </div>
            <Link to={'/'} onClick={() => scrollToTop()}>
                <RiveComponent />
            </Link>
        </div >
    );
}
