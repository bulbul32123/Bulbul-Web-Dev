import React from "react";
import { Marquee } from "../../components/magicui/marquee"
import ServiceTitle from "../Service/ServiceTitle";
import ClientPic from "../../components/ClientPic";

const testimonials = [
  {
    name: "a_doria",
    body: "Experience with Bulbul has been excellent and recommendable. He is very good at coding and was able to turn an idea into reality. I look forward to continuing to cooperate in the future.",
    img: "A",
    bg: '#a9c34e'
  },
  {
    name: "brobbey95",
    body: "This is coming from some who very rarely writes reviews and even when I do, it's the absolute bare minimum - Bulbul is AMAZING! I honestly did not think the quality could be this good!! Very much appreciated!",
    img: "/images/client1.webp",
    imgTrue: true
  },
  {
    name: "freshskinco",
    body: "Very responsive and made several revisions to get the site looking great. Will work with again.",
    img: "F",
    bg: '#FCD3E2'
  },
  {
    name: "davidli90210",
    body: "Bulbul is an exceptional pro. He communicates well and is very attentive when it comes to the needs of his customers. The website looks great and we are getting great feedback from the general public. He also makes time to fix any issues you might have. We highly recommend him! Thank you, Bulbul!!!",
    img: "/images/client2.webp",
    imgTrue: true,
    bg: '#17732E'
  },

  {
    name: "afrikartt",
    body: "Bulbul consistently meets expectations with his attention to detail. His expertise in coding is exceptional. He went above and beyond to fix any issues we had with our website.",
    img: "A",
    bg: '#537ad3'
  },
  {
    name: "tark2ben",
    body: "We’ve been working with Bulbul for a long time now and we are very satisfied of his work.",
    img: "/images/client3.webp",
    imgTrue: true,
    bg: '#e7ed3d'
  },

  {
    name: "cponch62",
    body: "Very reliable and loves perfection . Highly recommended . Five stars. He finished my website ahead of schedule",
    img: "C",
    bg: '#463ded'
  },
  {
    name: "kate_shoop",
    body: "Very happy with our website! Bulbul is very professional and very attentive and answers all questions. Definitely recommend.",
    img: "/images/client4.webp",
    imgTrue: true,
    bg: '#FDECD1'
  },
  {
    name: "revdupcreative",
    body: "Bulbul, was everything I had hoped for! His skill level and capability was far and above my expectations! He was extremely fast and easy to work with. I will be using him for more projects. I highly recommend him for any high level web development!",
    img: "/images/client5.png",
    imgTrue: true,
  },
]

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

const TestimonialCard = ({
  img,
  name,
  body,
  bg,
  imgTrue
}) => {
  return (
    <div className="relative w-full max-w-xs overflow-hidden rounded-3xl border dark:border-white/10 bg-gradient-to-b dark:from-white/5 dark:to-white/[0.02] p-10 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset]">
      <div className="absolute -top-5 -left-5 -z-10 h-40 w-40 rounded-full bg-gradient-to-b from-[#e78a53]/10 to-transparent blur-md"></div>

      <div className="text-black/90 dark:text-white/90 leading-relaxed">{body}</div>

      <div className="mt-5 flex items-center gap-2">
        {imgTrue ?
          <img src={img || "/placeholder.svg"} alt={name} height="40" width="40" className="h-10 w-10 rounded-full" /> :
          <ClientPic text={img} bg={bg} />
        }
        <div className="flex flex-col">
          <div className="leading-5 font-medium tracking-tight text-black dark:text-white">{name}</div>
        </div>
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section id="testimonials">
      <div className="mx-auto max-w-7xl py-10">
        <ServiceTitle text={'What they said'} className="text-black dark:text-white" textSize={'text-5xl sm:text-6xl md:text-8xl'} />

        <div className="my-16 flex max-h-[738px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
          <div>
            <Marquee pauseOnHover={true} vertical className="[--duration:20s]">
              {firstColumn.map((testimonial) => (
                <TestimonialCard key={testimonial.username} {...testimonial} />
              ))}
            </Marquee>
          </div>

          <div className="hidden md:block">
            <Marquee reverse pauseOnHover={true} vertical className="[--duration:25s]">
              {secondColumn.map((testimonial) => (
                <TestimonialCard key={testimonial.username} {...testimonial} />
              ))}
            </Marquee>
          </div>

          <div className="hidden lg:block">
            <Marquee pauseOnHover={true} vertical className="[--duration:30s]">
              {thirdColumn.map((testimonial) => (
                <TestimonialCard key={testimonial.username} {...testimonial} />
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  )
}
