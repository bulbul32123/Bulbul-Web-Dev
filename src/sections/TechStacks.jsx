import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

import { techStacks } from "../utils/TechStacks";
import TechStacksTitle from "./TechStacksTitle";

export default function TechStacks() {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const groupedTechStacks = useMemo(() => {
        return techStacks.reduce((acc, tech, index) => {
            if (!acc[tech.category]) acc[tech.category] = [];
            acc[tech.category].push({ ...tech, originalIndex: index });
            return acc;
        }, {});
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.12 },
        },
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", damping: 18, stiffness: 120 },
        },
    };

    const categoryVariants = {
        hidden: { opacity: 0, x: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.2, when: "beforeChildren", staggerChildren: 0.06 },
        },
    };

    const important = ["React", "Next.js", "Tailwind CSS", "TypeScript", "Node.js", "Express.js", "MongoDB", "JavaScript"];

    const getIconSize = (name) => {
        const m = {
            React: "80%",
            "Next.js": "70%",
            "Tailwind CSS": "90%",
            TypeScript: "75%",
            "Node.js": "85%",
            MongoDB: "80%",
            PostgreSQL: "75%",
            Docker: "85%",
            AWS: "80%",
        };
        return m[name] || "60%";
    };

    const getContainerSize = (tech) =>
        important.includes(tech.name) || tech.featured ? "col-span-2 row-span-2" : "col-span-1 row-span-1";

    const renderTechItem = (tech, globalIndex) => {
        const IconEl = React.isValidElement(tech.icon) ? tech.icon : React.createElement(tech.icon || "div");

        return (
            <motion.div
                key={`${tech.category}-${tech.name}`}
                variants={itemVariants}
                className={`relative group cursor-pointer ${getContainerSize(tech)}`}
                onMouseEnter={() => setHoveredIndex(globalIndex)}
                onMouseLeave={() => setHoveredIndex(null)}
            >
                <motion.div
                    className="absolute inset-0 dark:bg-black bg-white rounded-2xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: hoveredIndex === globalIndex ? 1 : 0,
                        scale: hoveredIndex === globalIndex ? 1 : 0.8,
                    }}
                    transition={{ type: "spring", damping: 20, stiffness: 300, duration: 0.25 }}
                />

                <motion.div
                    className={`
            relative z-10 p-6 rounded-2xl border-2 dark:border-gray-200 border-gray-700
            flex items-center justify-center transition-all duration-300 h-full
            ${important.includes(tech.name) || tech.featured ? "min-h-[200px] p-8" : "min-h-[120px]"}
            ${hoveredIndex === globalIndex
                            ? "dark:text-white text-gray-900 border-transparent"
                            : "dark:text-gray-900 text-white dark:bg-white bg-gray-800"
                        }
          `}
                    animate={{ y: hoveredIndex === globalIndex ? -8 : 0 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                >
                    <motion.div
                        animate={{
                            scale: hoveredIndex === globalIndex ? 1.06 : 1,
                            rotate: hoveredIndex === globalIndex ? 5 : 0,
                        }}
                        transition={{ type: "spring", damping: 16, stiffness: 220 }}
                        className="flex flex-col items-center justify-center w-full h-full"
                    >
                        <div
                            className="flex items-center justify-center"
                            style={{
                                width: getIconSize(tech.name),
                                height: getIconSize(tech.name),
                                fontSize: "2.5rem",
                            }}
                        >
                            <div className="w-full h-full flex items-center justify-center">{IconEl}</div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{
                                opacity:
                                    hoveredIndex === globalIndex
                                        ? 1
                                        : important.includes(tech.name) || tech.featured
                                            ? 1
                                            : 0,
                                y: hoveredIndex === globalIndex ? 0 : important.includes(tech.name) || tech.featured ? 0 : 10,
                            }}
                            transition={{ delay: 0.08 }}
                            className={`mt-4 text-center font-medium ${important.includes(tech.name) || tech.featured ? "text-lg font-bold" : "text-sm"
                                }`}
                        >
                            {tech.name}
                        </motion.div>
                    </motion.div>
                </motion.div>

                <motion.div
                    className={`absolute inset-0 rounded-2xl blur-xl ${["React", "Next.js", "Tailwind CSS"].includes(tech.name)
                            ? "bg-gradient-to-r from-blue-500/30 to-purple-500/30"
                            : "bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                        }`}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{
                        opacity: hoveredIndex === globalIndex ? 0.8 : 0,
                        scale: hoveredIndex === globalIndex ? 1.15 : 0.85,
                    }}
                    transition={{ duration: 0.25 }}
                />
            </motion.div>
        );
    };

    const categories = Object.entries(groupedTechStacks);
    const categoryOffsets = categories.reduce((map, [cat], i) => {
        const prev = categories.slice(0, i).reduce((n, [, arr]) => n + arr.length, 0);
        map[cat] = prev;
        return map;
    }, {});

    return (
        <motion.section
            className="h-full w-full dark:bg-white bg-black py-20 relative overflow-hidden"
            initial="hidden"
            whileInView="visible" name="skills"
        >

            <div className="w-full relative z-10">
                <TechStacksTitle />

                <div className="space-y-16 w-[calc(100%_-_5rem)]">
                    {categories.map(([category, techs]) => {
                        const base = categoryOffsets[category] || 0;

                        return (
                            <motion.div
                                key={category}
                                variants={categoryVariants}
                                initial="hidden"
                                whileInView="visible"
                                className="mb-16 w-full"
                            >
                                <motion.h3
                                    variants={itemVariants}
                                    className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-8 dark:text-gray-900 text-white"
                                >
                                    {category}
                                </motion.h3>

                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 auto-rows-fr w-full h-full"
                                >
                                    {techs.map((tech, i) => renderTechItem(tech, base + i))}
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="absolute top-1/2 left-10 opacity-10 pointer-events-none">
                    <motion.div
                        animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 border-2 border-current rounded-full"
                    />
                </div>

                <div className="absolute bottom-1/4 right-10 opacity-10 pointer-events-none">
                    <motion.div
                        animate={{ y: [0, 30, 0], x: [0, -15, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="w-8 h-8 bg-current rounded-full"
                    />
                </div>
            </div>
        </motion.section>
    );
}
