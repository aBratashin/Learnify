import React, { FC } from 'react'
import { ReviewProps } from './Review.props'
import classNames from 'classnames'
import classes from './Review.module.css'
import UserIcon from './user.svg'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import Rating from '@/components/Rating/Rating'
import DeleteButton from '../DeleteButton/DeleteButton'

const Review: FC<ReviewProps> = ({ review, manage, className, ...props }) => {
	const { id, name, title, description, createdAt, rating } = review

	return (
		<div
			className={classNames(
				classes.review,
				manage && classes.reviewAdmin,
				className
			)}
			{...props}
		>
			<UserIcon className={classes.user} />
			<div className={classes.title}>
				<span className={classes.name}>{name}:</span>&nbsp;&nbsp;
				<span className={classes.title}>{title}</span>
			</div>
			<div className={classes.date}>
				{format(new Date(createdAt), 'dd MMM yyyy', { locale: ru })}
			</div>
			<div className={classes.rating}>
				<Rating rating={rating} />
			</div>
			{manage && (
				<div className={classes.heart}>
					<DeleteButton id={id} isReview={true} />
				</div>
			)}
			<div className={classes.description}>{description}</div>
		</div>
	)
}

export default Review
