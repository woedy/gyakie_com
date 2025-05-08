import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import leaves from '../../images/cover/leaves.png';
import moon from '../../images/cover/moon.png';
import bird from '../../images/cover/bird.png';
import mountains from '../../images/cover/mountain.png';
import trees from '../../images/cover/trees.png';
import VinylCarousel3D from './Vynal';
import TourSection from '../Landing/TourSection';

// Define a clamp function
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const ParallaxScene = () => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
    smooth: 10,
  });

  // Dynamic sizing based on screen width
  const isMobile = window.innerWidth < 640;
  const moonSize = isMobile ? 'w-32 h-32' : 'w-48 h-48 md:w-64 md:h-64';
  const birdSize = isMobile ? 'w-24 h-24' : 'w-32 h-32 md:w-60 md:h-60';
  const textSizeH1 = isMobile ? 'text-3xl' : 'text-6xl md:text-8xl';
  const textSizeP = isMobile ? 'text-base' : 'text-lg md:text-xl';

  // Moon
  const moonY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isMobile ? ['5vh', '5vh', '-25vh'] : ['10vh', '20vh', '30vh'],
  );
  const moonX = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ['50vw', '30vw'] : ['60vw', '40vw'],
  );
  const moonScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1.1]);
  const moonOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.7, 1, 0.9, 0.8],
  );

  // Mountains
  const mountainsY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isMobile ? ['5%', '20%', '15%'] : ['10%', '30%', '20%'],
  );
  const mountainsScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const mountainsOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 0.95, 0.9],
  );

  // Leaves
  const leavesScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isMobile ? [1, 1.5, 2] : [1, 1.75, 2.5],
  );
  const leavesY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isMobile ? ['-15%', '-10%', '-5%'] : ['-25%', '-15%', '-5%'],
  );
  const leavesOpacity = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [1, 0.9, 0.8],
  );

  // Bird
  const birdX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isMobile ? ['80vw', '15vw', '-5vw'] : ['80vw', '20vw', '-10vw'],
  );
  const birdY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isMobile ? ['60vh', '15vh', '-5vh'] : ['80vh', '20vh', '-10vh'],
  );
  const birdRotate = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const birdScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isMobile ? [0.7, 1, 1.2] : [0.8, 1.2, 1.5],
  );

  // Stars
  const starCount = isMobile ? 30 : 50;


  return (
    <>
  
      <div
        ref={ref}
        className="relative h-[200vh] bg-gradient-to-b from-black via-indigo-900 to-blue-950 overflow-hidden parallax-container"
      >
        <style>
          {`
          @media (prefers-reduced-motion: reduce) {
            .parallax-element {
              transition: none !important;
              transform: none !important;
              opacity: 1 !important;
            }
          }
          @media (max-width: 640px) {
            .parallax-container {
              height: 150vh;
            }
            .content-overlay {
              top: 25%;
            }
          }
        `}
        </style>

        {/* Stars */}
        <div className="absolute inset-0 z-0">
          {[...Array(starCount)].map((_, i) => {
            const randomSize = Math.random() * 2 + 1; // Value between 1 and 3
            const clampedSize = clamp(randomSize, 1, 3); // Clamp between 1px and 3px
            return (
              <motion.div
                key={i}
                style={{
                  opacity: useTransform(scrollYProgress, [0, 0.7], [0.8, 0]),
                  scale: useTransform(scrollYProgress, [0, 0.5], [1, 0.8]),
                }}
                className="absolute rounded-full bg-white"
                initial={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 50}%`,
                  width: `${clampedSize}px`,
                  height: `${clampedSize}px`,
                }}
              />
            );
          })}
        </div>

        {/* Moon */}
        <motion.div
          style={{ y: moonY, x: moonX, scale: moonScale, opacity: moonOpacity }}
          animate={{
            filter: ['blur(2px)', 'blur(4px)'],
            transition: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
          }}
          className={`parallax-element absolute top-0 left-0 transform -translate-x-1/2 z-10 ${moonSize}`}
        >
          <img
            src={moon}
            alt="moon"
            className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            loading="lazy"
          />
        </motion.div>

        {/* Mountains */}
        <motion.div
          style={{
            y: mountainsY,
            scale: mountainsScale,
            opacity: mountainsOpacity,
          }}
          className="parallax-element absolute top-0 w-full z-20"
        >
          <img
            src={mountains}
            alt="mountains"
            className="w-full object-cover"
            loading="lazy"
          />
        </motion.div>

        {/* Foreground trees */}
        <motion.div
          style={{
            y: useTransform(
              scrollYProgress,
              [0, 0.5, 1],
              isMobile ? ['0%', '-10%', '-20%'] : ['0%', '-20%', '-40%'],
            ),
            opacity: useTransform(
              scrollYProgress,
              [0, 0.5, 1],
              [0.3, 0.4, 0.2],
            ),
          }}
          className="parallax-element absolute bottom-0 w-full z-35 pointer-events-none"
        >
          <img
            src={trees}
            alt="trees"
            className="w-full object-cover opacity-30"
            loading="lazy"
          />
        </motion.div>

        {/* Fog */}
        <motion.div
          style={{
            opacity: useTransform(
              scrollYProgress,
              [0, 0.3, 0.7, 1],
              [0, 0.1, 0.2, 0.05],
            ),
            y: useTransform(
              scrollYProgress,
              [0, 1],
              isMobile ? ['40%', '15%'] : ['50%', '20%'],
            ),
          }}
          className="parallax-element absolute bottom-0 left-0 w-full h-full z-25"
        >
          <div className="w-full h-1/4 bg-white opacity-10 blur-2xl"></div>
        </motion.div>

        {/* Leaves */}
        <motion.div
          style={{ y: leavesY, scale: leavesScale, opacity: leavesOpacity }}
          className="parallax-element absolute top-0 left-0 w-full z-30 pointer-events-none origin-center"
        >
          <img
            src={leaves}
            alt="leaves"
            className="w-full object-contain"
            loading="lazy"
          />
        </motion.div>

        {/* Bird */}
        <motion.div
          style={{ x: birdX, y: birdY, rotate: birdRotate, scale: birdScale }}
          className={`parallax-element absolute ${birdSize} z-40 drop-shadow-lg`}
        >
          <img
            src={bird}
            alt="bird"
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </motion.div>

        {/* Content Overlay */}
        <div className="relative z-50 h-full">
          <div className="content-overlay sticky top-1/3 text-center px-4 sm:px-6">
            <motion.h1
              style={{
                opacity: useTransform(
                  scrollYProgress,
                  [0, 0.2, 0.8, 1],
                  [0, 1, 1, 0],
                ),
                y: useTransform(
                  scrollYProgress,
                  [0, 0.2, 0.8, 1],
                  isMobile
                    ? ['30px', '0px', '0px', '-30px']
                    : ['50px', '0px', '0px', '-50px'],
                ),
              }}
              className={`parallax-element ${textSizeH1} font-black mb-4 text-blue-600 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]`}
            >
              After
              <br />
              Midnight
            </motion.h1>
            <motion.p
              style={{
                opacity: useTransform(
                  scrollYProgress,
                  [0, 0.3, 0.7, 1],
                  [0, 1, 1, 0],
                ),
                y: useTransform(
                  scrollYProgress,
                  [0, 0.3, 0.7, 1],
                  isMobile
                    ? ['20px', '0px', '0px', '-20px']
                    : ['30px', '0px', '0px', '-30px'],
                ),
              }}
              className={`parallax-element ${textSizeP} max-w-md mx-auto text-white text-opacity-80 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]`}
            >
              New Album
            </motion.p>
          </div>
        </div>
      </div>

    
    </>
  );
};

export default ParallaxScene;
