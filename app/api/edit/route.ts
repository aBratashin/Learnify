import prisma from '@/configs/prismadb'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
	if (req.method === 'GET') {
		try {
			const url = new URL(req.url)
			const searchParams = new URLSearchParams(url.searchParams).get('q')

			if (typeof searchParams !== 'string') {
				throw new Error('Ошибка в запросе')
			}

			const course = await prisma.course.findFirst({
				where: {
					id: searchParams
				}
			})

			return NextResponse.json({ course })
		} catch (error) {
			return NextResponse.json({ error: 'Ошибка обработки запроса' })
		}
	}
}
