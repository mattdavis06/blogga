'use client'
import { usePathname, useRouter } from 'next/navigation'
import { FaChevronLeft } from 'react-icons/fa'
import moment from 'moment/moment'
import Nav from './Nav'

type HeaderTypes = {
	allPosts: []
	id?: number
	slug?: string
	tags?: string
	date?: string
}

export default function Header({ allPosts }: HeaderTypes) {
	const router = useRouter()
	const pathname = usePathname()

	return (
		<header className='h-[580px] w-screen md:p-6'>
			<div className='header-bg flex h-full w-full flex-col bg-primaryBlue py-6 px-10 md:rounded-xl'>
				<Nav />
				<div className='header-content mx-auto my-auto max-w-screen-sm md:max-w-screen-md md:pt-10'>
					{/* Default Header View - Not displayed if pathname is a single blog page */}
					{!pathname.includes('/blog/') && (
						<p className='pb-2 text-sm uppercase text-white md:pb-4'>
							<span className='pr-2'>👋</span>Hello
						</p>
					)}
					{/* Single Blog Page - Display blog name tag in header */}
					{allPosts
						.filter(
							(post: HeaderTypes) => post.slug === pathname.split('/').pop()
						)
						.map((post: HeaderTypes) => {
							return (
								<div
									className='blog-article-header-tag relative pb-4'
									key={post.id}
								>
									<div
										className='blog-article-xback-btn group absolute -top-14 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-white/10 transition hover:bg-white lg:top-0 lg:-left-12'
										onClick={() => router.back()}
									>
										<FaChevronLeft className='mr-[2px] text-white transition group-hover:text-primaryBlue' />
									</div>
									<small className='rounded-tl-md rounded-bl-md border border-white px-3 py-1.5 text-xs font-semibold uppercase text-white'>
										{post.tags}
									</small>
									<small className='rounded-tr-md rounded-br-md border border-white bg-white px-3 py-1.5 text-xs font-medium uppercase text-primaryBlue'>
										{moment(post.date).format('ll')}
									</small>
								</div>
							)
						})}
					<h1 className='text-4xl font-bold text-white lg:text-5xl'>
						Insights about my personal and work life, and the in-betweens
					</h1>
					<p className='leading-0 pt-6 text-lg font-normal tracking-wide text-white/50 lg:text-xl'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
						maiores quae, corrupti fuga maxime rem.
					</p>
				</div>
			</div>
		</header>
	)
}
