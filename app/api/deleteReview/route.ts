import prisma from '@/configs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const body = await request.json()
		const { id } = body

		const deleteReview = await prisma.review.delete({
			where: { id }
		})

		return NextResponse.json(deleteReview)
	} catch (error) {
		console.error('Error processing request:', error)
		return NextResponse.json({ error: 'Ошибка обработки запроса' })
	}
}
