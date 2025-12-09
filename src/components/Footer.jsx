import React, { useState } from 'react';
import { Copy, ArrowUp, CopyCheck } from 'lucide-react';
import { FaSquareFacebook } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { motion, AnimatePresence } from 'framer-motion';
import { Link, animateScroll as scroll } from 'react-scroll';
import hoverSound from '/sounds/hover.MP3';
import useSound from 'use-sound';
import clickSound from '/sounds/click.MP3';

export default function Footer() {
    const [copied, setCopied] = useState(false);
    const [playClick] = useSound(clickSound, { volume: 0.5, interrupt: true, soundEnabled: true, });
    const [playHover] = useSound(hoverSound, { volume: 0.5, interrupt: true, soundEnabled: true, });


    const scrollToTop = () => {
        scroll.scrollToTop({ duration: 500, smooth: true });
    };
    const copyEmail = () => {
        navigator.clipboard.writeText('alejandromejias.work@gmail.com');
        setCopied(true);
        playClick()
        setTimeout(() => setCopied(false), 1500);
    };

    const hoverVariants = {
        hover: { scale: 1.05, color: "#a3e635", transition: { duration: 0.2 } },
        hover2: { scale: 1.05, color: "#000000", transition: { duration: 0.2 } },
        tap: { scale: 0.95, transition: { duration: 0.1 } }
    };

    const quickLinks = [
        { label: 'Home', to: 'home' },
        { label: 'About Me', to: 'about' },
        { label: 'Work', to: 'work' },
        { label: 'Skills', to: 'skills' },
    ];

    return (
        <footer className=" md:px-28 px-5 py-10" name="footer">
            <div className="border-t border-neutral-800 flex max-md:flex-col max-md:gap-5  py-4 items-center justify-between relative">
                <motion.span
                    className="text-xl md:text-sm font-mono uppercase tracking-wider"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.1 }}
                >
                    Email
                </motion.span>

                <motion.button
                    onClick={copyEmail}
                    whileHover={hoverVariants.hover2}
                    className="bg-lime-400 text-black px-8 py-4 rounded-full flex items-center gap-3 relative overflow-hidden"
                    whileTap={hoverVariants.tap}
                    initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.1 }}
                >
                    <span className="font-mono tracking-wider font-medium">
                        mdbulbulislamtheprogrammer@gmail.com
                    </span>
                    {copied ? <CopyCheck className="w-5 h-5" /> : <Copy className="w-5 h-5" />}

                    <AnimatePresence>
                        {copied && (
                            <motion.div
                                key="check"
                                className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-full text-lime-400"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.3 }}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>

            {/* Connect Section */}
            <div className="border-t border-neutral-800 py-8 flex  max-md:flex-col max-md:gap-5  items-center justify-between">
                <motion.span
                    className="text-xl md:text-sm font-mono uppercase tracking-wider"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.15 }}
                >
                    Connect
                </motion.span>

                <div className="flex items-center gap-8 ">
                    {[
                        { icon: <IoLogoLinkedin className="w-5 h-5" />, label: "LinkedIn", link: "https://www.linkedin.com/in/bulbulwebdev/" },
                        { icon: <FaTwitterSquare className="w-5 h-5" />, label: "X (Twitter)", link: "https://x.com/BulbulIslam369" },
                        { icon: <FaSquareFacebook className="w-5 h-5" />, label: "Facebook", link: "https://www.facebook.com/profile.php?id=61550563621219" }
                    ].map((item, i) => (
                        <motion.a
                            key={i}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center !text-black dark:!text-white gap-2 font-mono uppercase hover:underline text-sm tracking-wider"
                            whileHover={hoverVariants.hover}
                            whileTap={hoverVariants.tap}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            onMouseEnter={playHover}
                        >
                            {item.icon}
                            <span className=''>{item.label}</span>
                        </motion.a>
                    ))}
                </div>
            </div>

            {/* Quick Links Section */}
            <div className="border-t border-neutral-800 py-8 flex  max-md:flex-col max-md:gap-5  items-center justify-between">
                <motion.span
                    className="text-xl md:text-sm font-mono uppercase tracking-wider"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.25 }}
                >
                    Quick Links
                </motion.span>

                <div className="flex items-center gap-8 !text-black dark:!text-white">
                    {quickLinks.map((link, i) => (
                        <Link
                            key={i}
                            to={link.to}
                            smooth={true}
                            duration={500}
                            onMouseEnter={playHover}
                            className="flex items-center gap-2 font-mono uppercase text-sm tracking-wider cursor-pointer"
                        >
                            <motion.span
                                whileHover={hoverVariants.hover}
                                whileTap={hoverVariants.tap}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                            >
                                {link.label}
                            </motion.span>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="border-t border-neutral-800 px-6 py-6 flex items-center justify-between">
                <motion.span
                    className="text-xs font-mono text-neutral-500"
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.4 }}
                >
                    2025©
                </motion.span>

                <motion.div
                    className="text-center flex-1"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.45 }}
                >
                    <p className="text-xs font-mono text-neutral-400">I LOVE TO BUILD STUFFS</p>
                    <p className="text-xs font-mono text-neutral-400">WITH MY SKILLS</p>
                </motion.div>

                <motion.button
                    onClick={scrollToTop}
                    className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider cursor-pointer"
                    whileHover={hoverVariants.hover}
                    whileTap={hoverVariants.tap}
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.5 }}
                >
                    <span>Back to Top</span>
                    <ArrowUp className="w-4 h-4" />
                </motion.button>
            </div>
        </footer>
    );
}
