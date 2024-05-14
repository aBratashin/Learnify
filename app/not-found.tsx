import Link from 'next/link'

export default function NotFound() {
	return (
		<main className='flex flex-col items-center justify-center gap-2 h-full w-full text-center'>
			<h1 className='font-bold text-2xl'>Страница не найдена!</h1>
			<h2 className='font-normal text-md hover:text-primary'>
				<Link href='/'>Главная</Link>
			</h2>
		</main>
	)
}
