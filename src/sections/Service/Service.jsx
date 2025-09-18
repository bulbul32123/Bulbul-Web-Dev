import React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ServiceTitle from "./ServiceTitle";
import MailMEBox from "./MailMEBox";

const services = [
  {
    title: "Frontend Development",
    Myservice: "Frontend developer",
    img: "/images/frontend.png",
    color: "bg-[#b0ddcae6]"
  },
  {
    title: "Backend Development",
    Myservice: "Backend developer",
    img: "/images/backend.png",
    color: "bg-[#f4e342e6]"
  },
  {
    title: "Fullstack Development",
    Myservice: "FullStack developer",
    img: "/images/fullStack.png",
    color: "bg-[#ffb3db]"
  },
];

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-white dark:bg-[#0d0d0d] transition-colors duration-300">
      <div className="w-full mx-auto px-6">
        {/* Heading */}
        <ServiceTitle />

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 w-full relative">
          {services.map((service, i) => (
            <div
              key={i}
              className="relative group h-[35rem] overflow-hidden cursor-pointer"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
                style={{ backgroundImage: `url(${service.img})` }}
              />

              {/* Title */}
              <div className="hover:bg-black/40 group z-20 relative h-full p-6 transition-transform duration-500">
                <div className="flex flex-col items-center justify-center h-full">
                  <h3 className="text-4xl z-[12] group-hover:text-white text-black  font-bold mt-7">{service.title}</h3>
                  <div className="w-full h-full ">
                    <div className={`absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500   z-20 flex justify-center items-center h-full w-full`}>
                      <MailMEBox email="mdbulbulislamtheprogrammer@gmail.com" bg={service.color} service={service.Myservice} />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
