'use client'

import { VideoFile } from '@/types'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function MinimalistVideoPlayer() {
  const params = useParams()
  const id = params.id
  const [data, setData] = useState<VideoFile>()

  const get_data_by_id = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/fetch_file_by_id?id=${id}`)
      
      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }
      
      const responseData = await res.json()
      setData(responseData)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (id) {
      get_data_by_id()
    }
  }, [id])

  if (!data) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">{data.file_name}</h1>
      <video 
        className="w-full mb-4" 
        controls 
        src={data.link}
      >
        Your browser does not support the video tag.
      </video>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">File Information</h2>
          <p><strong>File Size:</strong> {data.file_size}</p>
          <p><strong>Last Modified:</strong> {new Date(data.last_modified).toLocaleString()}</p>
          <p><strong>Download Link:</strong> <a href={data.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Download</a></p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Metadata</h2>
          <pre className=" p-2 rounded overflow-auto max-h-60">
            {JSON.stringify(data.metadata, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}

