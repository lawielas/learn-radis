import Link from 'next/link'
import { client } from '@/lib/db'

const getBooks = async () => {
  const results = await client.zRangeWithScores('books', 0, -1)

  const books = await Promise.all(results.map((b) => {
    return client.hGetAll(`books:${b.score}`)
  }))
}

export default async function Home() {

  return (
    <main>
      <nav className="flex justify-between">
        <h1 className='font-bold'>Books on Redis!</h1>
        <Link href="/create" className="btn">Add a new book</Link>
      </nav>
      
      <p>List of books here.</p>
    </main>
  )
}
