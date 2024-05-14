import React, { FC } from 'react'
import { ReviewProps } from './Review.props'
import classNames from 'classnames'
import classes from './Review.module.css'
import UserIcon from './user.svg'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import Rating from '@/components/Rating/Rating'

const Review: FC<ReviewProps> = ({ review, className, ...props }) => {
	const { name, title, description, createdAt, rating } = review

	return (
		<div className={classNames(classes.review, className)} {...props}>
			<UserIcon className={classes.user} />
			<div className={classes.title}>
				<span className={classes.name}>{name}:</span>&nbsp;&nbsp;
				<span>{title}</span>
			</div>
			<div className={classes.date}>
				{format(new Date(createdAt), 'dd MMM yyyy', { locale: ru })}
			</div>
			<div className={classes.rating}>
				<Rating rating={rating} />
			</div>
			<div className={classes.description}>{description}</div>
		</div>
	)
}

export default Review
