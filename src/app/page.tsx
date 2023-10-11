import Search from '@/components/Search';

export default function Home() {
  return (
    <main className="flex align-center flex-col justify-center items-center pt-20">
      <h1 className="text-2xl font-bold text-center mb-4">Search Pixar Movies</h1>
      <Search />
    </main>
  )
}
