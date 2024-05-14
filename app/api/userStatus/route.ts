import prisma from '@/configs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const body = await request.json()
		const { id, role, del } = body

		let updatedUser

		if (del) {
			updatedUser = await prisma.user.delete({
				where: { id }
			})
		} else {
			updatedUser = await prisma.user.update({
				where: { id },
				data: { role }
			})
		}

		return NextResponse.json(updatedUser)
	} catch (error) {
		console.error('Error processing request:', error)
		return NextResponse.json({ error: 'Ошибка обработки запроса' })
	}
}
