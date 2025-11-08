import React from 'react';

const AboutText = ({ sectionRef, boxRef, textRef, titleRef, titleFrontRef, para1Ref, para2Ref }) => {
  return (
    <div ref={sectionRef} className="h-full w-full" to={'about'}>
      <div className="flex justify-center items-center h-full w-full">
        <div
          ref={boxRef}
          style={{ borderRadius: '60px' }}
          className="bg-black dark:bg-white w-40 h-20 relative SquareBox"
        >
          <div ref={textRef} className="text-white dark:text-black pt-24 2xl:pt-64 pl-5 sm:pl-10 md:pl-20 pr-20 relative mx-auto 2xl:max-w-[1300px]">
            <h3
              className="text-7xl md:text-9xl uppercase relative font-bold w-full"
              ref={titleRef}
            >
              <span className="text-gray-600 dark:text-gray-700 opacity-0">Who Am I</span>
              <span
                ref={titleFrontRef}
                className="absolute top-0 left-0 text-white dark:text-black overflow-hidden whitespace-nowrap"
                style={{ width: '0%' }}
              >
                Who Am I
              </span>
            </h3>
            
            <p ref={para1Ref} className="w-full md:w-[35rem] text-2xl md:text-3xl ml-2 mt-2 sm:mt-5 max-md:mb-5 md:ml-4 para dark:text-gray-600">
              I'm Bulbul Islam — a fullstack developer who builds fast, clean, and user-focused websites. 
              From high-converting landing pages and e-commerce stores to AI-powered SaaS platforms, 
              I turn ideas into powerful web experiences that solve real-world problems.
            </p>

            <p ref={para2Ref} className="w-full md:w-[26rem] xl:w-[32rem] text-gray-200 dark:text-gray-500 md:absolute md:right-32 xl:right-24 text-lg md:text-[20px] xl:leading-7 md:mt-6 xl:-mt-14 max-sm:ml-2">
              With 4+ years of experience and 80+ completed projects, I specialize in both frontend 
              (React.js, Next.js, TailwindCSS) and backend (Node.js, Express, MongoDB) development. 
              I bring creative ideas to life with clean code and micro interactions.
              <a target='_blank'
              href="/Bulbul'sResume.pdf"
                className="py-4 px-7 rounded-full bg-white dark:bg-black hover:bg-black hover:text-white text-black dark:text-white mt-4 ml-3 inline-block up"
              >
                Resume 
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutText;
