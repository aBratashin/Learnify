import { NextResponse } from 'next/server'

import prisma from '@/configs/prismadb'

export async function POST(request: Request) {
	const body = await request.json()

	const {
		id,
		categories,
		tags,
		title,
		link,
		image,
		initialRating,
		price,
		oldPrice,
		credit,
		description,
		advantages,
		disAdvantages,
		reviewCount,
		characteristics
	} = body

	const review = await prisma.course.update({
		where: {
			id
		},
		data: {
			categories,
			tags,
			title,
			link,
			image,
			initialRating,
			price,
			oldPrice,
			credit,
			description,
			advantages,
			disAdvantages,
			reviewCount,
			characteristics
		}
	})

	return NextResponse.json(review)
}
