import React, { useRef, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useEasterEgg } from "../context/EasterEggContext";
import useSound from "use-sound";
import hoverSound from '/sounds/hover.MP3';
import hoverSound2 from '/sounds/hover2.MP3';
import hoverSound3 from '/sounds/click2.MP3';
import eggSound from '/sounds/succes.MP3';
import Celebration from "./Celebration";
import EasterEggCheatModal from "./EasterEggCheatModal";
import { useLockBodyScroll } from "./useLockBodyScroll";
import Button from "./Button";
import { IoClose } from "react-icons/io5";
import { HiMenuAlt4 } from "react-icons/hi";

const menuLinks = [
    { to: "home", label: "HOME" },
    { to: "about", label: "ABOUT" },
    { to: "work", label: "WORKS" },
    { to: "skills", label: "SKILLS" },
    { to: "footer", label: "CONTACT" },
];

const Menu = ({ isMenuOpen, handleMenuOpen }) => {
    const [copied, setCopied] = useState(false);
    const { addEasterEgg } = useEasterEgg();
    const [show, setShow] = useState(false);
    const [playHover] = useSound(hoverSound, { volume: 0.4, interrupt: true, soundEnabled: true, });
    const [playHover2] = useSound(hoverSound2, { volume: 0.4, interrupt: true, soundEnabled: true, });
    const [playHover3] = useSound(hoverSound3, { volume: 0.3, interrupt: true, soundEnabled: true, });
    const [play] = useSound(eggSound, { volume: 0.4, interrupt: true });
    const [showCheatModal, setShowCheatModal] = useState(false);
    const [pendingScroll, setPendingScroll] = useState(null);

    const container = useRef();
    const tl = useRef();

    useLockBodyScroll(isMenuOpen || showCheatModal);

    useGSAP(() => {
        gsap.set(".menu-overlay", {
            transformOrigin: "top center",
            scaleY: 0,
            display: "flex",
            pointerEvents: "none",
        });

        gsap.set(".menu-link-item-holder", { y: 75, autoAlpha: 0 });
        gsap.set(".menu-info, .menu-footer-left", { autoAlpha: 0 });

        tl.current = gsap.timeline({
            paused: true
        })
            .to(".menu-overlay", {
                duration: 0.6,
                scaleY: 1,
                ease: "power4.inOut",
                pointerEvents: "auto",
            })
            .to(".menu-link-item-holder", {
                duration: 0.7,
                y: 0,
                autoAlpha: 1,
                stagger: 0.08,
                ease: "power3.out",
            }, "-=0.2")
            .to(".menu-info, .menu-footer-left", {
                duration: 0.5,
                autoAlpha: 1,
                ease: "power2.out",
            }, "-=0.4");
    }, { scope: container });

    useEffect(() => {
        if (!tl.current) return;

        if (isMenuOpen) {
            tl.current.play();
        } else {
            tl.current.reverse();
        }
    }, [isMenuOpen]);

    // Handle scroll after menu closes
    useEffect(() => {
        if (!isMenuOpen && pendingScroll) {
            // Wait a bit more to ensure menu is fully closed and DOM is settled
            const timer = setTimeout(() => {
                const element = document.getElementById(pendingScroll);
                if (element) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'nearest'
                    });
                }
                setPendingScroll(null);
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [isMenuOpen, pendingScroll]);

    const handleLinkClick = (to) => {
        setPendingScroll(to);
        handleMenuOpen(); // This will close the menu
    };

    const handleHiddenEasterEggs = () => {
        if (show) {
            setShowCheatModal(true);
        } else {
            play();
            setShow(true);
            addEasterEgg("hidden-cheat-code", `You found the hidden cheat code`);
            setTimeout(() => {
                setShowCheatModal(true);
            }, 2000);
        }
    };

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('mdbulbulislamtheprogrammer@gmail.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <>
            <Celebration show={show} />
            <EasterEggCheatModal
                isOpen={showCheatModal}
                onClose={() => setShowCheatModal(false)}
            />

            <div className="menu-container overflow-y-hidden" ref={container}>
                <div className="menu-overlay relative">
                    <div className="menu-overlay-bar">
                    </div>

                    <div className="flex items-center text-white cursor-pointer z-[122121212] absolute top-8 right-5">
                        <Button>
                            <span className='p-3 rounded-full cursor-pointer bg-gray-200 text-black hover:bg-white hover:text-black' onMouseEnter={playHover} onClick={handleMenuOpen} >
                                {isMenuOpen ? <div className="menu-close-icon">
                                    <IoClose size={30} />
                                </div> : <HiMenuAlt4 size={30} />}
                            </span>
                        </Button>
                    </div>
                    <div className="menu-content">
                        <div className="menu-links">
                            {menuLinks.map((link, index) => (
                                <div className="menu-link-item Span" key={index}>
                                    <div
                                        className="menu-link-wrapper cursor-pointer"
                                        onClick={() => handleLinkClick(link.to)}
                                    >
                                        <div
                                            className="menu-link-item-holder"
                                            data-text={link.label}
                                            onMouseEnter={playHover2}
                                        >
                                            <span className="menu-link-text">{link.label}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <span
                                className="absolute top-[50%] right-[30%] cursor-pointer hover:scale-125 transition-transform"
                                onClick={handleHiddenEasterEggs}
                            >
                                <FaStar size={10} className="text-black" />
                            </span>
                        </div>

                        <div className="menu-footer">
                            <div className="menu-footer-left">
                            </div>

                            <div className="menu-info">
                                <div className="menu-info-col para">
                                    <a onMouseEnter={playHover3} target="_blank" href="https://github.com/bulbul32123" className="menu-social-link">GITHUB ↗</a>
                                    <a onMouseEnter={playHover3} target="_blank" href="https://www.linkedin.com/in/bulbulwebdev/" className="menu-social-link">LINKEDIN ↗</a>
                                    <a onMouseEnter={playHover3} target="_blank" href="https://www.facebook.com/profile.php?id=61550563621219" className="menu-social-link">FACEBOOK ↗</a>
                                    <a onMouseEnter={playHover3} target="_blank" href="https://x.com/BulbulIslam369" className="menu-social-link">X (Twitter) ↗</a>
                                </div>
                                <div className="menu-info-col">
                                    <p>Email</p>
                                    <div className="cursor-pointer relative flex gap-2 flex-wrap text-black" onClick={handleCopyEmail}>mdbulbulislamtheprogrammer@gmail.com
                                        {copied && <div className="absolute -top-6 left-[45%] py-1 px-1.5 rounded-sm text-xs font-light bg-black text-white">Copied</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Menu;