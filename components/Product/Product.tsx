'use client'
import React, {
	ForwardedRef,
	forwardRef,
	useRef,
	useState,
	useEffect
} from 'react'
import { ProductProps } from './Product.props'
import Image from 'next/image'
import Card from '@/components/Card/Card'
import Rating from '@/components/Rating/Rating'
import Tag from '@/components/Tag/Tag'
import classes from './Product.module.css'
import Button from '@/components/Button/Button'
import { declOfNum, priceRu } from '@/helpers/helpers'
import Divider from '@/components/Divider/Divider'
import classNames from 'classnames'
import Review from '@/components/Review/Review'
import ReviewForm from '@/components/ReviewForm/ReviewForm'
import { motion } from 'framer-motion'
import Link from 'next/link'
import HeartButton from '../HeartButton/HeartButton'
import CartButton from '../CartButton/CartButton'
import DeleteButton from '../DeleteButton/DeleteButton'
import EditButton from '../EditButton/EditButton'

const Product = motion(
	// eslint-disable-next-line react/display-name
	forwardRef(
		(
			{ product, className, currentUser, manage, ...props }: ProductProps,
			ref: ForwardedRef<HTMLDivElement>
		) => {
			const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false)
			const reviewRef = useRef<HTMLDivElement>(null)

			const variants = {
				visible: { opacity: 1, height: 'auto' },
				hidden: { opacity: 0, height: 0 }
			}

			const scrollToReview = () => {
				setIsReviewOpened(true)
				reviewRef.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				})
				reviewRef.current?.focus()
			}

			const totalRating = product.reviews.reduce(
				(acc, review) => acc + review.rating,
				0
			)
			const averageRating = totalRating / product.reviews.length

			return (
				<div className={className} {...props} ref={ref}>
					<Card className={classes.product}>
						<div className={classes.logo}>
							<Image
								src={product.image}
								alt={product.title}
								width={70}
								height={70}
								priority
							/>
						</div>
						<div className={classes.title}>{product.title}</div>
						<div className={classes.price}>
							<span>
								<span className='w-0 h-0 overflow-hidden absolute'>Цена</span>
								{priceRu(product.price)}
							</span>
							{product.oldPrice && (
								<Tag className={classes.oldPrice} color='green'>
									<span className='w-0 h-0 overflow-hidden absolute'>
										Скидка
									</span>
									{priceRu(product.price - product.oldPrice)}
								</Tag>
							)}
						</div>
						{manage ? (
							<div className={classes.heart}>
								<DeleteButton id={product.id} />
							</div>
						) : (
							<div className={classes.heart}>
								<HeartButton courseId={product.id} currentUser={currentUser} />
							</div>
						)}
						<div className={classes.credit}>
							<span className='w-0 h-0 overflow-hidden absolute'>Кредит</span>
							{priceRu(product.credit)}/
							<span className={classes.month}>мес</span>
						</div>
						<div className={classes.rating}>
							<span className='w-0 h-0 overflow-hidden absolute'>
								рейтинг + {product.reviewAvg ?? product.initialRating}
							</span>
							<Rating rating={averageRating || 0} />
						</div>
						<div className={classes.tags}>
							{product.categories.map(c => (
								<Tag key={c} className={classes.category} color='ghost'>
									{c}
								</Tag>
							))}
						</div>
						<div className={classes.priceTitle} aria-hidden='true'>
							цена
						</div>
						<div className={classes.creditTitle} aria-hidden='true'>
							кредит
						</div>
						<div className={classes.rateTitle}>
							<a href='#ref' onClick={scrollToReview}>
								{product.reviews.length}{' '}
								{declOfNum(product.reviews.length, [
									'отзыв',
									'отзыва',
									'отзывов'
								])}
							</a>
						</div>
						<Divider className={classes.hr} />
						<div className={classes.description}>{product.description}</div>
						<div className={classes.feature}>
							{product.characteristics.map(c => (
								<div className={classes.characteristics} key={c.name}>
									<span className={classes.characteristicsName}>{c.name}</span>
									<span className={classes.characteristicsDots}></span>
									<span className={classes.characteristicsValue}>
										{c.value}
									</span>
								</div>
							))}
						</div>
						<div className={classes.advBlock}>
							{product.advantages && (
								<div className={classes.advantages}>
									<div className={classes.advTitle}>Преимущества</div>
									<div>{product.advantages}</div>
								</div>
							)}
							{product.disadvantages && (
								<div className={classes.disadvantages}>
									<div className={classes.advTitle}>Недостатки</div>
									<div>{product.disadvantages}</div>
								</div>
							)}
						</div>
						<Divider className={classes.hr2} />
						<div className={classes.actions}>
							<Link href={product.link} target='_blank'>
								<Button appearance='primary'>Узнать подробнее</Button>
							</Link>
							<Button
								appearance='ghost'
								arrow={isReviewOpened ? 'down' : 'right'}
								onClick={() => setIsReviewOpened(!isReviewOpened)}
								aria-expanded={isReviewOpened}
							>
								Читать отзывы
							</Button>
						</div>
						{manage ? (
							<div className={classes.cart}>
								<EditButton courseId={product.id} />
							</div>
						) : (
							<div className={classes.cart}>
								<CartButton courseId={product.id} currentUser={currentUser} />
							</div>
						)}
					</Card>
					<motion.div
						variants={variants}
						initial='hidden'
						ref={reviewRef}
						animate={isReviewOpened ? 'visible' : 'hidden'}
					>
						{isReviewOpened && (
							<Card
								color='blue'
								className={classNames(classes.reviews)}
								ref={reviewRef}
								tabIndex={isReviewOpened ? 0 : -1}
							>
								{product.reviews.map(r => (
									<div key={r.id}>
										<Review review={r} manage={manage} />
										<Divider />
									</div>
								))}
								<ReviewForm
									isOpened={isReviewOpened}
									product_id={product.id}
									currentUser={currentUser}
								/>
							</Card>
						)}
					</motion.div>
				</div>
			)
		}
	)
)

export default Product
