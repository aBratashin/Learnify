import { MenuData } from '@/helpers/MenuData'
import Link from 'next/link'

const Capability = () => {
	return (
		<div className='w-full p-8 bg-primary border-purple border-solid rounded-xl flex flex-col gap-10 shadow-lg'>
			<h1 className='text-white p-4 font-bold text-2xl xl:text-4xl lg:text-3xl'>
				Найди себя и новые возможности в Learnify
			</h1>
			<div className='grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-4 p-4'>
				{MenuData.map(el =>
					el.pages.map(c => (
						<Link
							href={`/courses/${c.alias}`}
							className='bg-white p-2 rounded-3xl font-medium h-14 flex items-center justify-center text-center transition hover:bg-black hover:text-white'
							key={c._id}
						>
							{c.category}
						</Link>
					))
				)}
			</div>
		</div>
	)
}

export default Capability
