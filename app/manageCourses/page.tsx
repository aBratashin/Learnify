import { authOptions } from '@/configs/auth'
import { UserStatus } from '@prisma/client'
import { getServerSession } from 'next-auth'
import NotFound from '../not-found'
import ManageList from '@/components/ManageList/ManageList'
import getAllProducts from '@/actions/getAllProducts'

const page = async () => {
	const session = await getServerSession(authOptions)

	if (session?.user.role !== UserStatus.Admin) {
		return <NotFound />
	}

	const products = await getAllProducts()

	return <ManageList products={products} />
}

export default page
