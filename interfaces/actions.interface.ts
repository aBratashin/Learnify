import { ContactStatus, UserStatus } from '@prisma/client'

export interface ContactsModel {
	id: string
	name: string
	phone: string
	email: string
	status: ContactStatus
	createdAt: Date
	updatedAt: Date
}

export interface UsersModel {
	id: string
	name: string | null
	email: string | null
	emailVerified: Date | null
	image: string | null
	hashedPassword: string | null
	createdAt: Date
	updatedAt: Date
	favoriteIds: string[]
	cartIds: string[]
	boughtIds: string[]
	role: UserStatus
}
