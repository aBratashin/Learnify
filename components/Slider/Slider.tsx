'use client'

import Image from 'next/image'
import { FC, useState } from 'react'

import { Swiper as SwiperTypes } from 'swiper'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { images } from './images'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import {
	cvaContainer,
	cvaSwiper,
	cvaSwiperItem,
	cvaSwiperItemImage,
	cvaSwiperSlide,
	cvaSwiperSlideImage,
	cvaWrapper
} from './SliderStyle'

const Slider:FC<> = () => {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperTypes | null>(null)

	return (
		<section className={cvaWrapper()}>
			<div className={cvaContainer()}>
				<Swiper
					loop={true}
					spaceBetween={10}
					navigation={true}
					thumbs={{
						swiper:
							thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
					}}
					modules={[FreeMode, Navigation, Thumbs]}
					className={cvaSwiper()}
				>
					{images.map((image, index) => (
						<SwiperSlide key={index}>
							<div className={cvaSwiperSlide()}>
								<Image
									src={image.src}
									alt={image.alt}
									className={cvaSwiperSlideImage()}
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
					className={cvaSwiperItem()}
				>
					{images.map((image, index) => (
						<SwiperSlide key={index}>
							<button className={cvaSwiperSlide()}>
								<Image
									src={image.src}
									alt={image.alt}
									className={cvaSwiperItemImage()}
								/>
							</button>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	)
}

export default Slider