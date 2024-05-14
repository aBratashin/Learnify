import prisma from '@/configs/prismadb'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
	try {
		const url = new URL(req.url)
		const searchParams = url.searchParams.get('q')

		if (typeof searchParams !== 'string' || !searchParams) {
			throw new Error('Ошибка в запросе')
		}

		const course = await prisma.course.findFirst({
			where: {
				id: searchParams
			}
		})

		if (!course) {
			return NextResponse.json({ error: 'Курс не найден' }, { status: 404 })
		}

		return NextResponse.json({ course })
	} catch (error) {
		return NextResponse.json({ error: 'Ошибка обработки запроса' }, { status: 400 })
	}
}
