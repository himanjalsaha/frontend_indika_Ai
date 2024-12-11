import { Metadata } from 'next'
import VideosList from './components/videoslist'

export default function Home() {
  return (
    <div>
      <VideosList searchParams={searchParams} />
    </div>
  )
}

