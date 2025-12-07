import React from "react";
import { motion } from "framer-motion";
import ServiceTitle from "./ServiceTitle";
import MailMEBox from "./MailMEBox";

const services = [
  {
    title: "Frontend Development",
    Myservice: "Frontend developer",
    img: "/images/frontend.png",
    color: "bg-[#b0ddcae6]",
  },
  {
    title: "Backend Development",
    Myservice: "Backend developer",
    img: "/images/backend.png",
    color: "bg-[#f4e342e6]",
  },
  {
    title: "Fullstack Development",
    Myservice: "FullStack developer",
    img: "/images/fullStack.png",
    color: "bg-[#ffb3db]",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25, 
    },
  },
};

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function Services() {
  return (
    <section className="py-16 transition-colors duration-300" name={'service'}>
      <div className="w-full mx-auto px-6">
        <ServiceTitle
          text="What I do"
          className="text-black dark:text-white"
          textSize="text-6xl md:text-9xl"
        />

        <motion.div
          className="grid grid-cols-1 max-md:gap-5 md:grid-cols-3 w-full relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }} 
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="relative group h-[35rem] overflow-hidden cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
                style={{ backgroundImage: `url(${service.img})` }}
              />

              <div className="hover:bg-black/40 group z-20 relative h-full p-5 md:p-4 lg:p-6 transition-transform duration-500">
                <div className="flex flex-col items-center justify-center h-full">
                  <h3 className="text-4xl z-[12] text-black font-bold mt-7">
                    {service.title}
                  </h3>
                  <div className="w-full h-full">
                    <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex justify-center items-center h-full w-full">
                      <MailMEBox
                        email="mdbulbulislamtheprogrammer@gmail.com"
                        bg={service.color}
                        service={service.Myservice}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
