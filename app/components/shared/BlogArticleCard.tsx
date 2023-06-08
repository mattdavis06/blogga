import Image from 'next/image'
import Link from 'next/link'
import moment from 'moment/moment'

type BlogArticleCardTypes = {
	slug: string
	tag: string
	postDate: string
	blogTitle: string
	blogExcerpt: string
	blogCardImg: {
		url: string
	}
}

export default function BlogArticleCard({
	slug,
	tag,
	postDate,
	blogTitle,
	blogExcerpt,
	blogCardImg,
}: BlogArticleCardTypes) {
	return (
		// /blog/{slug} - article page, other author blogs card
		<Link
			href={`/blog/${slug}`}
			className='blog-article-card flex flex-col justify-between border-b border-primaryBlue/10 py-10 last:border-b-0 md:flex-row'
		>
			<div className='blog-article-card-content flex h-auto w-full flex-col pb-6 sm:h-[225px] md:h-[210px] md:w-7/12 md:pb-0'>
				<div className='tag-and-date flex w-fit items-center'>
					<small className=' rounded-tl-md rounded-bl-md bg-pastelGreen px-3 py-2 text-xs font-semibold uppercase text-primaryBlue shadow'>
						{tag}
					</small>
					<small className='rounded-tr-md rounded-br-md bg-white px-3 py-2 text-xs font-medium uppercase text-primaryBlue shadow'>
						{moment(postDate).format('ll')}
					</small>
				</div>
				<h3 className='my-4 text-3xl font-semibold text-primaryBlue sm:my-auto '>
					{blogTitle}
				</h3>
				<p className='text-lg text-primaryBlue/70'>{blogExcerpt}</p>
			</div>
			<div className='blog-article-card-img h-auto w-full md:h-[210px] md:w-[300px]'>
				<Image
					src={blogCardImg.url}
					alt={`${blogTitle.toLowerCase().split(' ').join('-')}`}
					width={300}
					height={210}
					loading='lazy'
					className='h-full max-h-56 w-full rounded-lg object-cover'
				/>
			</div>
		</Link>
	)
}
