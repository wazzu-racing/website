// Robust Markdown + Frontmatter parser for newsletter articles.
// Uses `marked` for Markdown -> HTML, `gray-matter` for frontmatter parsing,
// and `sanitize-html` to sanitize the rendered HTML before it is used with {@html}.
//
// Exports:
// - mdToHtml(markdown, opts) -> sanitized HTML string
// - markdownToEntry({ raw, filePath?, id?, defaults? }) -> entry object compatible with entries.js
// - convertModulesToEntries(modulesObj, opts) -> Array of entries from an import.meta.glob result
//
// Notes:
// - This file assumes the consuming project has the following dependencies installed:
//   - marked
//   - gray-matter
//   - sanitize-html
// - For production security, sanitize-html is configured conservatively by default.
// - Article fields created by markdownToEntry:
//   { id, type:'article', title, date, relatedEventId, excerpt, content, tags }
//
// Example usage (in entries.js):
// const mdModules = import.meta.glob('../newsletters/articles/*.md', { eager: true, as: 'raw' });
// import { convertModulesToEntries } from '$lib/newsletters/markdown';
// const mdEntries = convertModulesToEntries(mdModules);

import { marked } from 'marked';
import matter from 'gray-matter';
// @ts-expect-error - sanitize-html does not ship types in this project; we treat it as any for now
import sanitizeHtml from 'sanitize-html';

/**
 * Default sanitize-html options used to clean generated HTML.
 * Adjust allowedTags/allowedAttributes to match your needs.
 */
const DEFAULT_SANITIZE_OPTIONS = {
	allowedTags: [
		'h1',
		'h2',
		'h3',
		'h4',
		'h5',
		'h6',
		'blockquote',
		'p',
		'a',
		'ul',
		'ol',
		'nl',
		'li',
		'b',
		'i',
		'strong',
		'em',
		'code',
		'pre',
		'hr',
		'br',
		'img',
		'table',
		'thead',
		'tbody',
		'tr',
		'th',
		'td',
		'details',
		'summary'
	],
	allowedAttributes: {
		a: ['href', 'name', 'target', 'rel'],
		img: ['src', 'alt', 'title', 'width', 'height'],
		'*': ['class'] // allow classes if you rely on styling
	},
	allowedSchemesByTag: {
		a: ['http', 'https', 'mailto', 'tel'],
		img: ['http', 'https', 'data']
	},
	transformTags: {
		// Ensure external links have noopener and noreferrer
		/** @param {string} tagName @param {Record<string,string>} attribs */
		a: (tagName, attribs) => {
			const href = (attribs && attribs.href) || '';
			const out = { tagName, attribs: { ...(attribs || {}) } };
			if (/^https?:\/\//i.test(href)) {
				out.attribs.target = '_blank';
				out.attribs.rel = (out.attribs.rel ? out.attribs.rel + ' ' : '') + 'noopener noreferrer';
			}
			return out;
		}
	}
};

/**
 * Slugify helper for generating an id from a title/filename.
 */
/**
 * @param {string} input
 * @returns {string}
 */
