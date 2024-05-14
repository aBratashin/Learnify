import prisma from '@/configs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const body = await request.json()
		const { id, status, del } = body

		let updatedContact

		if (del) {
			updatedContact = await prisma.contacts.delete({
				where: { id }
			})
		} else {
			updatedContact = await prisma.contacts.update({
				where: { id },
				data: { status }
			})
		}

		return NextResponse.json(updatedContact)
	} catch (error) {
		console.error('Error processing request:', error)
		return NextResponse.json({ error: 'Ошибка обработки запроса' })
	}
}
