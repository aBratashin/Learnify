import getAllContacts from '@/actions/getAllContacts'
import { authOptions } from '@/configs/auth'
import Contact from '@/components/Contact/Contact'
import { UserStatus } from '@prisma/client'
import { getServerSession } from 'next-auth'
import NotFound from '../not-found'

const page = async () => {
	const session = await getServerSession(authOptions)

	if (session?.user.role !== UserStatus.Admin) {
		return <NotFound />
	}

	const contacts = await getAllContacts()

	return <Contact contacts={contacts} />
}

export default page
