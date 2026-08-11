import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } })
}

export async function GET() {
  const supabase = adminClient()
  if (!supabase) return NextResponse.json({ error: 'Supabase server configuration missing' }, { status: 500 })
  const { data, error } = await supabase.from('store_settings').select('*').eq('id', true).single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PUT(request: Request) {
  const supabase = adminClient()
  if (!supabase) return NextResponse.json({ error: 'Supabase server configuration missing' }, { status: 500 })
  const body = await request.json()
  const payload = {
    id: true,
    store_name: String(body.store_name ?? 'MarketPIX').trim() || 'MarketPIX',
    whatsapp: String(body.whatsapp ?? '').trim(),
    pix_key: String(body.pix_key ?? '').trim(),
    logo_url: body.logo_url ? String(body.logo_url).trim() : null,
    updated_at: new Date().toISOString(),
  }
  const { data, error } = await supabase.from('store_settings').upsert(payload, { onConflict: 'id' }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
