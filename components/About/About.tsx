import { FC } from 'react'
import { aboutProps } from './About.props'
import {
	cvaContainer,
	cvaItem,
	cvaItemText,
	cvaItemTitle,
	cvaTitle,
	cvaWhy,
	cvaWrapper
} from './AboutStyle'

const About: FC<aboutProps> = () => {
	return (
		<div className={cvaWrapper()}>
			<div className={cvaWhy()}>
				<h2 className={cvaTitle()}>
					Почему выбирают образовательную платформу Learn
					<span className='text-primary'>ify</span>
				</h2>
			</div>
			<div className={cvaContainer()}>
				<div className={cvaItem()}>
					<h2 className={cvaItemTitle()}>200+</h2>
					<p className={cvaItemText()}>Образовательный курсов</p>
				</div>
				<div className={cvaItem()}>
					<h2 className={cvaItemTitle()}>5+</h2>
					<p className={cvaItemText()}>Образовательный платформ</p>
				</div>
				<div className={cvaItem()}>
					<h2 className={cvaItemTitle()}>24/7</h2>
					<p className={cvaItemText()}>Учеба по своему графику</p>
				</div>
				<div className={cvaItem()}>
					<h2 className={cvaItemTitle()}>93%</h2>
					<p className={cvaItemText()}>Положительных отзывов</p>
				</div>
			</div>
		</div>
	)
}

export default About
