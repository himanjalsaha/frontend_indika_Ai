import VideosList from "./components/videoslist"

export default function Home({ searchParams }: { searchParams: { query?: string } }) {
  return (
    <div>
      <VideosList searchParams={searchParams} />
    </div>
  )
}