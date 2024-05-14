import React, { FC } from 'react'
import { FooterProps } from '@/components/footer/footer.props'
import classes from './footer.module.css'
import classNames from 'classnames'
import { FaTelegram } from 'react-icons/fa'
import { FaPhone } from 'react-icons/fa6'
import { IoLogoWhatsapp } from 'react-icons/io'
import { MdEmail } from 'react-icons/md'
import { format } from 'date-fns'

const Footer: FC<FooterProps> = ({ className, ...props }) => {
	return (
		<footer className={classNames(className, classes.wrapper)} {...props}>
			<div className={classes.content}>
				<div className='self-center'>
					Learnify © {format(new Date(), 'yyyy')} Все права защищены
				</div>
				<div className='hover:text-gray-light flex flex-col gap-5'>
					<div>Ответим на Ваши вопросы</div>
					<div className='flex justify-start items-center md:justify-around gap-10'>
						<FaTelegram size={24} className='cursor-pointer' />
						<MdEmail size={24} className='cursor-pointer' />
						<FaPhone size={24} className='cursor-pointer' />
						<IoLogoWhatsapp size={24} className='cursor-pointer' />
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
