import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

import prisma from '@/configs/prismadb'
import { UserStatus } from '@prisma/client'

export async function POST(request: Request) {
	const body = await request.json()
	const { email, name, password } = body

	const hashedPassword = await bcrypt.hash(password, 12)

	const user = await prisma.user.create({
		data: {
			email,
			name,
			hashedPassword,
			role: UserStatus.User
		}
	})

	return NextResponse.json(user)
}
