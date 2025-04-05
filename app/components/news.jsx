"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../redux/slices/newsSlice";

const News = () => {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-10">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-100 tracking-wide">
        📰 Crypto News
      </h2>

      <div className="max-w-4xl mx-auto px-6">
        {loading && <p className="text-center text-lg text-gray-400">Loading news...</p>}
        {error && <p className="text-center text-lg text-red-500">Error: {error}</p>}

        {articles.length > 0 ? (
          <div className="space-y-6 text-wrap overflow-clip">
            {articles.slice(0, 5).map((article, index) => (
              <a 
                key={index} 
                href={article.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg hover:bg-white/20 transition transform hover:scale-105 cursor-pointer"
              >
                <h3 className="text-xl font-semibold text-blue-300 hover:underline">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-400 mt-2">
                  {article.source_id} - {new Date(article.pubDate).toLocaleDateString()}
                </p>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-400">No news available</p>
        )}
      </div>
    </div>
  );
};

export default News;
