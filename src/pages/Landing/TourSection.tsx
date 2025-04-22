import React from 'react';

const TourSection = ({ tourDates, moon }) => {

  
  return (
    <section className="bg-gradient-to-b from-blue-900 to-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-16 text-center text-blue-400">Tours</h1>
        
        {/* Up Next Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h1 className="text-2xl font-bold mb-6 text-blue-300">Up Next</h1>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 bg-gray-900 shadow-xl rounded-lg p-6 relative overflow-hidden items-center border border-blue-700">
            {/* Square Image */}
            <div className="md:col-span-1 aspect-square w-full">
              <div className="w-full h-full overflow-hidden rounded-md">
                <img src={moon} alt="Event" className="w-full h-full object-cover" />
              </div>
            </div>
            
            {/* Location */}
            <div className="md:col-span-2">
              <h2 className="text-lg font-semibold text-blue-200">London</h2>
              <p className="text-gray-400">All Points East</p>
            </div>
            
            {/* Date */}
            <div className="md:col-span-2">
              <h2 className="text-md font-medium text-gray-300">20th April 2025</h2>
            </div>
            
            {/* Sold Out Ribbon */}
            <div className="md:col-span-1 relative">
              <div className="absolute top-0 right-0 transform rotate-45 bg-red-500 rounded text-white text-sm font-bold px-3 py-2 shadow-lg">
                Sold Out
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Headline */}
          <div className="col-span-1 flex flex-col justify-center">
            <h1 className="text-5xl md:text-6xl font-bold text-blue-400 leading-tight">
              Experience the Songbird
            </h1>
            <h1 className="text-5xl md:text-6xl font-bold text-blue-300 leading-tight">
              Whistle
            </h1>
          </div>
          
          {/* Right Column - Tour Dates */}
          <div className="col-span-1 md:col-span-2">
            <div className="p-2">
              <h1 className="text-2xl font-bold mb-6 text-blue-300">Tour Dates</h1>
              <ul className="space-y-4">
                {tourDates.map((tour, index) => (
                  <li
                    key={index}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-900 p-5 shadow-md rounded-lg border border-blue-800 hover:border-blue-600 hover:shadow-blue-900 transition duration-300"
                  >
                    <div>
                      <h2 className="text-lg font-semibold text-blue-200">{tour.city}</h2>
                      <p className="text-sm text-gray-400">{tour.venue}</p>
                    </div>
                    <div className="text-sm text-gray-400 mt-2 md:mt-0">{tour.date}</div>
                    <div className="mt-3 md:mt-0">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                          tour.status === "Sold Out"
                            ? "bg-blue-900 text-blue-200 border border-blue-700"
                            : tour.status === "Few Left"
                              ? "bg-blue-800 text-yellow-200 border border-yellow-600"
                              : "bg-blue-800 text-green-200 border border-green-600"
                        }`}
                      >
                        {tour.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourSection;