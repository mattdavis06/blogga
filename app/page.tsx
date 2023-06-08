import { Fragment } from 'react'
import PageHeaderTitle from './components/layout/PageHeaderTitle'
import BlogArticleCard from './components/shared/BlogArticleCard'

const getLatestPosts = async () => {
	const res = await fetch(
		`https://eu-west-2.cdn.hygraph.com/content/${process.env.CMS_API_KEY}/master`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				query: `{
					posts (orderBy: date_DESC, first: 5) {
						id
						slug
						tags
						date
						title
						excerpt
						coverImage {
						  url
						}
					  }
				  }`,
			}),
			cache: 'no-store',
		}
	)
	const { data } = await res.json()
	return data.posts
}

type LatestBlogsType = {
	id: number
	slug: string
	tags: string
	date: string
	title: string
	excerpt: string
	coverImage: {
		url: string
	}
}

export default async function LatestBlogs() {
	const latestPosts = await getLatestPosts()

	return (
		<Fragment>
			<PageHeaderTitle headerTitle={'Latest Blogs'} />
			<section id='latestBlogs' className='section-borders-y'>
				<div className='blog-articles-wrapper'>
					{latestPosts.map((post: LatestBlogsType) => {
						return (
							<BlogArticleCard
								key={post.id}
								slug={post.slug}
								tag={post.tags}
								postDate={post.date}
								blogTitle={post.title}
								blogExcerpt={post.excerpt}
								blogCardImg={post.coverImage}
							/>
						)
					})}
				</div>
			</section>
		</Fragment>
	)
}
