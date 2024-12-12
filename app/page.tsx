import { Suspense } from 'react'
import { VideoFile } from '@/types'
import { Search } from 'lucide-react'
import { VideoItem } from './components/videoItem'

async function getVideos(): Promise<VideoFile[]> {
  const res = await fetch('https://indika-backend.onrender.com/fetch_files')
  if (!res.ok) {
    throw new Error('Failed to fetch videos')
  }
  return res.json()
}

async function searchVideos(query: string): Promise<VideoFile[]> {
  const res = await fetch(`https://indika-backend.onrender.com/fetch_file_by_name?query=${encodeURIComponent(query)}`)
  if (!res.ok) {
    throw new Error('Failed to search videos')
  }
  return res.json()
}

function SearchForm({ defaultValue }: { defaultValue: string }) {
  return (
    <form action="" className="flex items-center space-x-2 mb-6">
      <input
        type="text"
        placeholder="Search videos..."
        name="query"
        defaultValue={defaultValue}
        className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button 
        type="submit" 
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
      >
        <Search className="h-5 w-5" />
      </button>
      <button 
        type="reset" 
        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
      >
        Reset
      </button>
    </form>
  )
}

export default async function VideosList({ searchParams }: { searchParams: { query?: string } }) {
  const query = searchParams.query || ''
  const videos = query ? await searchVideos(query) : await getVideos()

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Video Streaming Platform</h1>
      
      <Suspense fallback={<div>Loading...</div>}>
        <SearchForm defaultValue={query} />
      </Suspense>

      {videos.length === 0 ? (
        <p className="text-center text-gray-500 my-8">No videos found.</p>
      ) : (
        <div className="space-y-6">
          {videos.map((video) => (
            <VideoItem key={video._id} video={video} />
          ))}
        </div>
      )}
    </main>
  )
}

