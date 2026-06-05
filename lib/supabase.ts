import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? ''

if (!url || !key) {
  console.warn('[Supabase] NEXT_PUBLIC_SUPABASE_URL veya NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY eksik (.env.local) — form gönderimi devre dışı.')
}

export const supabase = url && key ? createClient(url, key) : null
