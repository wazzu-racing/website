import { error } from '@sveltejs/kit';
import { entries as allEntries } from '$lib/content/entries';

export const prerender = true;

/**
 * Provide the list of dynamic route params for prerendering.
 * SvelteKit will call this at build time and prerender a page for each
 * returned `{ id }` object.
 */
export function entries() {
	// Only prerender article pages (type === 'article')
	return allEntries
		.filter((e) => e.type === 'article')
		.map((a) => {
			return { id: a.id };
		});
}

/**
 * Server-side load for newsletter article pages.
 * Provides `article` and (optionally) `relatedEvent` to the page so content
 * is available during SSR rather than relying on client-side lookup.
 */
export function load(event) {
	// guard access to params so TypeScript/JS checks don't complain about missing properties
	const params = (event && event.params) || {};
	const id = params.id;

	// Find the article entry by id
	const articleEntry = allEntries.find((e) => e.type === 'article' && e.id === id);

	if (!articleEntry) {
		// Return a 404 so the SvelteKit app can render a not-found response server-side.
		throw error(404, 'Article not found');
	}

	// Resolve related event if present
	const relatedEvent =
		articleEntry.relatedEventId != null
			? allEntries.find((e) => e.type === 'event' && e.id === articleEntry.relatedEventId) || null
			: null;

	// Return copies to avoid accidental mutation of the shared entries array
	const article = JSON.parse(JSON.stringify(articleEntry));
	const eventObj = relatedEvent ? JSON.parse(JSON.stringify(relatedEvent)) : null;

	return {
		article,
		relatedEvent: eventObj
	};
}
