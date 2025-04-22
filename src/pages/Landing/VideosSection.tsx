import React, { useState } from 'react';

import video1 from '../../images/cover/video1.png';

const ArtistVideosSection = () => {
  // Sample video data - replace with your actual videos
  const videos = [
    {
      id: 1,
      title: "Live at Madison Square Garden",
      thumbnail: video1,
      date: "March 15, 2025",
      duration: "4:32",
      views: "1.2M"
    },
    {
      id: 2,
      title: "Official Music Video - Whistle in the Dark",
      thumbnail: video1,
      date: "February 10, 2025",
      duration: "3:45",
      views: "2.8M"
    },
    {
      id: 3,
      title: "Acoustic Session - Blue Notes",
      thumbnail: video1,
      date: "January 22, 2025",
      duration: "5:17",
      views: "893K"
    },
    {
      id: 4,
      title: "Behind the Scenes - Tour Rehearsal",
      thumbnail: video1,
      date: "April 5, 2025",
      duration: "8:24",
      views: "456K"
    }
  ];

  const [selectedVideo, setSelectedVideo] = useState(videos[0]);

  return (
    <section className="bg-gradient-to-b from-black to-blue-900 text-white py-16">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <h2 className="text-4xl font-bold text-blue-400 mb-4 md:mb-0">Videos</h2>
        <button className="bg-blue-700 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-md transition duration-300 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          View YouTube Channel
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Featured Video - FIXED */}
        <div className="lg:col-span-2">
          <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-blue-800">
            {/* Fixed video container with proper aspect ratio */}
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <img 
                src={selectedVideo.thumbnail}  
                alt={selectedVideo.title} 
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <button className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-blue-200 mb-2">{selectedVideo.title}</h3>
              <div className="flex flex-wrap items-center text-sm text-gray-400 gap-4">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {selectedVideo.duration}
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  {selectedVideo.views} views
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  {selectedVideo.date}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Video List */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900 rounded-lg shadow-lg border border-blue-800 h-full">
            <div className="p-4 border-b border-blue-800">
              <h3 className="text-lg font-semibold text-blue-300">More Videos</h3>
            </div>
            <div className="divide-y divide-blue-800">
              {videos.map(video => (
                <div 
                  key={video.id} 
                  className={`p-4 cursor-pointer hover:bg-blue-900 transition duration-300 ${
                    selectedVideo.id === video.id ? 'bg-blue-900' : ''
                  }`}
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="flex gap-3">
                    <div className="w-24 h-16 relative flex-shrink-0">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover rounded"
                      />
                      <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-blue-100 mb-1 line-clamp-2">{video.title}</h4>
                      <p className="text-xs text-gray-400">{video.views} views</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video Categories */}
      <div className="mt-12">
        <div className="flex overflow-x-auto py-4 space-x-4 no-scrollbar">
          <button className="bg-blue-700 text-white px-6 py-2 rounded-full whitespace-nowrap">
            All Videos
          </button>
          <button className="bg-gray-800 hover:bg-blue-800 text-blue-200 px-6 py-2 rounded-full whitespace-nowrap transition duration-300">
            Music Videos
          </button>
          <button className="bg-gray-800 hover:bg-blue-800 text-blue-200 px-6 py-2 rounded-full whitespace-nowrap transition duration-300">
            Live Performances
          </button>
          <button className="bg-gray-800 hover:bg-blue-800 text-blue-200 px-6 py-2 rounded-full whitespace-nowrap transition duration-300">
            Interviews
          </button>
          <button className="bg-gray-800 hover:bg-blue-800 text-blue-200 px-6 py-2 rounded-full whitespace-nowrap transition duration-300">
            Behind the Scenes
          </button>
        </div>
      </div>
    </div>
  </section>
  );
};

export default ArtistVideosSection;

// Add this CSS to your global styles or component
// To hide scrollbar but keep functionality
// .no-scrollbar::-webkit-scrollbar { display: none; }
// .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

// Define the 16:9 aspect ratio class
// .pb-9/16 { padding-bottom: 56.25%; }