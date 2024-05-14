import React, { FC } from 'react'
import SortIcon from './sort.svg'
import classNames from 'classnames'
import {
	cvaSortButton,
	cvaSortEnum,
	cvaSortHidden,
	cvaSortIcon,
	cvaSortWrapper
} from './SortStyle'
import { SortProps } from './Sort.props'
import { ContactSortEnum } from '../Contact/ContactSort.reducer'

const ContactSort: FC<SortProps> = ({ sort, setSort, className, ...props }) => {
	return (
		<div className={classNames(cvaSortWrapper(), className)} {...props}>
			<div className={cvaSortHidden()} id='sort'>
				Сортировка
			</div>
			<button
				id='status'
				onClick={() => setSort(ContactSortEnum.Status)}
				className={classNames(cvaSortButton(), {
					[cvaSortEnum()]: sort === ContactSortEnum.Status
				})}
				aria-pressed={sort === ContactSortEnum.Status}
				aria-labelledby='sort status'
			>
				{sort === ContactSortEnum.Status && (
					<SortIcon className={cvaSortIcon()} />
				)}
				По статусу
			</button>
			<button
				id='createdAt'
				onClick={() => setSort(ContactSortEnum.CreatedAt)}
				className={classNames(cvaSortButton(), {
					[cvaSortEnum()]: sort === ContactSortEnum.CreatedAt
				})}
				aria-pressed={sort === ContactSortEnum.CreatedAt}
				aria-labelledby='sort createdAt'
			>
				{sort === ContactSortEnum.CreatedAt && (
					<SortIcon className={cvaSortIcon()} />
				)}
				По дате
			</button>
		</div>
	)
}

export default ContactSort
