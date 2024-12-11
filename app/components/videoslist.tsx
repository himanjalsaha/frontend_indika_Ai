import Link from 'next/link'
import { VideoFile } from '@/types'
import { Calendar, HardDrive, Play } from 'lucide-react'

async function getVideos(): Promise<VideoFile[]> {
  const res = await fetch('https://indika-backend.onrender.com/fetch_files')
  if (!res.ok) {
    throw new Error('Failed to fetch videos')
  }
  return res.json()
}

export default async function VideosList() {
  const videos = await getVideos()

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Video Streaming Platform</h1>
      
     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
        {videos.map((video) => (
          <div key={video._id} className=" shadow rounded-lg overflow-hidden">
            <video src={video.link} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{video.file_name}</h2>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <HardDrive className="flex-shrink-0 h-4 w-4 text-gray-400 mr-2" />
                {(video.file_size / 1024 / 1024).toFixed(2)} MB
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Calendar className="flex-shrink-0 h-4 w-4 text-gray-400 mr-2" />
                {new Date(video.last_modified).toLocaleString()}
              </div>
              <Link 
                href={`/videos/${video._id}`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Play className="h-4 w-4 mr-2" />
                Play
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Table view for large screens */}
      <div className="hidden lg:block shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modified</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className=" divide-y divide-gray-200">
            {videos.map((video) => (
              <tr key={video._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <video src={video.link} className="flex-shrink-0 h-20 w-20 object-cover rounded mr-3" />
                    <div className="text-sm font-medium ">{video.file_name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <HardDrive className="flex-shrink-0 h-5 w-5 text-gray-400 mr-2" />
                    {(video.file_size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="flex-shrink-0 h-5 w-5 text-gray-400 mr-2" />
                    {new Date(video.last_modified).toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link 
                    href={`/videos/${video._id}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Play
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}

