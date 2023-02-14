import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../config';

export async function get() {
	const blog = await getCollection('blog');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: import.meta.env.SITE,
		items: blog.map((post) => ({
			title: post.data.title,
			pubDate: post.data.pubDate,
			description: post.data.description,
			customData: post.data.customData,
			link: `/blog/${post.slug}/`,
		})),
	});
}