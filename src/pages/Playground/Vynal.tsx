import { useState, useRef, useEffect } from 'react';
import moon from '../../images/cover/moon.png';
import music from '../../images/cover/music.png';
import children from '../../images/cover/children.png';


export default function VinylCarousel3D() {
  const [vinyls, setVinyls] = useState([
    {
      id: 1,
      title: 'Thriller',
      artist: 'Michael Jackson',
      cover: children,
      color: 'bg-red-500',
    },
    {
      id: 2,
      title: 'Back in Black',
      artist: 'AC/DC',
      cover: moon,
      color: 'bg-black',
    },
    {
      id: 3,
      title: 'The Dark Side of the Moon',
      artist: 'Pink Floyd',
      cover: moon,
      color: 'bg-purple-700',
    },
    {
      id: 4,
      title: 'Abbey Road',
      artist: 'The Beatles',
      cover: moon,
      color: 'bg-blue-500',
    },
    {
      id: 5,
      title: 'Rumours',
      artist: 'Fleetwood Mac',
      cover: moon,
      color: 'bg-yellow-600',
    },
    {
      id: 6,
      title: 'Nevermind',
      artist: 'Nirvana',
      cover: moon,
      color: 'bg-teal-500',
    },
    {
      id: 7,
      title: 'Purple Rain',
      artist: 'Prince',
      cover: moon,
      color: 'bg-purple-500',
    },
    {
      id: 8,
      title: 'Born to Run',
      artist: 'Bruce Springsteen',
      cover: moon,
      color: 'bg-gray-600',
    },
    {
      id: 9,
      title: 'Random Access Memories',
      artist: 'Daft Punk',
      cover: moon,
      color: 'bg-yellow-400',
    },
    {
      id: 10,
      title: 'Abbey Road',
      artist: 'The Beatles',
      cover: moon,
      color: 'bg-blue-500',
    },
    {
      id: 11,
      title: 'Rumours',
      artist: 'Fleetwood Mac',
      cover: moon,
      color: 'bg-yellow-600',
    },
    {
      id: 12,
      title: 'Nevermind',
      artist: 'Nirvana',
      cover: moon,
      color: 'bg-teal-500',
    },
    {
      id: 13,
      title: 'Purple Rain',
      artist: 'Prince',
      cover: moon,
      color: 'bg-purple-500',
    },
    {
      id: 14,
      title: 'Born to Run',
      artist: 'Bruce Springsteen',
      cover: moon,
      color: 'bg-gray-600',
    },
    {
      id: 15,
      title: 'Random Access Memories',
      artist: 'Daft Punk',
      cover: moon,
      color: 'bg-yellow-400',
    },
  ]);

  const [activeIndex, setActiveIndex] = useState(4);
  const [isRotating, setIsRotating] = useState(false);
  const carouselRef = useRef(null);

  // Number of visible vinyls on each side
  const visibleItems = 9;

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
    const position = index - activeIndex;

    const maxAngle = Math.PI * 0.5;
    const angleStep = maxAngle / (visibleItems / 2);
    const angle = position * angleStep;

    let opacity = 1;
    let scale = 1;
    let zIndex = 100 - Math.abs(position);

    const radius = 600;
    const translateX = radius * Math.sin(angle);
    const translateZ = -radius * (1 - Math.cos(angle));
    const translateY = Math.abs(position) * 15;

    scale = Math.max(0.4, 1 - Math.abs(position) * 0.15);
    opacity = Math.max(0.3, 1 - Math.abs(position) * 0.2);

    if (Math.abs(position) > visibleItems / 2) {
      opacity = 0;
      scale = 0;
    }

    return {
      transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) scale(${scale})`,
      opacity,
      zIndex,
    };
  };

  // Rotation animation for vinyl records
  const getVinylRotation = (index) => {
    const position = index - activeIndex;
    const isActive = position === 0;

    return {
      animation: isActive ? 'spin 12s linear infinite' : 'none',
    };
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-graydark to-black overflow-hidden">
      <h1 className="text-3xl font-bold text-white mb-6 sm:text-3xl">
        Dive into the music..!!!
      </h1>
      <h1 className="text text-white mb-8 sm:text">
        Explore your favourite Gyakie Music
      </h1>

      {/* Perspective container */}
      <div className="w-full h-96 relative" style={{ perspective: '1200px' }}>
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
            className="absolute left-4 z-50 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full p-3 text-white disabled:opacity-30 transition-all sm:p-2"
            aria-label="Previous vinyl"
          >
            <svg
              className="w-5 h-5 sm:w-4 sm:h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Vinyls */}
          {vinyls.map((vinyl, index) => (
            <div
              key={vinyl.id}
              className={`absolute flex flex-col items-center transition-all duration-300 cursor-pointer bg-blue-500 bg-opacity-10 border-4 rounded-md border-blue-500 border-opacity-40 p-4 sm:p-2 space-y-4 sm:space-y-2 z-45 ${
                index === activeIndex
                  ? 'w-70 h-[25rem] sm:w-66 sm:h-[23rem]'
                  : 'w-72 h-[19rem] sm:w-48 sm:h-[12rem]'
              }`} // Increased size, added space-y for breathing room
              style={{
                ...getVinylStyle(index),
                transformStyle: 'preserve-3d',
              }}
              onClick={() => !isRotating && setActiveIndex(index)}
            >
              {/* Vinyl record with hole and grooves */}
              <div
                className={`rounded-full ${
                  vinyl.color
                } shadow-2xl flex items-center justify-center relative overflow-hidden ${
                  index === activeIndex
                    ? 'w-64 h-64 sm:w-48 sm:h-48'
                    : 'w-56 h-56 sm:w-40 sm:h-40'
                }`} // Explicit disc size for perfect roundness
                style={{
                  ...getVinylRotation(index),
                  transformStyle: 'preserve-3d',
                  boxShadow:
                    index === activeIndex
                      ? '0 0 30px rgba(255,255,255,0.4)'
                      : 'none',
                }}
              >
                {/* Album cover */}
                <img
                  src={vinyl.cover}
                  alt={`${vinyl.title} cover`}
                  className="absolute w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Center label */}
                <div
                  className={`absolute bg-gray-100 rounded-full flex items-center justify-center z-10 ${
                    index === activeIndex
                      ? 'w-20 h-20 sm:w-16 sm:h-16'
                      : 'w-16 h-16 sm:w-12 sm:h-12'
                  }`}
                >
                  <div
                    className={`bg-gray-800 rounded-full ${
                      index === activeIndex
                        ? 'w-4 h-4 sm:w-3 sm:h-3'
                        : 'w-3 h-3 sm:w-2 sm:h-2'
                    }`}
                  ></div>
                </div>

                {/* Vinyl grooves - circular lines */}
                <div
                  className={`absolute rounded-full border border-black opacity-20 ${
                    index === activeIndex
                      ? 'w-60 h-60 sm:w-44 sm:h-44'
                      : 'w-52 h-52 sm:w-36 sm:h-36'
                  }`}
                ></div>
                <div
                  className={`absolute rounded-full border border-black opacity-20 ${
                    index === activeIndex
                      ? 'w-52 h-52 sm:w-36 sm:h-36'
                      : 'w-44 h-44 sm:w-28 sm:h-28'
                  }`}
                ></div>
                <div
                  className={`absolute rounded-full border border-black opacity-20 ${
                    index === activeIndex
                      ? 'w-44 h-44 sm:w-28 sm:h-28'
                      : 'w-36 h-36 sm:w-20 sm:h-20'
                  }`}
                ></div>
                <div
                  className={`absolute rounded-full border border-black opacity-20 ${
                    index === activeIndex
                      ? 'w-36 h-36 sm:w-20 sm:h-20'
                      : 'w-28 h-28 sm:w-16 sm:h-16'
                  }`}
                ></div>
                <div
                  className={`absolute rounded-full border border-black opacity-20 ${
                    index === activeIndex
                      ? 'w-28 h-28 sm:w-12 sm:h-12'
                      : 'w-20 h-20 sm:w-8 sm:h-8'
                  }`}
                ></div>

                {/* Light reflection */}
                <div
                  className="absolute top-0 left-0 right-0 h-1/3 bg-white opacity-10 rounded-t-full"
                  style={{ transform: 'translateZ(1px)' }}
                ></div>
              </div>

              {/* Title for active vinyl */}
              {index === activeIndex && (
                <div className="text-center text-white font-bold w-full max-w-[90%] px-4 sm:px-2 pb-2 sm:pb-1 break-words">
                  <div className='flex gap-4'>

                    <div>
                      <img  src={music} className="h-10 w-10" />
                    </div>

                    <div>

                    <div className="text-xl mb-1 sm:text-lg">{vinyl.title}</div>
                  <div className="text-sm text-gray-300 sm:text-xs">
                    {vinyl.artist}
                  </div>
                  <div className="bg-white text-center rounded-full mt-3 text-sm text-black p-2 sm:text-xs">
                    Play
                  </div>
                    </div>


                  </div>
               
                </div>
              )}
            </div>
          ))}

          {/* Right navigation button */}
          <button
            onClick={() => handleScroll('right')}
            disabled={activeIndex === vinyls.length - 1 || isRotating}
            className="absolute right-4 z-50 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full p-3 text-white disabled:opacity-30 transition-all sm:p-2"
            aria-label="Next vinyl"
          >
            <svg
              className="w-5 h-5 sm:w-4 sm:h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Track indicator */}
      <div className="mt-10 text-gray-400 flex flex-col items-center sm:mt-6">
        <div className="flex space-x-1 mb-4">
          {vinyls.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                index === activeIndex ? 'bg-white scale-125' : 'bg-gray-600'
              }`}
              onClick={() => setActiveIndex(index)}
            ></div>
          ))}
        </div>
        <p className="text-sm sm:text-xs">
          Use arrow keys or mouse wheel to navigate
        </p>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
