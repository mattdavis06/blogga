'use client'
import { useEffect, useState } from 'react'
import { wrapGrid } from 'animate-css-grid'
import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'
import {
	BsBook,
	BsFilterRight,
	BsX,
	BsSortDown,
	BsSortDownAlt,
	BsSortAlphaDown,
	BsSortAlphaDownAlt,
} from 'react-icons/bs'

type AllBlogPosts = {
	allPosts: []
}

type BlogCardTypes = {
	id: number
	slug: string
	title: string
	date: string | Date
	coverImage: {
		url: string
	}
}

export default function BlogsCard({ allPosts }: AllBlogPosts) {
	const [allPostsState, setAllPostsState] = useState<BlogCardTypes[]>(allPosts)

	const [filterQuery, setFilterQuery] = useState('')
	const [isFilterSearchActive, setIsFilterSearchActive] = useState(false)
	const [isSortIconActive, setIsFilterIconActive] = useState({
		newestSort: true,
		oldestSort: false,
		a_zSort: false,
		z_aSort: false,
	})

	// Converts Posts Date from string to a new Date
	const convertDatesToNewDate = () => {
		const updateDateObjectValues = allPostsState.map((post) => {
			return { ...post, date: new Date(post.date) }
		})
		setAllPostsState(updateDateObjectValues)
	}

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		let selectValue = e.target.value

		switch (selectValue) {
			// Sorts Newest
			case 'Newest':
				setAllPostsState([...allPostsState].sort((a, b) => +b.date - +a.date))
				break
			// Sorts Oldest
			case 'Oldest':
				setAllPostsState([...allPostsState].sort((a, b) => +a.date - +b.date))
				break
			// Sorts A-Z
			case 'A-Z':
				setAllPostsState(
					[...allPostsState].sort((a, b) => (a.title > b.title ? 1 : -1))
				)
				break
			// Sorts Z-A
			case 'Z-A':
				setAllPostsState(
					[...allPostsState].sort((a, b) => (a.title > b.title ? -1 : 1))
				)
				break
			default:
				setAllPostsState([...allPostsState].sort((a, b) => +b.date - +a.date))
				break
		}
	}

	useEffect(() => {
		convertDatesToNewDate()

		// Init Animate CSS Grid
		// https://www.npmjs.com/package/animate-css-grid
		const grid = document.querySelector('.blogs-card-grid')
		if (grid instanceof HTMLElement) {
			wrapGrid(grid)
		}
	}, [])

	return (
		// /blogs page - cards
		<>
			<div className='blogs-sort-and-filter relative flex items-center justify-between pb-4'>
				<div className='blogs-sort text-xl sm:text-lg'>
					<div className='sort-desktop-input hidden sm:block'>
						<form>
							<label htmlFor='sortBlogs' className='mr-1 text-primaryBlue/70'>
								Sort:
							</label>
							<select
								name='sortBlogs'
								id='sortBlogs'
								className='text-primaryBlue focus:outline-none'
								onChange={(e) => handleChange(e)}
							>
								<option value='Newest'>Newest</option>
								<option value='Oldest'>Oldest</option>
								<option value='A-Z'>A - Z</option>
								<option value='Z-A'>Z - A</option>
							</select>
						</form>
					</div>
					<div className='sort-mobile-icons flex space-x-4 text-3xl  text-primaryBlue/70 sm:hidden'>
						<div
							className='sort-icon flex cursor-pointer flex-col items-center'
							onClick={() => {
								setIsFilterIconActive({
									...isSortIconActive,
									newestSort: true,
									oldestSort: false,
									a_zSort: false,
									z_aSort: false,
								})
								setAllPostsState(
									[...allPostsState].sort((a, b) => +b.date - +a.date)
								)
							}}
						>
							<small
								className={`text-xs transition-colors ${
									isSortIconActive.newestSort
										? 'text-primaryBlue'
										: 'text-primaryBlue/70'
								}`}
							>
								Newest
							</small>
							<BsSortDown
								className={` transition-colors hover:text-primaryBlue ${
									isSortIconActive.newestSort
										? 'text-primaryBlue'
										: 'text-primaryBlue/70'
								}`}
							/>
						</div>
						<div
							className='sort-icon flex cursor-pointer flex-col items-center'
							onClick={() => {
								setIsFilterIconActive({
									...isSortIconActive,
									newestSort: false,
									oldestSort: true,
									a_zSort: false,
									z_aSort: false,
								})
								setAllPostsState(
									[...allPostsState].sort((a, b) => +a.date - +b.date)
								)
							}}
						>
							<small
								className={`text-xs transition-colors ${
									isSortIconActive.oldestSort
										? 'text-primaryBlue'
										: 'text-primaryBlue/70'
								}`}
							>
								Oldest
							</small>
							<BsSortDownAlt
								className={`transition-colors hover:text-primaryBlue ${
									isSortIconActive.oldestSort
										? ' text-primaryBlue'
										: 'text-primaryBlue/70'
								}`}
							/>
						</div>
						<div
							className='sort-icon flex cursor-pointer flex-col items-center'
							onClick={() => {
								setIsFilterIconActive({
									...isSortIconActive,
									newestSort: false,
									oldestSort: false,
									a_zSort: true,
									z_aSort: false,
								})
								setAllPostsState(
									[...allPostsState].sort((a, b) =>
										a.title > b.title ? 1 : -1
									)
								)
							}}
						>
							<small
								className={`text-xs transition-colors ${
									isSortIconActive.a_zSort
										? 'text-primaryBlue'
										: 'text-primaryBlue/70'
								}`}
							>
								A - Z
							</small>
							<BsSortAlphaDown
								className={`transition-colors hover:text-primaryBlue ${
									isSortIconActive.a_zSort
										? 'text-primaryBlue'
										: ' text-primaryBlue/70'
								}`}
							/>
						</div>
						<div
							className='sort-icon flex cursor-pointer flex-col items-center'
							onClick={() => {
								setIsFilterIconActive({
									...isSortIconActive,
									newestSort: false,
									oldestSort: false,
									a_zSort: false,
									z_aSort: true,
								})
								setAllPostsState(
									[...allPostsState].sort((a, b) =>
										a.title > b.title ? -1 : 1
									)
								)
							}}
						>
							<small
								className={`text-xs transition-colors ${
									isSortIconActive.z_aSort
										? 'text-primaryBlue'
										: 'text-primaryBlue/70'
								}`}
							>
								Z - A
							</small>
							<BsSortAlphaDownAlt
								className={`cursor-pointer transition-colors hover:text-primaryBlue ${
									isSortIconActive.z_aSort
										? 'text-primaryBlue'
										: 'text-primaryBlue/70'
								}`}
							/>
						</div>
					</div>
				</div>
				<div className='blogs-filter flex items-center justify-end'>
					<label
						htmlFor='filerBlogs'
						className={`cursor-pointer   transition-colors hover:text-primaryBlue  ${
							isFilterSearchActive ? 'text-primaryBlue' : 'text-primaryBlue/70'
						}`}
						onClick={() => setIsFilterSearchActive(!isFilterSearchActive)}
					>
						{!isFilterSearchActive ? (
							<BsFilterRight className='text-4xl md:text-3xl' />
						) : (
							<BsX className='text-4xl' />
						)}
					</label>
					<input
						type='text'
						name='filterBlogs'
						id='filterBlogs'
						placeholder='Filter'
						className={`absolute mr-[15%] w-[85%] rounded-md border border-primaryBlue/30 px-3 py-2 text-xl text-primaryBlue outline-none placeholder:text-primaryBlue/30 focus:border-primaryBlue focus:outline-none sm:mr-[5%] sm:w-[95%] md:py-1 ${
							isFilterSearchActive
								? 'translate-x-[0%] opacity-100 transition-all duration-300'
								: '-translate-x-[100%] opacity-0 transition-all duration-300'
						}`}
						value={filterQuery}
						onChange={(e) =>
							setFilterQuery(e.currentTarget.value.replace(/\s/g, ''))
						}
					/>
				</div>
			</div>
			<div className='blogs-card-grid'>
				{allPostsState
					.filter((item) => {
						return filterQuery.trim().toLowerCase() === ''
							? item
							: item.title.trim().toLowerCase().includes(filterQuery)
					})
					.map((post: BlogCardTypes) => {
						return (
							<div className='blog-card' key={post.id}>
								<Link
									href={`/blog/${post.slug}`}
									className=' flex h-[320px] w-full flex-col rounded-lg shadow-lg transition hover:-translate-y-1 hover:shadow-2xl sm:h-[280px] lg:h-[240px]'
								>
									<div
										className='blog-card-header flex h-1/2 flex-col justify-between rounded-tl-lg rounded-tr-lg p-7 py-5 sm:p-5 lg:p-3'
										style={{
											backgroundImage: `url(${post.coverImage.url})`,
											backgroundSize: '1px 1px',
										}}
									>
										<div className='card-header flex items-center justify-between'>
											<BsBook className='text-lg text-white' />
											<p className='text-base font-medium text-white/80 lg:text-xs'>
												{moment(post.date).format('Do-MMM-YY')}
											</p>
										</div>

										<h5 className='mt-auto min-h-[50px] text-2xl font-medium text-white line-clamp-2 sm:text-xl md:text-base'>
											{post.title}
										</h5>
									</div>
									<Image
										src={post.coverImage.url}
										width={600}
										height={600}
										alt={`${post.title.toLowerCase().split(' ').join('-')}`}
										className={
											'blog-card-img mt-auto h-1/2 w-full rounded-bl-lg rounded-br-lg object-cover'
										}
									></Image>
								</Link>
							</div>
						)
					})}
			</div>
		</>
	)
}
