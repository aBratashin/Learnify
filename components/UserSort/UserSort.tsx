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
import { UserSortEnum } from '../User/User.reducer'

const UserSort: FC<SortProps> = ({ sort, setSort, className, ...props }) => {
	return (
		<div className={classNames(cvaSortWrapper(), className)} {...props}>
			<div className={cvaSortHidden()} id='sort'>
				Сортировка
			</div>
			<button
				id='role'
				onClick={() => setSort(UserSortEnum.Role)}
				className={classNames(cvaSortButton(), {
					[cvaSortEnum()]: sort === UserSortEnum.Role
				})}
				aria-pressed={sort === UserSortEnum.Role}
				aria-labelledby='sort role'
			>
				{sort === UserSortEnum.Role && <SortIcon className={cvaSortIcon()} />}
				По роли
			</button>
			<button
				id='createdAt'
				onClick={() => setSort(UserSortEnum.CreatedAt)}
				className={classNames(cvaSortButton(), {
					[cvaSortEnum()]: sort === UserSortEnum.CreatedAt
				})}
				aria-pressed={sort === UserSortEnum.CreatedAt}
				aria-labelledby='sort createdAt'
			>
				{sort === UserSortEnum.CreatedAt && (
					<SortIcon className={cvaSortIcon()} />
				)}
				По дате
			</button>
		</div>
	)
}

export default UserSort
