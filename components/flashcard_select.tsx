import React, { useState, useMemo } from 'react';
import Link from "next/link";
import { X, ChevronRight, Search, SortAsc, SortDesc, Tag } from "lucide-react";

interface FlashcardSelectProps {
    data: Array<string>;
    sumbitFunc: (subject: string) => void;
}

// Helper function to extract category from subject name
const getCategory = (subject: string): string => {
  // Common programming categories
  return subject.replace(/[0-9]/g, '');
};

export const dynamic = 'force-dynamic';

export default function FlashcardSelect(props: FlashcardSelectProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Get unique categories from data
  const categories = useMemo(() => {
    const cats = new Set(props.data.map(getCategory));
    return Array.from(cats);
  }, [props.data]);

  // Filter and sort the data
  const filteredAndSortedData = useMemo(() => {
    return [...props.data]
      .filter(subject => {
        const matchesSearch = subject.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || getCategory(subject) === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        const comparison = a.localeCompare(b);
        return sortDirection === 'asc' ? comparison : -comparison;
      });
  }, [props.data, searchQuery, sortDirection, selectedCategory]);

  const toggleSort = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="fixed inset-0 bg-gray-900/90 backdrop-blur-sm overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="relative p-8 w-[32rem] max-w-[90vw] rounded-lg bg-gray-800/95 border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-cyan-400" />
        <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-cyan-400" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-cyan-400" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-cyan-400" />
        
        <div className="text-center">
          <h3 className="text-2xl font-bold text-cyan-400 font-mono mb-1">SELECT SUBJECT</h3>
          <div className="text-cyan-500/70 font-mono text-sm mb-6">CHOOSE YOUR PROGRAM</div>
          
          {/* Search and Sort Controls */}
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-500/50" />
              <input
                type="text"
                placeholder="Search subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-cyan-500/30 rounded
                         text-cyan-50 font-mono placeholder-cyan-500/30
                         focus:outline-none focus:border-cyan-400
                         focus:shadow-[0_0_10px_rgba(6,182,212,0.2)]"
              />
            </div>
            <button
              onClick={toggleSort}
              className="px-3 py-2 bg-gray-900/50 border border-cyan-500/30 rounded
                       hover:bg-gray-700 hover:border-cyan-400
                       hover:shadow-[0_0_10px_rgba(6,182,212,0.2)]
                       transition-all duration-200"
            >
              {sortDirection === 'asc' ? 
                <SortAsc className="w-5 h-5 text-cyan-400" /> :
                <SortDesc className="w-5 h-5 text-cyan-400" />
              }
            </button>
          </div>

          {/* Category Tags */}
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-3 py-1.5 rounded font-mono text-sm flex items-center gap-1.5
                       transition-all duration-200 ${
                         selectedCategory === '' 
                         ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                         : 'bg-gray-900/50 text-cyan-500/70 hover:bg-gray-700/50 hover:text-cyan-400'
                       } border border-cyan-500/30`}
            >
              <Tag className="w-3.5 h-3.5" />
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === selectedCategory ? '' : category)}
                className={`px-3 py-1.5 rounded font-mono text-sm flex items-center gap-1.5
                         transition-all duration-200 ${
                           category === selectedCategory 
                           ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                           : 'bg-gray-900/50 text-cyan-500/70 hover:bg-gray-700/50 hover:text-cyan-400'
                         } border border-cyan-500/30`}
              >
                <Tag className="w-3.5 h-3.5" />
                {category}
              </button>
            ))}
          </div>
          
          {/* Subject List */}
          <div className="mt-2 py-3 flex flex-col gap-2 max-h-[40vh] overflow-y-auto custom-scrollbar">
            {filteredAndSortedData.length > 0 ? (
              filteredAndSortedData.map(subject => (
                <button
                  key={subject}
                  onClick={() => props.sumbitFunc(subject)}
                  className="group text-left font-mono text-cyan-50 rounded px-4 py-2.5 
                           bg-gray-900/50 border border-cyan-500/30
                           hover:bg-gray-700 hover:border-cyan-400
                           hover:shadow-[0_0_10px_rgba(6,182,212,0.3)]
                           transition-all duration-200
                           flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span>{subject}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400/70 border border-cyan-500/20">
                      {getCategory(subject)}
                    </span>
                  </div>
                  <ChevronRight 
                    className="w-4 h-4 text-cyan-400 opacity-0 -translate-x-2
                             group-hover:opacity-100 group-hover:translate-x-0
                             transition-all duration-200"
                  />
                </button>
              ))
            ) : (
              <div className="text-cyan-500/50 font-mono py-8">
                No subjects found matching your search
              </div>
            )}
          </div>

          {/* Exit Button */}
          <div className="flex justify-center mt-6">
            <Link
              href="/"
              className="px-6 py-2.5 bg-gray-900 text-cyan-400 font-mono
                       border border-cyan-500/30 rounded
                       hover:shadow-[0_0_10px_rgba(6,182,212,0.3)]
                       hover:bg-gray-700 hover:border-cyan-400
                       transition-all duration-200
                       flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              EXIT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}