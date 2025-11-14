import { cars } from '$lib/content/cars.js';
import { error } from '@sveltejs/kit';

export function load({ params }) {
	const car = cars.find((c) => c.id === params.id);

	if (!car) {
		throw error(404, {
			message: 'Car not found'
		});
	}

	return {
		car
	};
}
