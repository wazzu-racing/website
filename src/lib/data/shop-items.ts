import shirtFront from '$lib/assets/shop/shirt-front.png?enhanced';
import hat from '$lib/assets/shop/hat.png?enhanced';

export interface ShopItem {
	id: number;
	name: string;
	slug: string;
	price: number;
	img: typeof shirtFront | typeof hat;
	description: string;
	details?: string;
	sizes?: string[];
	colors?: string[];
	inStock?: boolean;
}

export const shopItems: ShopItem[] = [
	{
		id: 0,
		name: 'T-Shirt',
		slug: 't-shirt',
		price: 15.0,
		img: shirtFront,
		description: 'A t-shirt with the Wazzu Racing logo on the front and an image on the back.',
		details:
			'Show your Wazzu Racing pride with this comfortable, high-quality t-shirt. Features the official Wazzu Racing logo on the front and a striking design on the back. Perfect for race day or everyday wear.',
		sizes: ['S', 'M', 'L', 'XL', 'XXL'],
		inStock: true
	},
	{
		id: 1,
		name: 'Hat',
		slug: 'hat',
		price: 10.0,
		description: 'A Wazzu Racing branded hat',
		img: hat,
		details:
			'Stay cool and look great with our official Wazzu Racing hat. Adjustable fit with embroidered logo for a premium look and feel. Perfect for sunny race days or casual wear.',
		sizes: ['One Size'],
		inStock: true
	}
];

export function getItemBySlug(slug: string): ShopItem | undefined {
	return shopItems.find((item) => item.slug === slug);
}

export function getItemById(id: number): ShopItem | undefined {
	return shopItems.find((item) => item.id === id);
}
