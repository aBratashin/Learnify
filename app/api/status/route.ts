import confirmPay from '@/actions/confirmPay'
import prisma from '@/configs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const body = await request.json()

		if (body.event === 'payment.waiting_for_capture') {
			const payment = await confirmPay(body.object.id)
			if (!payment) {
				return NextResponse.json({ error: 'Ошибка подтверждения платежа' })
			}
			return NextResponse.json(payment)
		} else if (body.event === 'payment.succeeded') {
			const userId = body.object.description.split(', ')[0]
			const newBoughtIds = body.object.description.split(', ').slice(1)

			const user = await prisma.user.findUnique({
				where: {
					id: userId
				}
			})

			const updatedCartIds = user?.cartIds.filter(
				id => !newBoughtIds.includes(id)
			)

			const updatedBoughtIds = [...(user?.boughtIds || []), ...newBoughtIds]

			const updatedUser = await prisma.user.update({
				where: {
					id: userId
				},
				data: {
					boughtIds: {
						set: updatedBoughtIds
					},
					cartIds: {
						set: updatedCartIds
					}
				}
			})

			if (!updatedUser) {
				return NextResponse.json({
					error: 'Ошибка обновления данных пользователя'
				})
			}

			return NextResponse.json(updatedUser)
		} else {
			return NextResponse.json(true)
		}
	} catch (error) {
		console.error('Error processing request:', error)
		return NextResponse.json({ error: 'Ошибка обработки запроса' })
	}
}
