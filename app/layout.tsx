import './globals.css'
import Header from './components/layout/Header'
import BlogArticleCoverImage from './components/layout/BlogArticleCoverImage'
import Footer from './components/layout/Footer'
import { ReactNode } from 'react'

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
					posts {
						id
						title
						slug
						tags
						date
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

type LayoutTypes = {
	children: ReactNode
}

export default async function RootLayout({ children }: LayoutTypes) {
	const allPosts = await getAllPosts()

	return (
		<html lang='en' className='scroll-smooth'>
			<head />
			<body>
				<Header allPosts={allPosts} />
				<BlogArticleCoverImage allPosts={allPosts} />
				<main className='mx-auto my-10 max-w-screen-sm px-6 sm:px-0 md:max-w-screen-md'>
					{children}
				</main>
				<Footer />
			</body>
		</html>
	)
}

// METADATA =============
export const metadata = {
	title: {
		default: 'Blogga | Insights about my personal and work life',
		template: 'Blogga | %s',
	},
	description: 'Insights about my personal and work life, and the in-betweens.',
	keywords: ['blogga', 'blog', 'my personal blog'],
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
		},
	},
	icons: {
		icon: 'favicon.ico',
	},
}
