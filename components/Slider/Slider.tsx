'use client'

import { useState } from 'react'
import Image from 'next/image'

import { Swiper as SwiperTypes } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'

import { images } from './images'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

export default function Slider() {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperTypes | null>(null)

	return (
		<section className='min-h-20vh'>
			<div className='container'>
				<Swiper
					loop={true}
					spaceBetween={10}
					navigation={true}
					thumbs={{
						swiper:
							thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
					}}
					modules={[FreeMode, Navigation, Thumbs]}
					className='h-[600px] w-full rounded-lg'
				>
					{images.map((image, index) => (
						<SwiperSlide key={index}>
							<div className='flex h-full w-full items-center justify-center'>
								<Image
									src={image.src}
									alt={image.alt}
									className='block h-full w-full object-contain xl:object-cover'
								/>
							</div>
						</SwiperSlide>
					))}
				</Swiper>

				<Swiper
					onSwiper={setThumbsSwiper}
					loop={true}
					spaceBetween={12}
					slidesPerView={4}
					freeMode={true}
					watchSlidesProgress={true}
					modules={[FreeMode, Navigation, Thumbs]}
					className='thumbs mt-3 h-32 w-full rounded-lg'
				>
					{images.map((image, index) => (
						<SwiperSlide key={index}>
							<button className='flex h-full w-full items-center justify-center'>
								<Image
									src={image.src}
									alt={image.alt}
									className='block h-full w-full object-cover'
								/>
							</button>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	)
}
