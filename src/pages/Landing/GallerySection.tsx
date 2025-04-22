import React, { useState } from 'react';
import video1 from '../../images/cover/video1.png';


const ArtistGallerySection = () => {
  // Sample gallery data - replace with your actual gallery images
  const galleryImages = [
    {
      id: 1,
      src: video1,
      alt: "Live Concert Performance",
      category: "concerts"
    },
    {
      id: 2,
      src: video1,
      alt: "Studio Session",
      category: "studio"
    },
    {
      id: 3,
      src: video1,
      alt: "Backstage Moment",
      category: "backstage"
    },
    {
      id: 4,
      src: video1,
      alt: "Fan Meet & Greet",
      category: "fans"
    },
    {
      id: 5,
      src: video1,
      alt: "Tour Bus Life",
      category: "tour"
    },
    {
      id: 6,
      src: video1,
      alt: "Award Ceremony",
      category: "events"
    },
    {
      id: 7,
      src: video1,
      alt: "Festival Performance",
      category: "concerts"
    },
    {
      id: 8,
      src: video1,
      alt: "Recording Session",
      category: "studio"
    }
  ];

  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filterCategories = [
    { id: 'all', label: 'All Photos' },
    { id: 'concerts', label: 'Concerts' },
    { id: 'studio', label: 'Studio' },
    { id: 'backstage', label: 'Backstage' },
    { id: 'fans', label: 'Fans' },
    { id: 'tour', label: 'Tour Life' },
    { id: 'events', label: 'Events' }
  ];

  const filteredImages = activeFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    // Re-enable body scrolling
    document.body.style.overflow = 'auto';
  };

  return (
    <section className="bg-gradient-to-b from-blue-900 to-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-400 mb-4">Gallery</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore memorable moments from performances, studio sessions, and life on tour.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-8">
          <div className="flex overflow-x-auto py-2 space-x-4 no-scrollbar">
            {filterCategories.map((category) => (
              <button
                key={category.id}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition duration-300 ${
                  activeFilter === category.id
                    ? 'bg-blue-700 text-white'
                    : 'bg-gray-800 hover:bg-blue-800 text-blue-200'
                }`}
                onClick={() => setActiveFilter(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="relative overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => openModal(image)}
            >
              <div className="aspect-w-4 aspect-h-3 w-full">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 w-full">
                  <h3 className="text-white text-sm font-medium">{image.alt}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for zoomed image */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full">
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 text-white hover:text-blue-400 transition duration-300"
                aria-label="Close"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              
              {/* Modal image container */}
              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-blue-800">
                <img
                  src={selectedImage?.src}
                  alt={selectedImage?.alt}
                  className="w-full h-auto"
                />
                <div className="p-4 border-t border-blue-800">
                  <h3 className="text-xl font-bold text-blue-200">{selectedImage?.alt}</h3>
                </div>
              </div>
            </div>
            
            {/* Overlay click to close */}
            <div 
              className="absolute inset-0 -z-10" 
              onClick={closeModal}
              aria-hidden="true"
            ></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ArtistGallerySection;

// Add these styles to your CSS for proper aspect ratio support
// .aspect-w-4 {
//   position: relative;
//   padding-bottom: calc(3 / 4 * 100%);
// }
// .aspect-w-4 > * {
//   position: absolute;
//   height: 100%;
//   width: 100%;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;
// }