function slugify(input) {
	return String(input || '')
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

/**
 * Get first paragraph text (plain text) from markdown content.
 * Uses a simple approach: split on double-newline and return first non-empty block.
 */
/**
 * @param {string} md
 * @returns {string}
 */
function extractFirstParagraph(md) {
	if (!md) return '';
	const blocks = String(md).split(/\r?\n\r?\n/);
	for (const b of blocks) {
		const trimmed = b.trim();
		if (trimmed.length > 0) {
			// Remove markdown inline formatting for a short plain excerpt:
			let plain = trimmed
				.replace(/!\[.*?\]\(.*?\)/g, '') // images
				.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links -> text
				.replace(/`([^`]+)`/g, '$1') // inline code
				.replace(/\*\*(.*?)\*\*/g, '$1') // bold
				.replace(/\*(.*?)\*/g, '$1') // italic
				.replace(/(^|\s)#+\s*/g, '') // headings
				.replace(/^-{3,}$/gm, '') // hr
				.replace(/\r?\n/g, ' ')
				.trim();
			// collapse whitespace
			plain = plain.replace(/\s+/g, ' ');
			return plain;
		}
	}
	return '';
}

/**
 * Convert Markdown string to sanitized HTML using marked + sanitize-html.
 * @param {string} markdown
 * @param {{sanitizeOptions?: any, markedOptions?: any}} [opts] - optional overrides
 * @returns {string} sanitized HTML
 */
export function mdToHtml(markdown, opts = {}) {
	const { sanitizeOptions = {}, markedOptions = {} } = opts;

	// Configure marked with sensible defaults; allow override via markedOptions.
	marked.setOptions({
		headerIds: true,
		mangle: false, // avoid automatic email obfuscation
		breaks: false,
		smartLists: true,
		smartypants: true,
		...markedOptions
	});

	// Render markdown to HTML
	const rendered = marked.parse(String(markdown || ''));

	// Sanitize result
	const clean = sanitizeHtml(rendered, {
		...DEFAULT_SANITIZE_OPTIONS,
		...sanitizeOptions,
		// Merge allowedAttributes in a safe manner
		allowedAttributes: {
			...DEFAULT_SANITIZE_OPTIONS.allowedAttributes,
			...(sanitizeOptions.allowedAttributes || {})
		},
		transformTags: {
			...(DEFAULT_SANITIZE_OPTIONS.transformTags || {}),
			...(sanitizeOptions.transformTags || {})
		}
	});

	return clean;
}

/**
 * Convert a markdown source (with frontmatter) into an entry object used by the site.
 * Accepts:
 *  - raw: raw markdown string (including YAML frontmatter)
 *  - filePath: optional, used to derive defaults (date/id) from filename
 *  - id: optional explicit id
 *  - defaults: optional object providing default values for missing frontmatter (e.g. default.date)
 *
 * Returns:
 *  {
 *    id, type: 'article', title, date, relatedEventId, excerpt, content, tags
 *  }
 */
/**
 * Convert a markdown source (with frontmatter) into an entry object used by the site.
 * @param {{ raw?: string, filePath?: string, id?: string, defaults?: Record<string, any> }} [options]
 * @returns {object}
 */
export function markdownToEntry({ raw, filePath = '', id: explicitId = '', defaults = {} } = {}) {
	const matterResult = matter(String(raw || ''));

	const fm = matterResult.data || {};
	const body = matterResult.content || '';

	// Derive id: explicit > frontmatter.id > filePath slug > title slug
	let id = explicitId || fm.id || '';
	if (!id && filePath) {
		// try extract base filename from filePath
		const parts = filePath.split('/');
		const file = parts[parts.length - 1] || filePath;
		// strip extension
		const name = file.replace(/\.[^/.]+$/, '');
		// If filename has date prefix, remove it for id
		const m = name.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
		id = m ? m[2] : name;
		id = slugify(id);
	}
	if (!id) {
		// fallback to title
		const fromTitle = fm.title || extractFirstParagraph(body).split(/\r?\n/)[0] || 'article';
		id = slugify(fromTitle);
	}

	const title =
		fm.title ||
		(() => {
			// If first non-empty line starts with "#", use it
			const firstLine = String(body).split(/\r?\n/).find(Boolean) || '';
			if (/^#{1,6}\s+/.test(firstLine)) {
				return firstLine.replace(/^#{1,6}\s+/, '').trim();
			}
			return (fm.title || id)
				.replace(/[-_]+/g, ' ')
				.replace(/\b\w/g, /** @param {string} c */ (c) => c.toUpperCase());
		})();

	// Date: frontmatter.date > filename prefix > defaults.date > today
	let date = fm.date || '';
	if (!date && filePath) {
		const parts = filePath.split('/');
		const file = parts[parts.length - 1] || filePath;
		const name = file.replace(/\.[^/.]+$/, '');
		const m = name.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
		if (m) date = m[1];
	}
	if (!date) {
		date = fm.date || defaults.date || new Date().toISOString().slice(0, 10);
	}

	const tags = Array.isArray(fm.tags)
		? fm.tags.map(String)
		: fm.tags
			? String(fm.tags)
					.split(',')
					.map((s) => s.trim())
			: [];

	const relatedEventId = fm.relatedEventId || fm.relatedEvent || null;

	// Excerpt: frontmatter.excerpt > first paragraph text
	let excerpt = fm.excerpt || '';
	if (!excerpt) {
		const firstPara = extractFirstParagraph(body);
		excerpt = firstPara ? firstPara : '';
	}
	// Sanitize excerpt's minimal HTML (we want plaintext or a small sanitized string)
	const excerptHtml = sanitizeHtml(excerpt, {
		allowedTags: ['strong', 'em', 'b', 'i', 'code'],
		allowedAttributes: {}
	});

	// Render full content to sanitized HTML
	const contentHtml = mdToHtml(body);

	return {
		id,
		type: 'article',
		title,
		date,
		relatedEventId: relatedEventId || null,
		excerpt: excerptHtml,
		content: contentHtml,
		tags
	};
}

/**
 * Convert an import.meta.glob result (modules object with { path: rawText }) into entries.
 * Intended usage pattern:
 *  const mdModules = import.meta.glob('../newsletters/articles/*.md', { eager: true, as: 'raw' });
 *  const entries = convertModulesToEntries(mdModules);
 *
 * Options:
 *  - defaults: defaults forwarded to markdownToEntry
 *
 * Returns an array of entry objects.
 */
/**
 * Convert an import.meta.glob result (modules object with { path: rawText }) into entries.
 * @param {Record<string,string>} modulesObj
 * @param {{defaults?: Record<string, any>}} [opts]
 * @returns {Array<object>}
 */
export function convertModulesToEntries(modulesObj = {}, opts = {}) {
	/** @type {Array<any>} */
	const entries = [];
	for (const [path, raw] of Object.entries(modulesObj)) {
		try {
			const entry = markdownToEntry({ raw, filePath: path, defaults: opts.defaults || {} });
			entries.push(entry);
		} catch (err) {
			// swallow parse errors but log in console during dev for visibility
			if (typeof console !== 'undefined') {
				console.error('[markdown] failed to convert', path, err);
			}
		}
	}
	// Sort newest-first by date (ISO YYYY-MM-DD sorts lexicographically)
	entries.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
	return entries;
}

export default {
	mdToHtml,
	markdownToEntry,
	convertModulesToEntries
};
