import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: sales, error } = await supabase.from('sales').select()

  if (error) {
    return <pre>{JSON.stringify(error, null, 2)}</pre>
  }

  if (sales?.length === 0) {
    return <p>(sales table is empty)</p>
  }

  return (
    <ul>
      {sales?.map((sale, i) => (
        <li key={i}>{JSON.stringify(sale)}</li>
      ))}
    </ul>
  )
}