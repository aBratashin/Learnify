import React, { FC } from 'react'
import { hhDataProps } from './HhData.props'
import Card from '@/components/Card/Card'
import RateIcon from './rate.svg'
import { priceRu } from '@/helpers/helpers'
import {
	cvaFillRed,
	cvaHhDataIcons,
	cvaHhDataSalary,
	cvaHhDataTitle,
	cvaLevelContainer,
	cvaLevels,
	cvaTotal,
	cvaTotalCount,
	cvaWrapper
} from './HhDataStyle'

const HhData: FC<hhDataProps> = ({
	count,
	juniorSalary,
	middleSalary,
	seniorSalary
}) => {
	return (
		<div className={cvaWrapper()}>
			<Card className={cvaTotal()} color='white'>
				<div className={cvaHhDataSalary()}>Всего вакансий</div>
				<div className={cvaTotalCount()}>{count}</div>
			</Card>
			<Card className={cvaLevels()} color='white'>
				<div className={cvaLevelContainer()}>
					<div className={cvaHhDataTitle()}>Начальный</div>
					<div className={cvaHhDataSalary()}>{priceRu(juniorSalary)}</div>
					<div className={cvaHhDataIcons()}>
						<RateIcon className={cvaFillRed()} />
						<RateIcon />
						<RateIcon />
					</div>
				</div>
				<div className={cvaLevelContainer()}>
					<div className={cvaHhDataTitle()}>Средний</div>
					<div className={cvaHhDataSalary()}>{priceRu(middleSalary)}</div>
					<div className={cvaHhDataIcons()}>
						<RateIcon className={cvaFillRed()} />
						<RateIcon className={cvaFillRed()} />
						<RateIcon />
					</div>
				</div>
				<div>
					<div className={cvaHhDataTitle()}>Профессионал</div>
					<div className={cvaHhDataSalary()}>{priceRu(seniorSalary)}</div>
					<div className={cvaHhDataIcons()}>
						<RateIcon className={cvaFillRed()} />
						<RateIcon className={cvaFillRed()} />
						<RateIcon className={cvaFillRed()} />
					</div>
				</div>
			</Card>
		</div>
	)
}

export default HhData
