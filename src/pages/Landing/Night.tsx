import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import leaves from '../../images/cover/leaves.png';
import moon from '../../images/cover/moon.png';
import bird from '../../images/cover/bird.png';
import mountains from '../../images/cover/mountain.png';

const ParallaxScene = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Moon: subtle movement
  const moonY = useTransform(scrollYProgress, [0, 0.5, 1], ['10%', '25%', '40%']);
  const moonX = useTransform(scrollYProgress, [0, 1], ['350%', '50%']);
  const moonScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1.1]);
  const moonOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.7, 1, 0.9, 0.8]);

  // Mountains: moved up to interact with moon
  const mountainsY = useTransform(scrollYProgress, [0, 0.5, 1], ['10%', '30%', '20%']);
  const mountainsScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const mountainsOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.95, 0.9]);

  // Leaves: refined scale and movement
  const leavesScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.75, 2.5]);
  const leavesY = useTransform(scrollYProgress, [0, 0.5, 1], ['-25%', '-15%', '-5%']);
  const leavesOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.9, 0.8]);

  // Bird: bottom-right to top-left path, larger size
  // Start off-screen bottom-right, move through center, to top-left
  const birdX = useTransform(scrollYProgress, [0, 0.5, 1], ['100%', '40%', '-20%']);
  const birdY = useTransform(scrollYProgress, [0, 0.5, 1], ['10%', '40%', '-10%']);
  const birdRotate = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const birdScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 1.5]);

  return (
    <div ref={ref} className="relative h-[300vh] bg-gradient-to-b from-black via-gray-900 to-blue-900 overflow-hidden">
      {/* Stars (added element) */}
      <div className="absolute inset-0 z-0">
        {[...Array(100)].map((_, i) => (
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
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
            }}
          />
        ))}
      </div>

      {/* Moon */}
      <motion.div
        style={{ 
          y: moonY,
          x: moonX,
          scale: moonScale,
          opacity: moonOpacity
        }}
        className="absolute top-0 left-0 transform -translate-x-1/2 z-10"
      >
        <img src={moon} alt="moon" className="w-48 h-48 md:w-64 md:h-64 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
      </motion.div>

      {/* Mountains - repositioned to interact with moon */}
      <motion.div
        style={{ 
          y: mountainsY,
          scale: mountainsScale,
          opacity: mountainsOpacity
        }}
        className="absolute top-0 w-full z-20" 
      >
        <img
          src={mountains}
          alt="mountains"
          className="w-full object-cover"
        />
      </motion.div>

      {/* Atmospheric fog (added element) */}
      <motion.div
        style={{ 
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.15, 0.3, 0.1]),
          y: useTransform(scrollYProgress, [0, 1], ['100%', '30%']),
        }}
        className="absolute bottom-0 left-0 w-full h-full z-25"
      >
        <div className="w-full h-1/3 bg-white opacity-20 blur-xl"></div>
      </motion.div>

      {/* Leaves */}
      <motion.div
        style={{ 
          y: leavesY, 
          scale: leavesScale,
          opacity: leavesOpacity
        }}
        className="absolute top-0 left-0 w-full z-30 pointer-events-none origin-center"
      >
        <img src={leaves} alt="leaves" className="w-full object-contain" />
      </motion.div>

      {/* Main Bird - larger and with bottom-right to top-left path */}
      <motion.div
        style={{ 
          x: birdX, 
          y: birdY,
          rotate: birdRotate,
          scale: birdScale
        }}
        className="absolute bottom-0 right-0 w-32 h-32 md:w-40 md:h-40 z-40 drop-shadow-lg"
      >
        <img src={bird} alt="bird" className="w-full h-full object-contain" />
      </motion.div>

      {/* Content overlay (added element) */}
      <div className="relative z-50 h-full">
        <div className="sticky top-1/3 text-center px-6">
          <motion.h1 
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
              y: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], ['50px', '0px', '0px', '-50px']),
            }}
            className="text-4xl md:text-6xl font-bold mb-4 text-white"
          >
            Parallax Journey
          </motion.h1>
          <motion.p 
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]),
              y: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ['30px', '0px', '0px', '-30px']),
            }}
            className="text-lg md:text-xl max-w-lg mx-auto text-white text-opacity-80"
          >
            Scroll to explore the magical landscape
          </motion.p>
        </div>
      </div>
    </div>
    
  );
};

export default ParallaxScene;