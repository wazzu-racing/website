import { error } from '@sveltejs/kit';
import { getItemBySlug } from '$lib/data/shop-items';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	const item = getItemBySlug(params.slug);

	if (!item) {
		throw error(404, 'Product not found');
	}

	return {
		item
	};
};
