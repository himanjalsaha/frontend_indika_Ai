import Link from 'next/link'
import { VideoFile } from '@/types'
import {  Calendar, HardDrive } from 'lucide-react'

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
      <div className=" shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">File Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Size</th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Modified</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className=" divide-y divide-gray-200">
            {videos.map((video) => (
              <tr key={video._id} >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <video src={video.link} className="flex-shrink-0 size-40 text-gray-400 mr-3" />
                    <div className="text-sm font-medium">{video.file_name}</div>
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

