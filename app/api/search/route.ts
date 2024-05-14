import prisma from '@/configs/prismadb'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
	try {
		const url = new URL(req.url)
		const searchParams = url.searchParams.get('q')

		if (typeof searchParams !== 'string' || !searchParams) {
			throw new Error('Ошибка в запросе')
		}

		const courses = await prisma.course.findMany({
			where: {
				OR: [
					{
						title: {
							contains: searchParams,
							mode: 'insensitive'
						}
					},
					{
						description: {
							contains: searchParams,
							mode: 'insensitive'
						}
					}
				]
			},
			include: {
				reviews: true
			}
		})

		return NextResponse.json({ courses })
	} catch (error) {
		return NextResponse.json(
			{ error: 'Ошибка обработки запроса' },
			{ status: 400 }
		)
	}
}
