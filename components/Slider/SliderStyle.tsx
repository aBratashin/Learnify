import { cva } from 'class-variance-authority'

export const cvaWrapper = cva(['min-h-20vh'])

export const cvaContainer = cva(['container my-0 mx-auto'])

export const cvaSwiper = cva(['h-[600px] w-full rounded-lg'])

export const cvaSwiperSlide = cva([
	'flex h-full w-full items-center justify-center'
])

export const cvaSwiperSlideImage = cva([
	'block h-full w-full object-contain xl:object-cover'
])

export const cvaSwiperItem = cva(['thumbs mt-3 h-32 w-full rounded-lg'])

export const cvaSwiperItemImage = cva(['block h-full w-full object-cover'])
