import { getBanners, setBannerActive } from '@/lib/store'
import { NextResponse } from 'next/server'

export async function GET() { return NextResponse.json(getBanners()) }

export async function PATCH(request: Request) {
  const body = await request.json()
  setBannerActive(Number(body.id), Boolean(body.active))
  return NextResponse.json(getBanners())
}
