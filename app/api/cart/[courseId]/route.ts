import { NextResponse } from 'next/server'

import getCurrentUser from '@/actions/getCurrentUser'
import prisma from '@/configs/prismadb'

interface iParams {
	courseId?: string
}

export async function POST(request: Request, { params }: { params: iParams }) {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return NextResponse.error()
	}

	const { courseId } = params

	if (!courseId || typeof courseId !== 'string') {
		throw new Error('Неверный courseId')
	}

	let cartIds = [...(currentUser.cartIds || [])]

	cartIds.push(courseId)

	const user = await prisma.user.update({
		where: {
			id: currentUser.id
		},
		data: {
			cartIds
		}
	})

	return NextResponse.json(user)
}

export async function DELETE(
	request: Request,
	{ params }: { params: iParams }
) {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return NextResponse.error()
	}

	const { courseId } = params

	if (!courseId || typeof courseId !== 'string') {
		throw new Error('Неверный courseId')
	}

	let cartIds = [...(currentUser.cartIds || [])]

	cartIds = cartIds.filter(id => id !== courseId)

	const user = await prisma.user.update({
		where: {
			id: currentUser.id
		},
		data: {
			cartIds
		}
	})

	return NextResponse.json(user)
}
