import { NextResponse } from 'next/server'

import prisma from '@/configs/prismadb'
import { ContactStatus } from '@prisma/client'

export async function POST(request: Request) {
	const body = await request.json()
	const { name, phone, email } = body

	const review = await prisma.contacts.create({
		data: {
			name,
			phone,
			email,
			status: ContactStatus.Pending
		}
	})

	return NextResponse.json(review)
}
