import React from 'react';
import NextIcon from "../../public/icons/techStacks/NextIcon";
import ReactIcon from "../../public/icons/techStacks/React";
import ReduxIcon from "../../public/icons/techStacks/Redux";
import SassIcon from "../../public/icons/techStacks/Sass";
import TailwindIcon from "../../public/icons/techStacks/Tailwind";
import StrapiIcon from "../../public/icons/techStacks/Strapi";
import StripeIcon from "../../public/icons/techStacks/Stripe";
import FigmaIcon from "../../public/icons/techStacks/Figma";
import FramerMotionIcon from "../../public/icons/techStacks/FramerMotion";

export const projectData = [
  {
    id: 0,
    title: 'Movix',
    slug: "movix",
    desc: 'Movix is a feature-rich movie discovery platform where users can explore millions of movies, TV shows, and celebrities. Built with advanced search and filtering capabilities, it offers trending, upcoming, and top-rated content — all in a sleek, modern UI. Powered by APIs, optimized for performance.',
    link: 'https://advancemovieapp.netlify.app/',
    imgSrc: '/images/project-1.webp',
    stacks: [
      {
        name: "Reactjs",
        icon: ReactIcon,
      },
      {
        name: "Sass",
        icon: SassIcon,
      },
      {
        name: "Redux",
        icon: ReduxIcon,
      },
    ],
    status: ['All', '/' ," Design", "/", " Function"],
    gitLink: 'https://github.com/bulbul32123/Movie-APP-With-React'
  },
  {
    id: 75675,
    title: "Online Ekart Store",
    slug: "online-ekart-store",
    desc: 'A fully responsive modern e-commerce platform offering a curated selection of tech products for work, travel, and daily use. Features product filtering, shopping cart, dynamic routing, and a seamless shopping experience. Built with React, Redux, and TailwindCSS.',
    link: 'https://ekart-frontend-mu.vercel.app/',
    imgSrc: '/images/project-2.webp',
    stacks: [
      {
        name: "Nextjs",
        icon: NextIcon,
      },
      {
        name: "Tailwidcss",
        icon: TailwindIcon,
      },
      {
        name: "Stripe",
        icon: StripeIcon,
      },
      {
        name: "Strapi",
        icon: StrapiIcon,
      },
      {
        name: "Redux",
        icon: ReduxIcon,
      },
    ],
    status: ['All', ' /' ," Design", " /", " Function", " /", " Payment Gatway"],
    gitLink: 'https://github.com/bulbul32123/Ekart-Store-Frontend'
  },
  {
    id: 99,
    title: "Youtube",
    slug: 'youtube',
    desc: 'A full-featured YouTube clone built using React and TailwindCSS. It supports real-time search, video playback, channel view, and suggested content — mimicking YouTube’s core functionality. This project focuses on UI accuracy, responsiveness, and user interaction.',
    link: 'https://youtubeclonewithreactjs.netlify.app/',
    imgSrc: '/images/project-3.webp',
    stacks: [
      {
        name: "Reactjs",
        icon: ReactIcon,
      },
      {
        name: "Tailwidcss",
        icon: TailwindIcon,
      },
      {
        name: "Figma",
        icon: FigmaIcon,
      },
    ],
    status: ['All', ' /' ," Clone", " /", " Function"],
    gitLink: 'https://github.com/bulbul32123/Youtube-Clone'
  },
  {
    id: 234,
    title: 'Google Searcher',
    slug: "google-searcher",
    desc: 'A minimal Google clone that lets users perform real-time web searches and returns results just like the original. Uses Google Search API and focuses on speed, simplicity, and clean UI/UX. Designed to replicate the Google homepage experience.',
    stacks: [
      {
        name: "Reactjs",
        icon: ReactIcon,
      },
      {
        name: "Tailwidcss",
        icon: TailwindIcon,
      },
      {
        name: "Figma",
        icon: FigmaIcon,
      },
    ],
    link: 'https://google-searcher.netlify.app/',
    imgSrc: '/images/project-4.webp',
    gitLink: 'https://github.com/bulbul32123/Google-Search-App',
    status: ['All', ' /' ," Clone", " /", " Function"]
  },
  {
    id: 2342344,
    title: 'E-Bike Store',
    slug: "e-bike-store",
    desc: 'An e-commerce storefront for electric bikes with a futuristic, clean UI. Features include responsive layouts, product showcases, smooth animations, and a user-focused design. Built for performance and modern shopping experiences.',
    stacks: [
      {
        name: "Reactjs",
        icon: ReactIcon,
      },
      {
        name: "Tailwidcss",
        icon: TailwindIcon,
      },
      {
        name: "Redux",
        icon: ReduxIcon,
      },
      {
        name: "Figma",
        icon: FigmaIcon,
      },
      {
        name: "Stripe",
        icon: StripeIcon,
      },
    ],
    link: 'https://e-bike-store.netlify.app/',
    imgSrc: '/images/project-5.webp',
    gitLink: 'https://github.com/bulbul32123/E---Bike-Store',
    status: ['All', ' /' ," Design", " /" ," Function"]
  },
  {
    id: 144545564,
    title: 'Dev Easy Browser',
    slug: "dev-easy-browser",
    desc: 'Dev Easy is a standalone browser + devtool app designed to speed up development for modern web developers. It includes utilities for testing responsiveness, accessibility, and performance. Built to enhance productivity and eliminate workflow bottlenecks.',
    link: 'https://deveasy.netlify.app/',
    imgSrc: '/images/project-6.webp',
    stacks: [
      {
        name: "Nextjs",
        icon: NextIcon,
      },
      {
        name: "Tailwidcss",
        icon: TailwindIcon,
      },
      {
        name: "Framer Motion",
        icon: FramerMotionIcon,
      },
      {
        name: "Figma",
        icon: FigmaIcon,
      },
    ],
    status: ['All', ' /' ," Design"],
    gitLink: 'https://github.com/bulbul32123/Dev-Easy---with-Reactjs'
  }
];
