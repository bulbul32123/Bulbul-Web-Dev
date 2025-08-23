import React, { useState } from "react";
import { motion } from "framer-motion";
import { techStacks } from "../utils/TechStacks";

const TechStacks = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const groupedTechStacks = techStacks.reduce((acc, tech, index) => {
        if (!acc[tech.category]) {
            acc[tech.category] = [];
        }
        acc[tech.category].push({ ...tech, originalIndex: index });
        return acc;
    }, {});

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 15,
                stiffness: 100
            }
        }
    };

    const categoryVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const getIconSize = (techName) => {
        const sizeMap = {
            'React': '80%',
            'Next.js': '70%',
            'Tailwind CSS': '90%',
            'TypeScript': '75%',
            'Node.js': '85%',
            'MongoDB': '80%',
            'PostgreSQL': '75%',
            'Docker': '85%',
            'AWS': '80%'
        };
        return sizeMap[techName] || '60%';
    };

    const getContainerSize = (tech) => {
        const importantTechs = ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Node.js', "Express.js", "MongoDb", "JavaScript"];
        if (importantTechs.includes(tech.name)) {
            return 'col-span-2 row-span-2';
        }
        return tech.featured ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1';
    };

    const renderTechItem = (tech, globalIndex) => (
        <motion.div
            key={`${tech.category}-${tech.name}`}
            variants={itemVariants}
            className={`relative group cursor-pointer ${getContainerSize(tech)}`}
            onMouseEnter={() => setHoveredIndex(globalIndex)}
            onMouseLeave={() => setHoveredIndex(null)}
        >
            <motion.div
                className="absolute inset-0 bg-black dark:bg-white rounded-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: hoveredIndex === globalIndex ? 1 : 0,
                    scale: hoveredIndex === globalIndex ? 1 : 0.8
                }}
                transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 300,
                    duration: 0.3
                }}
            />

            <motion.div
                className={`
                    relative z-10 p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700
                    flex items-center justify-center transition-all duration-300 h-full
                    ${(tech.featured || ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Node.js'].includes(tech.name))
                        ? 'min-h-[200px] p-8' : 'min-h-[120px]'}
                    ${hoveredIndex === globalIndex
                        ? 'text-white dark:text-gray-900 border-transparent'
                        : 'text-gray-900 dark:text-white bg-white dark:bg-gray-800'
                    }
                `}
                animate={{
                    y: hoveredIndex === globalIndex ? -8 : 0,
                }}
                transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 300
                }}
            >
                <motion.div
                    animate={{
                        scale: hoveredIndex === globalIndex ? 1.1 : 1,
                        rotate: hoveredIndex === globalIndex ? 5 : 0
                    }}
                    transition={{
                        type: "spring",
                        damping: 15,
                        stiffness: 200
                    }}
                    className="flex flex-col items-center justify-center w-full h-full"
                >
                    <div
                        className="flex items-center justify-center"
                        style={{
                            width: getIconSize(tech.name),
                            height: getIconSize(tech.name),
                            fontSize: (tech.featured || ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Node.js'].includes(tech.name))
                                ? '2.5rem' : '2.5rem'
                        }}
                    >
                        <div className="w-full h-full flex items-center justify-center">
                            {React.cloneElement(tech.icon)}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                            opacity: hoveredIndex === globalIndex ? 1 :
                                (['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Node.js'].includes(tech.name) ? 1 : 0),
                            y: hoveredIndex === globalIndex ? 0 :
                                (tech.featured || ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Node.js'].includes(tech.name) ? 0 : 10)
                        }}
                        transition={{ delay: 0.1 }}
                        className={`mt-4 text-center font-medium ${(tech.featured || ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Node.js'].includes(tech.name))
                            ? 'text-lg font-bold' : 'text-sm'
                            }`}
                    >
                        {tech.name}
                    </motion.div>
                </motion.div>
            </motion.div>

            <motion.div
                className={`absolute inset-0 rounded-2xl blur-xl ${['React', 'Next.js', 'Tailwind CSS'].includes(tech.name)
                    ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30'
                    : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20'
                    }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: hoveredIndex === globalIndex ? 0.8 : 0,
                    scale: hoveredIndex === globalIndex ? 1.2 : 0.8
                }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 py-20 px-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.h2
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-none mb-20 text-gray-900 dark:text-white"
                >
                    MODERN<br />
                    TECH STACK
                </motion.h2>

                <div className="space-y-16">
                    {Object.entries(groupedTechStacks).map(([category, techs], categoryIndex) => {
                        let globalIndex = 0;
                        for (let i = 0; i < categoryIndex; i++) {
                            const prevCategory = Object.keys(groupedTechStacks)[i];
                            globalIndex += groupedTechStacks[prevCategory].length;
                        }

                        return (
                            <motion.div
                                key={category}
                                variants={categoryVariants}
                                initial="hidden"
                                animate="visible"
                                className="mb-16"
                            >
                                <motion.h3
                                    variants={itemVariants}
                                    className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-8 text-gray-900 dark:text-white"
                                >
                                    {category}
                                </motion.h3>

                                <motion.div
                                    variants={containerVariants}
                                    className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-fr"
                                >
                                    {techs.map((tech, index) => {
                                        const currentGlobalIndex = globalIndex + index;
                                        return renderTechItem(tech, currentGlobalIndex);
                                    })}
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="absolute top-1/2 left-10 opacity-10">
                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 180, 360]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="w-16 h-16 border-2 border-current rounded-full"
                    />
                </div>

                <div className="absolute bottom-1/4 right-10 opacity-10">
                    <motion.div
                        animate={{
                            y: [0, 30, 0],
                            x: [0, -15, 0]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="w-8 h-8 bg-current rounded-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default TechStacks;