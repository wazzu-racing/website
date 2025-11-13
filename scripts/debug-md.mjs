#!/usr/bin/env node
// Debug script: inspect markdown files and parsing output for the newsletters folder.
// Usage: node website/scripts/debug-md.mjs
//
// Outputs a JSON blob with:
//  - files: list of markdown filenames found
//  - entries: parsed metadata for each file (id, title, date, excerpt, contentLength)
//
// This script uses dynamic imports so it fails gracefully when dependencies are missing.

import fs from 'fs';
import path from 'path';

async function main() {
  // dynamic imports so we can print a friendly message if a dependency is missing
  let matter, marked, sanitizeHtml;
  try {
    ({ default: matter } = await import('gray-matter'));
  } catch (err) {
    console.error('Missing dependency: gray-matter. Install with: npm install gray-matter');
    process.exit(2);
  }
  try {
    ({ marked } = await import('marked'));
  } catch (err) {
    console.error('Missing dependency: marked. Install with: npm install marked');
    process.exit(2);
  }
  try {
    ({ default: sanitizeHtml } = await import('sanitize-html'));
  } catch (err) {
    console.error('Missing dependency: sanitize-html. Install with: npm install sanitize-html');
    process.exit(2);
  }

  const articleDir = path.resolve(process.cwd(), 'src/lib/newsletters/articles');

  // Ensure directory exists
  if (!fs.existsSync(articleDir) || !fs.statSync(articleDir).isDirectory()) {
    console.error(`Articles directory not found: ${articleDir}`);
    process.exit(3);
  }

  let filenames;
  try {
    filenames = fs.readdirSync(articleDir).filter((f) => f.endsWith('.md') || f.endsWith('.markdown'));
  } catch (err) {
    console.error('Failed to read articles directory:', err.message);
    process.exit(4);
  }

  // helper: slugify (same rules used in site helpers)
  function slugify(input) {
    return String(input || '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  // helper: extract first paragraph as plain text
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

  const results = [];

  for (const fn of filenames) {
    const full = path.join(articleDir, fn);
    try {
      const raw = fs.readFileSync(full, 'utf8');
      const parsed = matter(raw);
      const fm = parsed.data || {};
      const body = parsed.content || '';

      // derive id: frontmatter.id > filename slug > title slug
      let id = fm.id || '';
      if (!id) {
        const name = path.basename(fn).replace(/\.[^/.]+$/, '');
        const m = name.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
        id = m ? m[2] : name;
        id = slugify(id);
      }

      // derive title: frontmatter.title > first heading > filename derived
      let title = fm.title || '';
      if (!title) {
        const firstLine = String(body).split(/\r?\n/).find(Boolean) || '';
        if (/^#{1,6}\s+/.test(firstLine)) {
          title = firstLine.replace(/^#{1,6}\s+/, '').trim();
        } else {
          title = id.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => String(c).toUpperCase());
        }
      }

      // date: frontmatter.date > filename prefix > today
      let date = fm.date || '';
      if (!date) {
        const m = fn.match(/^(\d{4}-\d{2}-\d{2})-/);
        if (m) date = m[1];
      }
      if (!date) date = new Date().toISOString().slice(0, 10);

      // excerpt
      let excerpt = fm.excerpt || '';
      if (!excerpt) excerpt = extractFirstParagraph(body);
      // sanitize a minimal excerpt
      const excerptHtml = sanitizeHtml(excerpt, { allowedTags: ['strong', 'em', 'b', 'i', 'code'], allowedAttributes: {} });

      // render content -> sanitized HTML
      marked.setOptions({ headerIds: true, mangle: false, smartypants: true });
      const rendered = marked.parse(body || '');
      const contentHtml = sanitizeHtml(rendered);

      results.push({
        file: fn,
        path: full,
        id,
        title,
        date,
        excerpt: excerptHtml,
        contentLength: contentHtml.length,
        hasFrontmatter: Object.keys(fm).length > 0,
        rawFrontmatter: fm
      });
    } catch (err) {
      results.push({ file: fn, error: String(err && err.message ? err.message : err) });
    }
  }

  // Output JSON for programmatic consumption
  const out = { files: filenames, entries: results };
  console.log(JSON.stringify(out, null, 2));

  // Also print a short human summary
  console.error(`\nFound ${filenames.length} markdown file(s). Parsed ${results.filter(r => !r.error).length} entry(ies).`);
  const errors = results.filter((r) => r.error);
  if (errors.length) {
    console.error('Errors:');
    for (const e of errors) {
      console.error('-', e.file, e.error);
    }
    process.exit(5);
  }

  process.exit(0);
}

main().catch((err) => {
  console.error('Unexpected error', err && err.stack ? err.stack : err);
  process.exit(99);
});
