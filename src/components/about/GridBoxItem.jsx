import React from 'react';
import { motion } from 'framer-motion';

const GridBoxItem = ({ 
  index, 
  data, 
  gridBoxRefs, 
  numberRefs, 
  plusRefs, 
  handleMouseEnter, 
  handleMouseLeave
}) => {
  const hoverBgColors = [
    'hover:bg-[#f7eb9d]',
    'hover:bg-[#a4e8eb]',
    'hover:bg-[#caef96]',
    'hover:bg-[#ffb3db]'
  ];

  const mobileBgColors = [
    'max-md:bg-[#f7eb9d]',
    'max-md:bg-[#a4e8eb]',
    'max-md:bg-[#caef96]',
    'max-md:bg-[#ffb3db]'
  ];

  const numberVariants = {
    hidden: { opacity: 0, x: -30, rotate: -10 },
    visible: { 
      opacity: 1, 
      x: 0, 
      rotate: 0,
      transition: { 
        delay: 0.2,
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    }
  };

  const plusVariants = {
    hidden: { opacity: 0, scale: 0, rotate: 180 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: { 
        delay: 0.4,
        type: "spring",
        damping: 12,
        stiffness: 120
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.5,
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={el => gridBoxRefs.current[index] = el}
      className={`md:grid-box ${mobileBgColors[index]} ${hoverBgColors[index]} md:!text-white md:hover:!text-black md:dark:!text-black transition-all duration-300 ease-in-out rounded-3xl mt-10 p-12 relative w-[450px] h-[350px] flex items-center justify-center cursor-default`}
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={() => handleMouseLeave(index)}
      whileHover={{ 
        backgroundColor: index === 0 ? '#f7eb9d' : 
                       index === 1 ? '#a4e8eb' : 
                       index === 2 ? '#caef96' : '#ffb3db',
        color: '#000000',
        transition: { duration: 0.1 }
      }}
    >
      <motion.div 
        className="absolute text-[180px] font-extrabold left-7 top-10 flex items-start leading-none"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.span 
          ref={el => numberRefs.current[index] = el} 
          className="pr-2 Span"
          variants={numberVariants}
        >
          {data.number}
        </motion.span>
        <motion.span 
          ref={el => plusRefs.current[index] = el} 
          className="text-8xl font-extrabold mt-2 ml-1"
          variants={plusVariants}
        >
          +
        </motion.span>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-6 right-6 text-right leading-none"
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {data.text.map((line, i) => (
          <motion.p 
            key={i} 
            className="uppercase text-[38px] font-bold Span"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ 
              opacity: 1, 
              x: 0,
              transition: { 
                delay: 0.7 + (i * 0.1),
                duration: 0.4,
                ease: "easeOut"
              }
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {line}
          </motion.p>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default GridBoxItem;
