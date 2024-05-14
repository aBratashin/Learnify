import React from 'react'

const About = () => {
	return (
		<div className='grid grid-cols-1 xl:grid-cols-2 gap-10 mt-5 mb-14'>
			<div className='p-4'>
				<h2 className='text-black font-bold text-2xl xl:text-4xl lg:text-3xl'>
					Почему выбирают образовательную платформу Learn
					<span className='text-primary'>ify</span>
				</h2>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				<div className='p-4 shadow-lg rounded-3xl'>
					<h2 className='text-3xl font-bold'>200+</h2>
					<p className='font-medium'>Образовательный курсов</p>
				</div>
				<div className='p-4 shadow-lg rounded-3xl'>
					<h2 className='text-3xl font-bold'>5+</h2>
					<p className='font-medium'>Образовательный платформ</p>
				</div>
				<div className='p-4 shadow-lg rounded-3xl'>
					<h2 className='text-3xl font-bold'>24/7</h2>
					<p className='font-medium'>Учеба по своему графику</p>
				</div>
				<div className='p-4 shadow-lg rounded-3xl'>
					<h2 className='text-3xl font-bold'>93%</h2>
					<p className='font-medium'>Положительных отзывов</p>
				</div>
			</div>
		</div>
	)
}

export default About
