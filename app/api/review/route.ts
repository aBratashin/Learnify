import { NextResponse } from 'next/server'

import prisma from '@/configs/prismadb'

export async function POST(request: Request) {
	const body = await request.json()
	const { name, title, description, rating, product_id } = body

	const review = await prisma.review.create({
		data: {
			name,
			title,
			description,
			rating,
			courseId: product_id
		}
	})

	return NextResponse.json(review)
}
