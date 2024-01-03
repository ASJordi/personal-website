import { z, defineCollection } from "astro:content";

const blogSchema = ({ image }) => z.object({
	title: z.string(),
	description: z.string(),
	pubDate: z.coerce.date(),
	updatedDate: z.string().optional(),
	badge: z.string().optional(),
	tags: z.array(z.string()).refine(items => new Set(items).size === items.length, {
		message: 'tags must be unique',
	}).optional(),
	heroImage: image().refine((img) => img.width >= 1080, {
		message: "Cover image must be at least 1080 pixels wide!",
	}),
});

const storeSchema = z.object({
	title: z.string(),
	description: z.string(),
	custom_link_label: z.string(),
	custom_link: z.string().optional(),
	updatedDate: z.coerce.date(),
	pricing: z.string().optional(),
	oldPricing: z.string().optional(),
	badge: z.string().optional(),
	checkoutUrl: z.string().optional(),
	heroImage: z.string().optional(),
});

export type BlogSchema = z.infer<ReturnType<typeof blogSchema>>;
export type StoreSchema = z.infer<typeof storeSchema>;

const blogCollection = defineCollection({ schema: blogSchema });
const storeCollection = defineCollection({ schema: storeSchema });

export const collections = {
	'blog': blogCollection,
	'store': storeCollection
}
