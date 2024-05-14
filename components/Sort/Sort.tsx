import React, { FC } from 'react'
import { SortEnum, SortProps } from '@/components/Sort/Sort.props'
import SortIcon from './sort.svg'
import classNames from 'classnames'
import {
	cvaSortButton,
	cvaSortEnum,
	cvaSortHidden,
	cvaSortIcon,
	cvaSortWrapper
} from './SortStyle'

const Sort: FC<SortProps> = ({ sort, setSort, className, ...props }) => {
	return (
		<div className={classNames(cvaSortWrapper(), className)} {...props}>
			<div className={cvaSortHidden()} id='sort'>
				Сортировка
			</div>
			<button
				id='rating'
				onClick={() => setSort(SortEnum.Rating)}
				className={classNames(cvaSortButton(), {
					[cvaSortEnum()]: sort === SortEnum.Rating
				})}
				aria-pressed={sort === SortEnum.Rating}
				aria-labelledby='sort rating'
			>
				{sort === SortEnum.Rating && <SortIcon className={cvaSortIcon()} />}
				По рейтингу
			</button>
			<button
				id='price'
				onClick={() => setSort(SortEnum.Price)}
				className={classNames(cvaSortButton(), {
					[cvaSortEnum()]: sort === SortEnum.Price
				})}
				aria-pressed={sort === SortEnum.Price}
				aria-labelledby='sort price'
			>
				{sort === SortEnum.Price && <SortIcon className={cvaSortIcon()} />}
				По цене
			</button>
		</div>
	)
}

export default Sort
