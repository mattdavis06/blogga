import { FaFacebookF, FaTwitter, FaInstagramSquare } from 'react-icons/fa'

const navItems = [
	{
		id: 1,
		navItemName: 'Latest Blogs',
		navItemLink: '/',
		navItemLinkActive: null,
	},
	{
		id: 2,
		navItemName: 'About',
		navItemLink: '/about',
		navItemLinkActive: 'about',
	},
	{
		id: 3,
		navItemName: 'Blogs',
		navItemLink: '/blogs',
		navItemLinkActive: 'blogs',
	},
]

const socialFooterItems = [
	{
		id: 1,
		socialItem: <FaFacebookF />,
		socialItemLink: '/',
		socialAriaLabel: 'our-facebook-link',
	},
	{
		id: 2,
		socialItem: <FaTwitter />,
		socialItemLink: '/',
		socialAriaLabel: 'our-twitter-link',
	},
	{
		id: 3,
		socialItem: <FaInstagramSquare />,
		socialItemLink: '/',
		socialAriaLabel: 'our-instagram-link',
	},
]

export { navItems, socialFooterItems }
