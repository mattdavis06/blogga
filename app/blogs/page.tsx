import { Fragment } from 'react'
import PageHeaderTitle from '../components/layout/PageHeaderTitle'
import BlogsCard from '../components/shared/BlogsCard'

const getAllPosts = async () => {
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
					posts(orderBy: date_DESC) {
						id
						slug
						date
						title
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

export default async function Blogs() {
	const allPosts = await getAllPosts()

	return (
		<Fragment>
			<PageHeaderTitle headerTitle={'Blogs'} />
			<section id='blogs' className='section-borders-y'>
				<div className='blogs-wrapper py-10'>
					<BlogsCard allPosts={allPosts} />
				</div>
			</section>
		</Fragment>
	)
}

// METADATA =============
export const metadata = {
	title: 'Blogs',
	description: 'All Blogs',
	keywords: ['blogga', 'blogs', 'all blogs'],
}
