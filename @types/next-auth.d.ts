import { User } from '@prisma/client'
import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
	interface Session {
		user: {
			role: User['role']
		} & DefaultSession['user']
	}
}
