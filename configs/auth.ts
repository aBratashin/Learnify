import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth, { AuthOptions } from 'next-auth'

import prisma from '@/configs/prismadb'

import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import YandexProvider from 'next-auth/providers/yandex'

import bcrypt from 'bcrypt'
import { User } from '@prisma/client'

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!
		}),
		YandexProvider({
			clientId: process.env.YANDEX_CLIENT_ID!,
			clientSecret: process.env.YANDEX_CLIENT_SECRET!
		}),
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'password' }
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error('Неверные почта или пароль')
				}

				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email
					}
				})

				if (!user || !user?.hashedPassword) {
					throw new Error('Пользователя с таким email не существует')
				}

				const isCorrectPassword = await bcrypt.compare(
					credentials.password,
					user.hashedPassword
				)

				if (!isCorrectPassword) {
					throw new Error('Неверный пароль')
				}

				return user
			}
		})
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.role = (user as User).role
			}
			return token
		},
		async session({ session, token }) {
			session.user.role = (token as User).role
			return session
		}
	},
	pages: {
		signIn: '/'
	},
	debug: process.env.NODE_ENV === 'development',
	session: {
		strategy: 'jwt'
	},
	secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)
