import { useState, useRef, useEffect } from 'react';

export default function VinylCarousel3D() {
  const [vinyls, setVinyls] = useState([
    { id: 1, title: "Thriller", artist: "Michael Jackson", cover: "thriller.jpg", color: "bg-red-500" },
    { id: 2, title: "Back in Black", artist: "AC/DC", cover: "backinblack.jpg", color: "bg-black" },
    { id: 3, title: "The Dark Side of the Moon", artist: "Pink Floyd", cover: "darkside.jpg", color: "bg-purple-700" },
    { id: 4, title: "Abbey Road", artist: "The Beatles", cover: "abbeyroad.jpg", color: "bg-blue-500" },
    { id: 5, title: "Rumours", artist: "Fleetwood Mac", cover: "rumours.jpg", color: "bg-yellow-600" },
    { id: 6, title: "Nevermind", artist: "Nirvana", cover: "nevermind.jpg", color: "bg-teal-500" },
    { id: 7, title: "Purple Rain", artist: "Prince", cover: "purplerain.jpg", color: "bg-purple-500" },
    { id: 8, title: "Born to Run", artist: "Bruce Springsteen", cover: "borntorun.jpg", color: "bg-gray-600" },
    { id: 9, title: "Random Access Memories", artist: "Daft Punk", cover: "randomaccess.jpg", color: "bg-yellow-400" },
  ]);
  
  const [activeIndex, setActiveIndex] = useState(4);
  const [isRotating, setIsRotating] = useState(false);
  const carouselRef = useRef(null);
  const animationRef = useRef(null);
  
  // Number of visible vinyls on each side
  const visibleItems = 7;
  
  const handleScroll = (direction) => {
    if (isRotating) return;
    
    setIsRotating(true);
    
    if (direction === 'left' && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else if (direction === 'right' && activeIndex < vinyls.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      setIsRotating(false);
      return;
    }
    
    // Reset rotation state after animation completes
    setTimeout(() => {
      setIsRotating(false);
    }, 350);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handleScroll('left');
      } else if (e.key === 'ArrowRight') {
        handleScroll('right');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, isRotating]);
  
  // Handle wheel navigation
  useEffect(() => {
    const handleWheel = (e) => {
      if (isRotating) return;
      
      if (e.deltaY < 0) {
        handleScroll('left');
      } else {
        handleScroll('right');
      }
    };
    
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('wheel', handleWheel, { passive: false });
      return () => carousel.removeEventListener('wheel', handleWheel);
    }
  }, [activeIndex, isRotating]);

  // Calculate positions and styles for each vinyl
  const getVinylStyle = (index) => {
    const totalVinyls = vinyls.length;
    const position = index - activeIndex;
    
    // For circular motion, we'll use trigonometric functions
    // to position elements along an elliptical path
    
    // Angle in radians (distribute vinyls around half a circle)
    const maxAngle = Math.PI * 0.5; // 90 degrees total span
    const angleStep = maxAngle / (visibleItems / 2);
    const angle = position * angleStep;
    
    // Set base properties
    let opacity = 1;
    let scale = 1;
    let zIndex = 100 - Math.abs(position);
    
    // Calculate 3D transformations
    const radius = 300; // Radius of the circular path
    
    // X position (horizontal) - follows a sine curve
    const translateX = radius * Math.sin(angle);
    
    // Z position (depth) - follows a cosine curve (negative to go away from viewer)
    const translateZ = -radius * (1 - Math.cos(angle));
    
    // Y position (vertical) - add a slight vertical offset for vinyls farther from center
    const translateY = Math.abs(position) * 15;
    
    // Scale down elements farther from center
    scale = Math.max(0.4, 1 - Math.abs(position) * 0.15);
    
    // Reduce opacity for elements farther from center
    opacity = Math.max(0.3, 1 - Math.abs(position) * 0.2);
    
    // Hide elements that are too far from active index
    if (Math.abs(position) > visibleItems / 2) {
      opacity = 0;
      scale = 0;
    }
    
    return {
      transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) scale(${scale})`,
      opacity,
      zIndex
    };
  };

  // Rotation animation for vinyl records
  const getVinylRotation = (index) => {
    const position = index - activeIndex;
    const isActive = position === 0;
    
    return {
      animation: isActive ? 'spin 12s linear infinite' : 'none'
    };
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-graydark to-black overflow-hidden">
      <h1 className="text-3xl font-bold text-white mb-8">3D Vinyl Browser</h1>
      
      {/* Perspective container */}
      <div 
        className="w-full h-96 relative"
        style={{ perspective: '1200px' }}
      >
        {/* 3D scene */}
        <div 
          ref={carouselRef}
          className="w-full h-full flex items-center justify-center"
          style={{ 
            transformStyle: 'preserve-3d',
            transition: 'transform 0.35s ease-out',
          }}
          tabIndex={0}
        >
          {/* Left navigation button */}
          <button 
            onClick={() => handleScroll('left')}
            disabled={activeIndex === 0 || isRotating}
            className="absolute left-6 z-50 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full p-4 text-white disabled:opacity-30 transition-all"
            aria-label="Previous vinyl"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          
          {/* Vinyls */}
          {vinyls.map((vinyl, index) => (
            <div
              key={vinyl.id}
              className="absolute w-64 h-64 transition-all duration-300 cursor-pointer"
              style={{
                ...getVinylStyle(index),
                transformStyle: 'preserve-3d',
              }}
              onClick={() => !isRotating && setActiveIndex(index)}
            >
              {/* Vinyl record with hole and grooves */}
              <div 
                className={`w-full h-full rounded-full ${vinyl.color} shadow-2xl flex items-center justify-center relative overflow-hidden`}
                style={{
                  ...getVinylRotation(index),
                  transformStyle: 'preserve-3d',
                  boxShadow: index === activeIndex ? '0 0 30px rgba(255,255,255,0.4)' : 'none'
                }}
              >
                {/* Center label */}
                <div className="absolute w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center z-10">
                  <div className="w-4 h-4 bg-gray-800 rounded-full"></div>
                </div>
                
                {/* Vinyl grooves - circular lines */}
                <div className="absolute w-60 h-60 rounded-full border border-black opacity-20"></div>
                <div className="absolute w-52 h-52 rounded-full border border-black opacity-20"></div>
                <div className="absolute w-44 h-44 rounded-full border border-black opacity-20"></div>
                <div className="absolute w-36 h-36 rounded-full border border-black opacity-20"></div>
                <div className="absolute w-28 h-28 rounded-full border border-black opacity-20"></div>
                
                {/* Light reflection */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1/3 bg-white opacity-10 rounded-t-full"
                  style={{ transform: 'translateZ(1px)' }}
                ></div>
              </div>
              
              {/* Title for active vinyl */}
              {index === activeIndex && (
                <div className="absolute -bottom-16 text-center text-white w-64 font-bold">
                  <div className="text-xl mb-1">{vinyl.title}</div>
                  <div className="text-sm text-gray-300">{vinyl.artist}</div>
                </div>
              )}
            </div>
          ))}
          
          {/* Right navigation button */}
          <button 
            onClick={() => handleScroll('right')}
            disabled={activeIndex === vinyls.length - 1 || isRotating}
            className="absolute right-6 z-50 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full p-4 text-white disabled:opacity-30 transition-all"
            aria-label="Next vinyl"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Track indicator */}
      <div className="mt-20 text-gray-400 flex flex-col items-center">
        <div className="flex space-x-1 mb-4">
          {vinyls.map((_, index) => (
            <div 
              key={index} 
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${index === activeIndex ? 'bg-white scale-125' : 'bg-gray-600'}`}
              onClick={() => setActiveIndex(index)}
            ></div>
          ))}
        </div>
        <p>Use arrow keys or mouse wheel to navigate</p>
        <p className="mt-2">
          <span className="text-white font-bold">{activeIndex + 1}</span> of <span>{vinyls.length}</span>
        </p>
      </div>
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}