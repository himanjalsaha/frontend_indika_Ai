import { Metadata } from 'next'
import VideosList from './components/videoslist'


export default function Home({
  searchParams,
}) {
  return (
    <div>
      <VideosList searchParams={searchParams} />
    </div>
  )
}

