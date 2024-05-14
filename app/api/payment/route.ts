import { NextResponse } from 'next/server'

import getPay from '@/actions/getPay'

export async function POST(request: Request) {
	const body = await request.json()
	const { total, desc } = body
	const newDesc = desc.join(', ')

	const payment = await getPay(total, newDesc)

	return NextResponse.json(payment)
}
