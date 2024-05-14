import getAllUsers from '@/actions/getAllUsers'
import { authOptions } from '@/configs/auth'
import { UserStatus } from '@prisma/client'
import { getServerSession } from 'next-auth'
import NotFound from '../not-found'
import User from '@/components/User/User'

const page = async () => {
	const session = await getServerSession(authOptions)

	if (session?.user.role !== UserStatus.Admin) {
		return <NotFound />
	}

	const users = await getAllUsers()
	const sortedUsers = users.filter(user => user.email !== session.user.email)

	return <User users={sortedUsers} />
}

export default page
