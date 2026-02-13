import React, { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { 
  FaTiktok, 
  FaDownload, 
  FaMusic, 
  FaUser, 
  FaPlay, 
  FaHeart,
  FaComment,
  FaShare,
  FaDownload as FaDownloadIcon
} from 'react-icons/fa';
import { RiVideoFill } from 'react-icons/ri';
import { MdOutlineVideoLibrary } from 'react-icons/md';
import { ThreeDots } from 'react-loader-spinner';

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState(null);

  const handleDownload = async (e) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast.error('Please enter a TikTok video URL');
      return;
    }

    setLoading(true);
    setVideoData(null);

    try {
      const response = await axios.get(`/api/download?url=${encodeURIComponent(url)}`);
      
      if (response.data.status) {
        setVideoData(response.data.result);
        toast.success('Video information fetched successfully!');
      } else {
        toast.error('Failed to fetch video information');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error fetching video. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadVideo = () => {
    if (videoData?.video) {
      window.open(videoData.video, '_blank');
      toast.success('Download started!');
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <FaTiktok className="text-6xl text-white animate-pulse-slow" />
            <h1 className="text-6xl font-bold gradient-text">TikSave</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Download any TikTok video without watermark. Fast, free, and easy to use!
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-3xl mx-auto mb-12">
          <form onSubmit={handleDownload} className="glass-card p-2 flex flex-col md:flex-row gap-2">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste TikTok video URL here..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover-glow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <ThreeDots height="20" width="40" color="white" />
                  Processing...
                </>
              ) : (
                <>
                  <FaDownload /> Download
                </>
              )}
            </button>
          </form>
        </div>

        {/* Video Information */}
        {videoData && (
          <div className="max-w-5xl mx-auto">
            <div className="glass-card p-6 md:p-8">
              {/* Author Info */}
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={videoData.author.pp} 
                  alt={videoData.author.nickname}
                  className="w-16 h-16 rounded-full border-2 border-primary-500"
                />
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <FaUser className="text-primary-400" />
                    {videoData.author.nickname}
                  </h3>
                  <p className="text-gray-400">@{videoData.author.username}</p>
                </div>
              </div>

              {/* Video Title */}
              <h2 className="text-2xl font-semibold mb-4 text-gray-200">
                {videoData.title}
              </h2>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <FaPlay className="text-primary-400 mx-auto mb-2 text-xl" />
                  <p className="text-2xl font-bold">{formatNumber(videoData.detail.play_count)}</p>
                  <p className="text-sm text-gray-400">Plays</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <FaHeart className="text-red-400 mx-auto mb-2 text-xl" />
                  <p className="text-2xl font-bold">{formatNumber(videoData.detail.digg_count)}</p>
                  <p className="text-sm text-gray-400">Likes</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <FaComment className="text-blue-400 mx-auto mb-2 text-xl" />
                  <p className="text-2xl font-bold">{formatNumber(videoData.detail.comment_count)}</p>
                  <p className="text-sm text-gray-400">Comments</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <FaShare className="text-green-400 mx-auto mb-2 text-xl" />
                  <p className="text-2xl font-bold">{formatNumber(videoData.detail.share_count)}</p>
                  <p className="text-sm text-gray-400">Shares</p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <MdOutlineVideoLibrary />
                  Region: {videoData.region}
                </span>
                <span className="flex items-center gap-1">
                  <RiVideoFill />
                  Size: {(videoData.size / 1024 / 1024).toFixed(2)} MB
                </span>
                <span className="flex items-center gap-1">
                  <FaMusic />
                  Music: {videoData.music.title}
                </span>
                <span>Posted: {formatDate(videoData.detail.create_time)}</span>
              </div>

              {/* Video Preview and Download */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Thumbnail */}
                <div className="bg-white/5 rounded-xl overflow-hidden">
                  <img 
                    src={videoData.thumbnail} 
                    alt="Video thumbnail"
                    className="w-full h-auto"
                  />
                </div>

                {/* Download Options */}
                <div className="flex flex-col justify-center gap-4">
                  <button
                    onClick={downloadVideo}
                    className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 text-lg transition-all hover-glow"
                  >
                    <FaDownloadIcon className="text-xl" />
                    Download Video ({videoData.video ? 'Without Watermark' : 'Not Available'})
                  </button>
                  
                  {videoData.music?.url && (
                    <a
                      href={videoData.music.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 text-lg transition-all border border-white/10"
                    >
                      <FaMusic className="text-xl" />
                      Download Audio
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="max-w-5xl mx-auto mt-16 grid md:grid-cols-3 gap-6">
          <div className="glass-card p-6 text-center hover-glow">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaDownload className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-2">No Watermark</h3>
            <p className="text-gray-400">Download videos without the TikTok watermark</p>
          </div>
          
          <div className="glass-card p-6 text-center hover-glow">
            <div className="bg-gradient-to-r from-secondary-500 to-accent-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaMusic className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-2">Audio Download</h3>
            <p className="text-gray-400">Save the original audio from any video</p>
          </div>
          
          <div className="glass-card p-6 text-center hover-glow">
            <div className="bg-gradient-to-r from-accent-500 to-primary-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHeart className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-2">Free Forever</h3>
            <p className="text-gray-400">No hidden costs, completely free to use</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-gray-400">
          <p>© 2024 TikSave. All rights reserved. Made with ❤️ for TikTok lovers</p>
        </footer>
      </div>

      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#1e1e2e',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)'
          }
        }}
      />
    </div>
  );
}

export default App;
