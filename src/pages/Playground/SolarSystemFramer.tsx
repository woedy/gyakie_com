import { useEffect, useState } from 'react';
 import children from '../../images/cover/children.png';

 export default function VinylSolarSystem({ }) {
  const [rotation, setRotation] = useState(0);
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const animationFrame = requestAnimationFrame(function animate() {
      setRotation(prev => (prev + 0.03) % 360);
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const planetScaleFactor = isMobile ? 0.6 : isTablet ? 0.8 : 1;
  const orbitScaleFactor = isMobile ? 0.4 : isTablet ? 0.6 : 1;
  const starCount = isMobile ? 60 : isTablet ? 90 : 120;
  const moonSize = isMobile ? 40 : isTablet ? 50 : 56;

  const planets = [
    { name: "Mercury", size: 30 * planetScaleFactor, distance: 100 * orbitScaleFactor, speed: 3.5, initialAngle: 45, image: children },
    { name: "Venus", size: 45 * planetScaleFactor, distance: 150 * orbitScaleFactor, speed: 1.4, initialAngle: 120, image: children },
    { name: "Earth", size: 50 * planetScaleFactor, distance: 200 * orbitScaleFactor, speed: 0.9, initialAngle: 190, image: children },
    { name: "Mars", size: 35 * planetScaleFactor, distance: 250 * orbitScaleFactor, speed: 0.55, initialAngle: 280, image: children },
    { name: "Jupiter", size: 70 * planetScaleFactor, distance: 350 * orbitScaleFactor, speed: 0.37, initialAngle: 10, image: children },
    { name: "Saturn", size: 65 * planetScaleFactor, distance: 450 * orbitScaleFactor, speed: 0.13, initialAngle: 85, hasRings: true, image: children },
    { name: "Uranus", size: 55 * planetScaleFactor, distance: 550 * orbitScaleFactor, speed: 0.11, initialAngle: 170, image: children },
    { name: "Neptune", size: 55 * planetScaleFactor, distance: 650 * orbitScaleFactor, speed: 0.15, initialAngle: 230, image: children },
  ];

  const calculatePlanetPosition = (planet, time) => {
    const angle = (time * planet.speed + planet.initialAngle) % 360;
    const radians = (angle * Math.PI) / 180;

    const x = Math.cos(radians) * planet.distance;
    const y = Math.sin(radians) * planet.distance * 0.2;

    return { x, y, angle };
  };

  const createStars = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1 + 0.5 * planetScaleFactor,
      opacity: Math.random() * 0.5 + 0.1,
    }));
  };

  const stars = createStars(starCount);

  const handlePlanetMouseEnter = (planetName) => {
    setHoveredPlanet(planetName);
  };

  const handlePlanetMouseLeave = () => {
    setHoveredPlanet(null);
  };

  const getPlanetScale = (planetName) => {
    return hoveredPlanet === planetName ? 1.35 : 1;
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-black via-black to-black">
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className="absolute rounded-full bg-gray-2"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            boxShadow: '0 0 1px rgba(200, 200, 200, 0.5)',
          }}
        />
      ))}

      {/* Solar System Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Orbital Paths */}
        <div
          className="absolute"
          style={{
            transform: `rotateX(65deg) rotateZ(${rotation}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {planets.map((planet, index) => (
            <div
              key={`orbit-${index}`}
              className="absolute rounded-full border border-gray-600 border-opacity-15"
              style={{
                left: '50%',
                top: '50%',
                width: `${planet.distance * 2}px`,
                height: `${planet.distance * 2}px`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>

        {/* Moon */}
        <div
          className={`absolute rounded-full z-10 bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center`}
          style={{
            width: `${moonSize * 4}px`,
            height: `${moonSize * 4}px`,
            boxShadow: '0 0 80px rgba(200, 200, 200, 0.5), inset -10px -10px 30px rgba(0, 0, 0, 0.3)',
            backgroundImage: 'radial-gradient(circle at 50% 50%, #ddd, #888)',
          }}
        >
          {/* You could add subtle "crater" elements here as well for more detail */}
        </div>

        {/* Planets Container */}
        <div className="absolute">
          {planets.map((planet, index) => {
            const position = calculatePlanetPosition(planet, rotation);
            const scale = getPlanetScale(planet.name);

            return (
              <div
                key={`planet-container-${index}`}
                className="absolute transition-transform duration-200 ease-in-out"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`,
                  zIndex: position.y > 0 ? 20 : 5,
                }}
                onMouseEnter={() => handlePlanetMouseEnter(planet.name)}
                onMouseLeave={handlePlanetMouseLeave}
              >
                {/* Vinyl Record Planet */}
                <div
                  className="rounded-full cursor-pointer flex items-center justify-center overflow-hidden"
                  style={{
                    width: `${planet.size * scale}px`,
                    height: `${planet.size * scale}px`,
                    backgroundColor: 'rgba(50, 50, 50, 0.9)',
                    boxShadow: `0 0 15px rgba(0, 0, 0, 0.7), inset 0 0 10px rgba(0, 0, 0, 0.9)`,
                    transform: `scale(${scale})`,
                    transition: 'transform 0.2s ease-in-out',
                  }}
                >
                  {planet.image && (
                    <img
                      src={planet.image}
                      alt={planet.name}
                      className="w-full h-full object-cover rounded-full"
                      style={{ opacity: 0.9 }}
                    />
                  )}
                  {!planet.image && (
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center">
                      <div className="w-2/3 h-2/3 rounded-full bg-black border-2 border-gray-500" /> {/* Inner label */}
                    </div>
                  )}
                </div>


              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
 }