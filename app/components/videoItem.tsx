'use client'

import { useState } from 'react'
import Link from 'next/link'
import { VideoFile } from '@/types'
import { Calendar, ChevronDown, ChevronUp, HardDrive, Play } from 'lucide-react'

export function VideoItem({ video }: { video: VideoFile }) {
  const [showMetadata, setShowMetadata] = useState(false)

  return (
    <div className=" shadow-md rounded-lg overflow-hidden mb-4">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2 truncate">{video.file_name}</h2>
        <video src={video.link} controls className="w-50 h-50 object-cover rounded-md mb-4" />
        <div className="flex flex-wrap items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center mr-4 mb-2">
            <HardDrive className="flex-shrink-0 h-4 w-4 text-gray-400 mr-2" />
            {(video.file_size / 1024 / 1024).toFixed(2)} MB
          </div>
          <div className="flex items-center mb-2">
            <Calendar className="flex-shrink-0 h-4 w-4 text-gray-400 mr-2" />
            {(video.last_modified)}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between">
    
          <button
            onClick={() => setShowMetadata(!showMetadata)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md  transition-colors duration-200"
          >
            {showMetadata ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
            {showMetadata ? 'Hide' : 'Show'} Metadata
          </button>
        </div>
      </div>
      {showMetadata && (
        <div className="px-4 py-2 border-t border-gray-200">
          <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
            {JSON.stringify(video, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
