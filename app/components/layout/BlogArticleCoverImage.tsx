'use client'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

type AllPostsTypes = {
	allPosts: null | BlogArticleCoverImageTypes[]
	slug?: string
}

type BlogArticleCoverImageTypes = {
	// allPosts: []
	id: number
	slug: string
	coverImage: {
		url: string
	}
	title: string
}

export default function BlogArticleCoverImage({ allPosts }: AllPostsTypes) {
	const pathname = usePathname()

	if (pathname.includes('/blog/') && allPosts) {
		const filteredPosts = allPosts?.filter(
			(post: BlogArticleCoverImageTypes) =>
				post.slug === pathname.split('/').pop()
		)
		if (filteredPosts?.length) {
			return (
				// /blog/{slug} - blog cover image
				<section
					id='blogArticleCoverImg'
					className='relative -z-10 sm:-mt-[4rem] md:p-6'
				>
					{filteredPosts.map((post: BlogArticleCoverImageTypes) => {
						return (
							<Image
								key={post.id}
								src={post.coverImage.url}
								className='h-full max-h-[800px] w-full object-cover md:rounded-bl-xl md:rounded-br-xl'
								alt={`${post.title.toLowerCase().split(' ').join('-')}-img`}
								loading='eager'
								blurDataURL='data:text/plain;base64,SGVsbG8sIFdvcmxkIQ=='
								placeholder='blur'
								width={1000}
								height={800}
							></Image>
						)
					})}
				</section>
			)
		}
	}
	return <div></div>
}
