import { useState, useEffect, useRef } from 'react';
import children from '../../images/cover/children.png';
import music from '../../images/cover/music.png';

// Mock data for the vinyl records/albums
const albums = [
  { id: 1, title: 'Solar Flares', artist: 'Cosmic Beats', color: 'bg-red-500' },
  {
    id: 2,
    title: 'Orbital Echoes',
    artist: 'Stellar Sound',
    color: 'bg-blue-500',
    coverImage: children, // Use this for placeholder, replace with real URLs in production
  },
  {
    id: 3,
    title: 'Galactic Dreams',
    artist: 'Nebula Noise',
    color: 'bg-purple-500',
  },
  {
    id: 4,
    title: 'Event Horizon',
    artist: 'Black Hole Beats',
    color: 'bg-green-500',
  },
  {
    id: 5,
    title: 'Interstellar Groove',
    artist: 'Astral Audio',
    color: 'bg-yellow-500',
  },
];

export default function VinylSolarSystemSection() {
  const [selectedVinylId, setSelectedVinylId] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [vinylDiscRotation, setVinylDiscRotation] = useState(0); // Rotation for the vinyl disc itself
  const [isAnimating, setIsAnimating] = useState(true);
  const [rotationDirection, setRotationDirection] = useState(1); // 1 for clockwise, -1 for counterclockwise
  const [rotationSpeed, setRotationSpeed] = useState(0.3); // Base rotation speed
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  // Swipe control variables
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragDeltaX, setDragDeltaX] = useState(0); // Track current drag movement
  const [lastSwipeX, setLastSwipeX] = useState(0);
  const [lastSwipeTime, setLastSwipeTime] = useState(0);
  const [swipeVelocity, setSwipeVelocity] = useState(0);
  const [swipeBoost, setSwipeBoost] = useState(0);

  // Snap effect variables
  const [isSnapping, setIsSnapping] = useState(false);
  const [targetRotation, setTargetRotation] = useState(null);
  const [snapProgress, setSnapProgress] = useState(0);

  // Reactive rotation for vinyl discs
  const [vinylDiscSpeed, setVinylDiscSpeed] = useState(1);

  // Responsive parameters
  const getResponsiveValues = () => {
    const width = windowSize.width;

    if (width < 640) {
      // Mobile
      return {
        orbitRadius: 200,
        sunSize: 200,
        vinylFrameWidth: 170,
        vinylFrameHeight: 140,
        vinylSize: 90,
      };
    } else if (width < 768) {
      // Small tablet
      return {
        orbitRadius: 200,
        sunSize: 200,
        vinylFrameWidth: 180,
        vinylFrameHeight: 160,
        vinylSize: 110,
      };
    } else if (width < 1024) {
      // Tablet
      return {
        orbitRadius: 200,
        sunSize: 200,
        vinylFrameWidth: 190,
        vinylFrameHeight: 180,
        vinylSize: 130,
      };
    } else if (width < 1280) {
      // Small desktop
      return {
        orbitRadius: 240,
        sunSize: 240,
        vinylFrameWidth: 210,
        vinylFrameHeight: 250,
        vinylSize: 150,
      };
    } else {
      // Large desktop
      return {
        orbitRadius: 280,
        sunSize: 260,
        vinylFrameWidth: 230,
        vinylFrameHeight: 300,
        vinylSize: 160,
      };
    }
  };

  const responsiveValues = getResponsiveValues();

  // Get the selected album
  const selectedAlbum = albums.find((album) => album.id === selectedVinylId);

  // Window resize effect
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Initial size
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to calculate nearest album snap position
  const calculateNearestSnap = () => {
    // Calculate angle per album
    const anglePerAlbum = 360 / albums.length;

    // Find which album position is closest to the front (270 degrees)
    const currentRotationNormalized = rotation % 360;

    // Calculate closest snap angle
    let closestIndex = 0;
    let smallestDiff = Infinity;

    for (let i = 0; i < albums.length; i++) {
      const albumAngle = (i * anglePerAlbum) % 360;
      // Calculate how far this album is from the front position (270 degrees)
      const albumPositionInRotation =
        (albumAngle + currentRotationNormalized) % 360;
      const distanceToFront = Math.abs(
        (albumPositionInRotation - 270 + 360) % 360,
      );

      if (distanceToFront < smallestDiff) {
        smallestDiff = distanceToFront;
        closestIndex = i;
      }
    }

    // Calculate target rotation to bring that album to the front
    const targetAlbumAngle = closestIndex * anglePerAlbum;
    const currentAlbumAngle =
      (targetAlbumAngle + currentRotationNormalized) % 360;
    const angleToRotate = (270 - currentAlbumAngle + 360) % 360;

    // Return the new target rotation
    return (currentRotationNormalized + angleToRotate) % 360;
  };

  // Function to initiate snap effect
  const snapToNearestAlbum = () => {
    if (isSnapping) return;

    const target = calculateNearestSnap();
    setTargetRotation(target);
    setIsSnapping(true);
    setSnapProgress(0);
  };

  // Function to set rotation based on selected album
  const focusOnAlbum = (albumId) => {
    if (!albumId) return;

    const index = albums.findIndex((album) => album.id === albumId);
    if (index === -1) return;

    // Calculate what the rotation should be to center this album at the front (270 degrees)
    const anglePerAlbum = 360 / albums.length;
    const currentAngle = (rotation + index * anglePerAlbum) % 360;
    const targetAngle = 270; // Front center position
    const angleToRotate = (targetAngle - currentAngle + 360) % 360;

    setRotation((prev) => (prev + angleToRotate) % 360);
  };

  // Animation effect for rotating the vinyl discs when selected
  useEffect(() => {
    let animationFrameId;

    const animateVinylDisc = () => {
      if (selectedVinylId) {
        setVinylDiscRotation((prev) => (prev + vinylDiscSpeed) % 360);
        animationFrameId = requestAnimationFrame(animateVinylDisc);
      }
    };

    if (selectedVinylId) {
      animationFrameId = requestAnimationFrame(animateVinylDisc);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [selectedVinylId, vinylDiscSpeed]);

  // Animation effect for rotating the vinyls with swipe influence and snap effect
  useEffect(() => {
    let animationFrameId;
    let lastTimestamp = 0;

    const animate = (timestamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      setRotation((prev) => {
        // Handle snap animation
        if (isSnapping && targetRotation !== null) {
          // Update snap progress
          setSnapProgress((progress) => {
            const newProgress = Math.min(1, progress + deltaTime / 300); // 300ms snap duration

            // If we've reached the end of the snap animation
            if (newProgress >= 1) {
              setIsSnapping(false);
              setTargetRotation(null);
              return 0;
            }

            return newProgress;
          });

          // Easing function for smooth snap (ease-out cubic)
          const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
          const easedProgress = easeOutCubic(snapProgress);

          // Calculate the shortest angular distance between current and target
          const shortestDistance = ((targetRotation - prev + 540) % 360) - 180;

          // Apply the snap animation
          return (
            (prev + (shortestDistance * easedProgress * deltaTime) / 50) % 360
          );
        }

        // Calculate new rotation based on direction, speed, and time delta when not snapping
        let effectiveSpeed = rotationSpeed;

        // Apply swipe boost with faster decay
        if (swipeBoost > 0) {
          effectiveSpeed += swipeBoost;
          // Faster decay for more responsive feel
          setSwipeBoost((prev) => Math.max(0, prev - 0.08));
        }

        // If dragging, rotation is handled by swipe handler
        if (isDragging) {
          // Apply the dragDeltaX directly as rotation with a sensitivity factor
          // This makes the movement follow your finger instantly
          return (prev + dragDeltaX * 0.2 + 360) % 360;
        } else {
          // Normal animation when not dragging
          const moveAmount =
            (effectiveSpeed * rotationDirection * deltaTime) / 20;
          return (prev + moveAmount + 360) % 360;
        }
      });

      if (isAnimating || isDragging || swipeBoost > 0 || isSnapping) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    if (isAnimating || isDragging || swipeBoost > 0 || isSnapping) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [
    isAnimating,
    rotationDirection,
    rotationSpeed,
    swipeBoost,
    isDragging,
    dragDeltaX,
    isSnapping,
    targetRotation,
    snapProgress,
  ]);

  // Effect to focus on selected vinyl
  useEffect(() => {
    if (selectedVinylId) {
      setIsAnimating(false);
      focusOnAlbum(selectedVinylId);
    }
  }, [selectedVinylId]);

  // Background click handler
  const handleContainerClick = (e) => {
    // Only handle clicks directly on container (not on vinyls)
    if (
      e.target === containerRef.current ||
      e.target.classList.contains('orbit-container')
    ) {
      setSelectedVinylId(null);
      setIsAnimating(true);
    }
  };

  // Improved Swipe event handlers for immediate response
  const handleSwipeStart = (clientX) => {
    if (selectedVinylId) return; // Don't allow swiping when a vinyl is selected

    setIsDragging(true);
    setDragStartX(clientX);
    setLastSwipeX(clientX);
    setLastSwipeTime(Date.now());
    setDragDeltaX(0);
    setIsSnapping(false); // Cancel any ongoing snap when starting a new swipe
  };

  const handleSwipeMove = (clientX) => {
    if (!isDragging) return;

    // Calculate immediate movement since last position
    const moveDelta = clientX - lastSwipeX;
    setDragDeltaX(moveDelta);

    // Calculate velocity for natural feel
    const now = Date.now();
    const timeDelta = now - lastSwipeTime;

    if (timeDelta > 10) {
      // Only update every 10ms for stability
      const velocity = (moveDelta / Math.max(1, timeDelta)) * 15; // Scale for better feel
      setSwipeVelocity(velocity);

      // Update direction immediately for responsive feel
      if (Math.abs(velocity) > 0.2) {
        const direction = velocity > 0 ? 1 : -1;
        if (rotationDirection !== direction) {
          setRotationDirection(direction);
        }
      }

      // Update for next move calculation
      setLastSwipeX(clientX);
      setLastSwipeTime(now);
    }
  };

  const handleSwipeEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);
    setDragDeltaX(0);

    // Apply final velocity as an impulsive boost
    if (Math.abs(swipeVelocity) > 0.5) {
      const boost = Math.min(3, Math.abs(swipeVelocity) / 3);
      setSwipeBoost(boost);

      // If swipe was strong enough, don't snap immediately
      // This allows the carousel to keep momentum before snapping
      if (boost > 1) {
        // Schedule snap after momentum decays
        setTimeout(() => {
          if (!isDragging) {
            snapToNearestAlbum();
          }
        }, 400);
      } else {
        // For gentler swipes, snap immediately
        snapToNearestAlbum();
      }
    } else {
      // If there was barely any velocity, snap immediately
      snapToNearestAlbum();
    }

    if (!isAnimating) {
      setIsAnimating(true);
    }
  };

  // Mouse event handlers
  const handleMouseDown = (e) => handleSwipeStart(e.clientX);
  const handleMouseMove = (e) => handleSwipeMove(e.clientX);
  const handleMouseUp = () => handleSwipeEnd();

  // Touch event handlers
  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      handleSwipeStart(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleSwipeMove(e.touches[0].clientX);

      // Prevent page scrolling while swiping
      if (isDragging) {
        e.preventDefault();
      }
    }
  };

  const handleTouchEnd = () => handleSwipeEnd();

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-graydark to-black p-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
          Dive into the music<span className="text-pink-500">..!!!</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-8">
          Explore your favourite{' '}
          <span className="text-yellow-400 font-semibold">Gyakie</span> tracks
          and moments.
        </p>
      </div>

      {/* Solar System Container */}

      <div
        ref={containerRef}
        className="relative w-full max-w-5xl aspect-video orbit-container cursor-grab active:cursor-grabbing touch-none"
        onClick={handleContainerClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Moon */}
        <div
          className="absolute left-1/2 top-1/2 rounded-full bg-gray transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-gray z-20"
          style={{
            width: `${responsiveValues.sunSize}px`,
            height: `${responsiveValues.sunSize}px`,
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray to-graydark animate-pulse"></div>
          <div className="absolute inset-2 rounded-full bg-yellow-300 opacity-80"></div>
          <div className="absolute inset-8 rounded-full bg-yellow-200 opacity-60"></div>
          <div className="absolute inset-0 rounded-full shadow-inner"></div>
        </div>

        {/* Vinyl Records/Albums */}
        {albums.map((album, index) => {
          // Calculate position based on orbit radius and angle
          // Distribute vinyls evenly around the orbit
          const angle = (rotation + index * (360 / albums.length)) % 360;
          const radian = angle * (Math.PI / 180);

          // When a vinyl is selected, calculate different positions
          let x, y, sizeScale, opacity, zIndex;

          if (selectedVinylId && selectedVinylId === album.id) {
            // Selected vinyl - center it in front of the sun
            x = 0;
            y = -(responsiveValues.orbitRadius * 0.4); // Position it above the sun
            sizeScale = 1.2; // Make it larger
            opacity = 1;
            zIndex = 50; // Always on top
          } else if (selectedVinylId) {
            // Other vinyls when one is selected - hide them
            x = Math.cos(radian) * responsiveValues.orbitRadius;
            y = Math.sin(radian) * (responsiveValues.orbitRadius * 0.4);
            sizeScale = 0.7;
            opacity = 0.3;
            zIndex = 15;
          } else {
            // Normal orbit behavior when no vinyl is selected
            x = Math.cos(radian) * responsiveValues.orbitRadius;
            y = Math.sin(radian) * (responsiveValues.orbitRadius * 0.4);

            // Calculate depth factor for perspective effect
            const normalizedYPos = (Math.sin(radian) + 1) / 2;
            const depthFactor = normalizedYPos * 0.6 + 0.4;
            const isBehindSun = Math.sin(radian) < 0;

            sizeScale = isBehindSun ? depthFactor : 1;
            opacity = depthFactor;
            zIndex = isBehindSun ? 10 : 30;
          }

          // Determine if this album is at the front position (for highlight effect)
          const isFrontPosition =
            Math.abs(angle - 270) < 15 && !selectedVinylId;

          return (
            <div
              key={album.id}
              className={`absolute left-1/2 top-1/2 ${
                isFrontPosition
                  ? 'transition-all duration-300'
                  : 'transition-opacity duration-300'
              }`}
              style={{
                transform: `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${sizeScale})`,
                opacity: opacity,
                zIndex: zIndex,
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (selectedVinylId === album.id) {
                  // If clicking on already selected vinyl, deselect it
                  setSelectedVinylId(null);
                  setIsAnimating(true);
                } else if (opacity > 0.7) {
                  // Only select visible vinyls
                  setSelectedVinylId(album.id);
                }
              }}
            >
              {/* Platinum frame with vinyl and info */}
              <div
                className={`bg-gradient-to-b from-primary to-graydark rounded-lg p-1 sm:p-2 shadow-xl border ${
                  selectedVinylId === album.id || isFrontPosition
                    ? ' border-blue-500 border-opacity-40 border-2'
                    : 'border-blue-300 border-2'
                } ${isFrontPosition ? 'shadow-yellow-400 shadow-md' : ''}`}
                style={{
                  width: `${responsiveValues.vinylFrameWidth}px`,
                  //  height: `${responsiveValues.vinylFrameHeight}px`,
                }}
              >
                {/* Vinyl disc with rotation effect */}
                <div
                  className={`rounded-full ${album.color} flex items-center justify-center relative overflow-hidden mx-auto`}
                  style={{
                    width: `${responsiveValues.vinylSize}px`,
                    height: `${responsiveValues.vinylSize}px`,
                    transform:
                      selectedVinylId === album.id
                        ? `rotate(${vinylDiscRotation}deg)`
                        : 'none',
                    transition:
                      selectedVinylId !== album.id
                        ? 'transform 0.5s ease-out'
                        : 'none',
                  }}
                >
                  {/* Album cover image as background */}
                  <div
                    className="absolute inset-0 rounded-full overflow-hidden opacity-80"
                    style={{
                      backgroundImage: `url(${album.coverImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  ></div>

                  {/* Overlay tint to blend with vinyl color */}
                  <div
                    className={`absolute inset-0 rounded-full ${album.color} opacity-50`}
                  ></div>
                  {/* Center hole */}
                  <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full bg-graydark"></div>

                  {/* Grooves */}
                  <div className="absolute w-3/4 h-3/4 rounded-full border border-black sm:border-2 opacity-20"></div>
                  <div className="absolute w-1/2 h-1/2 rounded-full border border-black sm:border-2 opacity-20"></div>
                  <div className="absolute w-1/4 h-1/4 rounded-full border border-black sm:border-2 opacity-20"></div>

                  {/* Record label (doesn't rotate with disc) */}
                  <div
                    className="absolute w-1/4 h-1/4 rounded-full bg-white flex items-center justify-center"
                    style={{
                      transform:
                        selectedVinylId === album.id
                          ? `rotate(-${vinylDiscRotation}deg)`
                          : 'none',
                    }}
                  >
                    <span
                      className="text-xs text-black font-bold truncate"
                      style={{ fontSize: '0.5rem' }}
                    >
                      {album.artist.substring(0, 3)}
                    </span>
                  </div>

                  {/* Reflection */}
                  <div className="absolute top-0 left-0 right-0 h-1/4 bg-white opacity-10 rounded-t-full"></div>
                </div>

                {/* Title and artist info - redesigned */}
                <div className="flex flex-col bg-gray-800 bg-opacity-75 backdrop-blur-sm rounded-lg shadow-lg mt-2 border border-gray-700 overflow-hidden">
                  <div className="flex items-center gap-3 p-3">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden shadow-inner">
                        <img
                          src={music}
                          className="h-8 w-8 object-cover opacity-90"
                          alt="Music icon"
                        />
                      </div>
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-sm md:text-base font-bold text-white leading-tight trancate">
                        {album.title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-300 opacity-90">
                        {album.artist}
                      </p>
                    </div>
                  </div>

                  {/* Centered play button at bottom */}
                  <div className="w-full flex justify-center pb-3 pt-1">
                    <button className="flex items-center justify-center gap-1 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white font-medium rounded-full px-6 py-1.5 text-xs transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653z" />
                      </svg>
                      <span>Play</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Album details when selected */}
      {selectedAlbum && (
        <div className="mt-2 sm:mt-3 md:mt-6 bg-gray-800 p-2 sm:p-3 md:p-4 rounded-lg text-white max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-center">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
            {selectedAlbum.title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300">
            {selectedAlbum.artist}
          </p>

          <div className="mt-2 md:mt-3 text-xs sm:text-sm text-gray-400">
            <p>
              Click on the vinyl again or outside the orbit to return to the
              solar system view.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
