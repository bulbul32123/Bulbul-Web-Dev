import React, { useRef, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-scroll";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useEasterEgg } from "../context/EasterEggContext";
import useSound from "use-sound";
import eggSound from '/sounds/succes.MP3';
import Celebration from "./Celebration";
import EasterEggCheatModal from "./EasterEggCheatModal";
import { useLockBodyScroll } from "./useLockBodyScroll";
import EasterEggLocationsModal from "./EasterEggLocationsModal";

const menuLinks = [
    { to: "home", label: "HOME" },
    { to: "work", label: "WORK" },
    { to: "about", label: "ABOUT" },
    { to: "footer", label: "CONTACT" },
    { to: "skills", label: "SKILLS" },
];

const Menu = ({ setIsMenuOpen, isMenuOpen, handleMenuOpen }) => {
    const { addEasterEgg } = useEasterEgg();
    const [show, setShow] = useState(false);
    const [showCheatModal, setShowCheatModal] = useState(false);
    const [showLocationsModal, setShowLocationsModal] = useState(false);

    const [play] = useSound(eggSound, { volume: 0.6, interrupt: true });
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


    const cheatCodes = [
        { id: 1, title: "The Name Game", description: "Click Bulbul 5 times.", hint: "Top left corner" },
        { id: 2, title: "Theme Hunter", description: "Click theme modal 5 times.", hint: "Theme switcher" },
        { id: 3, title: "Interface Master", description: "Click 'Interfaces'.", hint: "Hero glow" },
        { id: 4, title: "Resume Secret", description: "Click '--' in hero.", hint: "The dash" },
        { id: 5, title: "Music Lover", description: "Click the music icon.", hint: "Melody" },
        { id: 6, title: "Avatar Expansion", description: "Click avatar.", hint: "Profile picture" },
        { id: 7, title: "Game Master", description: "Beat the game.", hint: "Skill time" },
        { id: 8, title: "Hidden Star", description: "Find the star in menu.", hint: "You found it" },
    ];
    const handleHiddenEasterEggs = () => {
        if (show) {
            showLocationsModal(true);
        } else {
            setShow(true);
            play();
            addEasterEgg("hidden-cheat-code", `You found the hidden cheat code`);

            setTimeout(() => {
                setShowCheatModal(true);
            }, 2000);
        }
    };

    const handleUnlockCodes = () => {
        console.log("User chose to unlock cheat codes!");
    };

    return (
        <>
            <Celebration show={show} />
            {/* Cheat Codes Modal */}
            <EasterEggCheatModal
                isOpen={showCheatModal}
                onClose={() => setShowCheatModal(false)}
                onUnlock={handleUnlockCodes} // unlock triggers locations modal
            />

            {/* Locations Modal */}
            <EasterEggLocationsModal
                isOpen={showLocationsModal}
                locations={cheatCodes}
                onClose={() => setShowLocationsModal(false)}
            />

            <div className="menu-container" ref={container}>
                <div className="menu-overlay">
                    <div className="menu-overlay-bar">
                    </div>

                    <div className="menu-content">
                        <div className="menu-links">
                            {menuLinks.map((link, index) => (
                                <div className="menu-link-item" key={index}>
                                    <Link
                                        to={link.to}
                                        smooth={true}
                                        duration={500}
                                        onClick={handleMenuOpen}
                                        className="menu-link-wrapper"
                                    >
                                        <div
                                            className="menu-link-item-holder"
                                            data-text={link.label}
                                        >
                                            <span className="menu-link-text">{link.label}</span>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                            <span
                                className="absolute top-[50%] right-[30%] cursor-pointer hover:scale-125 transition-transform"
                                onClick={handleHiddenEasterEggs}
                            >
                                <FaStar size={10} className="text-black hover:text-yellow-500 transition-colors" />
                            </span>
                        </div>

                        <div className="menu-footer">
                            <div className="menu-footer-left">
                            </div>

                            <div className="menu-info">
                                <div className="menu-info-col">
                                    <a href="https://github.com/bulbul32123" className="menu-social-link">GITHUB ↗</a>
                                    <a href="https://www.linkedin.com/in/bulbulwebdev/" className="menu-social-link">LINKEDIN ↗</a>
                                    <a href="https://www.facebook.com/profile.php?id=61550563621219" className="menu-social-link">FACEBOOK ↗</a>
                                    <a href="https://x.com/BulbulIslam369" className="menu-social-link">X (Twitter)↗</a>
                                </div>
                                <div className="menu-info-col">
                                    <p>Email</p>
                                    <p>mdbulbulislamtheprogrammer@gmail.com</p>
                                </div>
                            </div>

                            <div className="menu-footer-right">
                                <p>VIEW SHOWREEL</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Menu;


//  Model














src/components/SidebarLayout.jsx
src/components/useLockBodyScroll.jsx
src/context/EasterEggContext.jsx
src/context/TransitionContext.jsx
src/esterEggs/SpaceGame.jsx


src/index.css
src/pages/Home.jsx
src/pages/Projects.jsx
src/components/EasterEggLocationsModal.jsx
src/components/SoundModal.jsx

src/context/SoundContext.jsx