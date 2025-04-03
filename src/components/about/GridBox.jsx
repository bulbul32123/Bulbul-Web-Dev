import React from 'react';
import { motion } from 'framer-motion';
import GridBoxItem from './GridBoxItem';
import { GRID_BOX_DATA } from './gridData';

const GridBox = ({
    gridBgRef,
    showGridBg,
    gridBoxRefs,
    numberRefs,
    plusRefs,
    handleMouseEnter,
    handleMouseLeave
}) => {
    const gridPositions = [
        "md:pl-14 xl:ml-0 col-span-3 row-span-4",
        "md:pl-16 xl:ml-0 col-span-3 row-span-4 col-start-4 row-start-2",
        "md:pl-14 xl:ml-0 col-span-3 row-span-4 row-start-5",
        "md:pl-16 xl:ml-0 col-span-3 row-span-4 col-start-4 row-start-6"
    ];

    return (
        <div
            ref={gridBgRef}
            className="flex justify-center items-center w-full h-full max-xl:pt-32 pb-16 bg-black dark:bg-white"
            style={{ opacity: showGridBg ? 1 : 0 }}
        >
            <motion.div 
                className="md:grid grid-cols-2 md:grid-cols-7 grid-rows-1 md:grid-rows-9 gap-8 pt-80 xl:pl-20"
                initial="hidden"
                animate="visible"
            >
                {GRID_BOX_DATA.map((data, index) => {
                    const isEven = index % 2 === 0;

                    const directionalVariants = {
                        hidden: {
                            x: isEven ? -40 : 40,
                            y: 30,
                            opacity: 0,
                            scale: 0.9,
                            rotate: isEven ? -3 : 3,
                        },
                        visible: {
                            x: 0,
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            rotate: 0,
                            transition: {
                                type: "spring",
                                damping: 20,
                                stiffness: 100,
                                duration: 0.5,
                            },
                        },
                    };

                    return (
                        <motion.div
                            key={index}
                            className={gridPositions[index]}
                            variants={directionalVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            whileHover={{
                                scale: 1.05,
                                rotate: 2,
                                transition: { duration: 0.3 }
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <GridBoxItem
                                index={index}
                                data={data}
                                gridBoxRefs={gridBoxRefs}
                                numberRefs={numberRefs}
                                plusRefs={plusRefs}
                                handleMouseEnter={(i) => handleMouseEnter(i, numberRefs, plusRefs, GRID_BOX_DATA)}
                                handleMouseLeave={(i) => handleMouseLeave(i, plusRefs)}
                            />
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
};

export default GridBox;
