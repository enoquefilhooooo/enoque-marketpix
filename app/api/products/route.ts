import { addProduct, getProducts } from '@/lib/store'
import { NextResponse } from 'next/server'

export async function GET() { return NextResponse.json(getProducts()) }

export async function POST(request: Request) {
  const body = await request.json()
  if (!body.name || Number.isNaN(Number(body.price)) || Number.isNaN(Number(body.stock))) return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
  return NextResponse.json(addProduct({ name: body.name, price: Number(body.price), stock: Number(body.stock), category: body.category || 'Geral' }), { status: 201 })
}
