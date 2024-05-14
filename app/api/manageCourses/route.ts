import prisma from '@/configs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const body = await request.json()
		const { id } = body

		const deleteCourse = await prisma.course.delete({
			where: { id }
		})

		return NextResponse.json(deleteCourse)
	} catch (error) {
		console.error('Error processing request:', error)
		return NextResponse.json({ error: 'Ошибка обработки запроса' })
	}
}
