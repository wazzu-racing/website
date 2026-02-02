#!/usr/bin/env node
// website/scripts/generate-articles.mjs
// Generates a JSON file of newsletter article entries by parsing markdown files
// in src/lib/newsletters/articles.
//
// Usage:
//   node website/scripts/generate-articles.mjs
//   node website/scripts/generate-articles.mjs ./src/lib/content/generated-articles.json
//
// Output:
//   - By default writes to `src/lib/content/generated-articles.json`.
//
// Notes:
//   - Requires the following packages to be installed in your project:
//     gray-matter, marked, sanitize-html
//   - This script is ESM (mjs) and uses top-level await.

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Default folders
const ARTICLES_DIR = path.resolve(__dirname, '../src/lib/newsletters/articles');
const DEFAULT_OUT = path.resolve(__dirname, '../src/lib/content/generated-articles.json');

const outPath = process.argv[2] ? path.resolve(process.cwd(), process.argv[2]) : DEFAULT_OUT;

/**
 * Slugify helper for generating an id from a title/filename.
 * Keeps lowercase alphanumerics and replaces other runs with '-'
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
 * Extract the first paragraph (plain text) from markdown.
 * @param {string} md
 * @returns {string}
 */
function extractFirstParagraph(md) {
	if (!md) return '';
	const blocks = String(md).split(/\r?\n\r?\n/);
	for (const b of blocks) {
		const trimmed = b.trim();
		if (trimmed.length > 0) {
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
			plain = plain.replace(/\s+/g, ' ');
			return plain;
		}
	}
	return '';
}

/**
 * Convert markdown body to sanitized HTML using marked + sanitize-html
 * @param {string} markdown
 * @returns {string}
 */
function mdToHtml(markdown) {
	marked.setOptions({
		headerIds: true,
		mangle: false,
		breaks: false,
		smartLists: true,
		smartypants: true
	});

	const rendered = marked.parse(String(markdown || ''));

	// conservative sanitize defaults
	const clean = sanitizeHtml(rendered, {
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
			'*': ['class']
		},
		allowedSchemesByTag: {
			a: ['http', 'https', 'mailto', 'tel'],
			img: ['http', 'https', 'data']
		},
		transformTags: {
			a: (tagName, attribs) => {
				const href = attribs && attribs.href ? attribs.href : '';
				const out = { tagName, attribs: { ...(attribs || {}) } };
				if (/^https?:\/\//i.test(href)) {
					out.attribs.target = '_blank';
					out.attribs.rel = (out.attribs.rel ? out.attribs.rel + ' ' : '') + 'noopener noreferrer';
				}
				return out;
			}
		}
	});

	return clean;
}

/**
 * Parse a single markdown file into an entry object
 * @param {string} raw - raw markdown content
 * @param {string} filePath - path to file (used to derive filename/date)
 * @returns {object}
 */
function markdownToEntry(raw, filePath = '') {
	const matterResult = matter(String(raw || ''));

	const fm = matterResult.data || {};
	const body = matterResult.content || '';

	// Derive id: frontmatter.id > filename slug > title slug
	let id = fm.id || '';
	if (!id && filePath) {
		const name = path.basename(filePath).replace(/\.[^/.]+$/, '');
		const m = name.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
		id = m ? m[2] : name;
		id = slugify(id);
	}
	if (!id) {
		const fromTitle = fm.title || extractFirstParagraph(body).split(/\r?\n/)[0] || 'article';
		id = slugify(fromTitle);
	}

	// Title: frontmatter.title > first heading > slugified id
	let title = fm.title || '';
	if (!title) {
		const firstLine = String(body).split(/\r?\n/).find(Boolean) || '';
		if (/^#{1,6}\s+/.test(firstLine)) {
			title = firstLine.replace(/^#{1,6}\s+/, '').trim();
		} else {
			title = (fm.title || id)
				.replace(/[-_]+/g, ' ')
				.replace(/\b\w/g, (c) => String(c).toUpperCase());
		}
	}

	// Date: frontmatter.date > filename prefix > today
	let date = fm.date || '';
	if (!date && filePath) {
		const name = path.basename(filePath).replace(/\.[^/.]+$/, '');
		const m = name.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
		if (m) date = m[1];
	}
	if (!date) date = fm.date || new Date().toISOString().slice(0, 10);

	// Tags: array or comma-separated string
	const tags = Array.isArray(fm.tags)
		? fm.tags.map(String)
		: fm.tags
			? String(fm.tags)
					.split(',')
					.map((s) => s.trim())
					.filter(Boolean)
			: [];

	const relatedEventId = fm.relatedEventId || fm.relatedEvent || null;

	// Excerpt: frontmatter.excerpt > first paragraph
	let excerpt = fm.excerpt || '';
	if (!excerpt) {
		excerpt = extractFirstParagraph(body);
	}
	// sanitize excerpt minimally
	const excerptHtml = sanitizeHtml(excerpt, {
		allowedTags: ['strong', 'em', 'b', 'i', 'code'],
		allowedAttributes: {}
	});

	// Full content HTML (sanitized)
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

async function ensureDirForFile(file) {
	const dir = path.dirname(file);
	try {
		await fs.mkdir(dir, { recursive: true });
	} catch {
		// ignore
	}
}

(async function main() {
	try {
		// ensure articles dir exists
		const stat = await fs.stat(ARTICLES_DIR).catch(() => null);
		if (!stat || !stat.isDirectory()) {
			console.error(`Articles directory not found: ${ARTICLES_DIR}`);
			process.exit(1);
		}

		const names = await fs.readdir(ARTICLES_DIR);
		const mdFiles = names
			.filter((n) => n.endsWith('.md') || n.endsWith('.markdown'))
			.map((n) => path.join(ARTICLES_DIR, n));

		if (mdFiles.length === 0) {
			console.warn('No markdown files found in', ARTICLES_DIR);
		}

		const entries = [];
		for (const fp of mdFiles) {
			try {
				const raw = await fs.readFile(fp, 'utf8');
				const entry = markdownToEntry(raw, fp);
				entries.push(entry);
			} catch (err) {
				console.error('Failed to parse', fp, err && err.message ? err.message : err);
			}
		}

		// sort newest-first by date (ISO YYYY-MM-DD sorts lexicographically)
		entries.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

		// Write JSON file
		await ensureDirForFile(outPath);
		await fs.writeFile(outPath, JSON.stringify(entries, null, 2), 'utf8');

		console.log(`Wrote ${entries.length} article(s) to ${outPath}`);
		process.exit(0);
	} catch (err) {
		console.error('generate-articles failed:', err && err.stack ? err.stack : err);
		process.exit(2);
	}
})();
