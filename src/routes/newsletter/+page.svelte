<script>
	// @ts-nocheck
	// Newsletter index page: lists articles stored in the centralized entries file.
	import { entries } from '$lib/content/entries';

	// derive only articles and sort newest-first by date
	let articles = entries
		.filter((e) => e.type === 'article')
		.slice()
		.sort((a, b) => {
			// ISO date strings sort lexicographically for YYYY-MM-DD
			if (a.date === b.date) return 0;
			return b.date.localeCompare(a.date);
		});

	// helper to format a publication date for display
	const formatDate = (iso) => {
		if (!iso) return '';
		const d = new Date(iso + 'T00:00');
		const opts = { year: 'numeric', month: 'short', day: 'numeric' };
		return d.toLocaleDateString(undefined, opts);
	};

	// navigation helper (guards SSR). Use buttons instead of raw dynamic href anchors
	function navigateTo(url) {
		if (!url) return;
		if (typeof window !== 'undefined') {
			window.location.assign(url);
		}
	}
</script>

<svelte:head>
	<title>Newsletter — Wazzu Racing</title>
	<meta name="description" content="Wazzu Racing newsletter: recaps, updates, and club news." />
</svelte:head>

<main class="container newsletter-page" aria-live="polite">
	<header class="page-header">
		<h1>Newsletter</h1>
		<p class="lede">
			Stories, recaps, and updates about the team. Past events may have follow-up articles — edit
			content in <code>src/lib/content/entries.js</code>.
		</p>
	</header>

	<section aria-label="Newsletter articles" class="articles-section">
		{#if articles.length > 0}
			<ul class="articles-list" role="list">
				{#each articles as article (article.id)}
					<li role="listitem" class="article-card">
						<article>
							<header class="article-head">
								<h2 class="article-title">
									<button
										class="article-link"
										on:click={() => navigateTo('/newsletter/' + article.id)}
									>
										{article.title}
									</button>
								</h2>
								<div class="meta">
									<time datetime={article.date + 'T00:00'}>{formatDate(article.date)}</time>
									{#if article.relatedEventId}
										<span class="sep">•</span>
										<span class="related">About event: {article.relatedEventId}</span>
									{/if}
								</div>
							</header>

							{#if article.excerpt}
								<div class="excerpt" innerHTML={article.excerpt}></div>
							{/if}

							<footer class="article-footer">
								<div class="tags">
									{#each article.tags ?? [] as t (t)}
										<span class="tag">{t}</span>
									{/each}
								</div>
								<p class="read-more">
									<button class="cta" on:click={() => navigateTo('/newsletter/' + article.id)}
										>Read article</button
									>
								</p>
							</footer>
						</article>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="lede">No newsletter articles published yet.</p>
		{/if}
	</section>
</main>

<style>
	:global(:root) {
		--page-max-width: 1100px;
		--accent: #e11d48;
		--muted: #6b7280;
		--card-bg: #fff;
	}

	.container {
		max-width: var(--page-max-width);
		margin: 2rem auto;
		padding: 0 1rem;
		box-sizing: border-box;
	}

	.page-header {
		text-align: left;
		margin-bottom: 1rem;
	}

	h1 {
		font-size: clamp(1.4rem, 2.2vw, 2rem);
		margin: 0;
		letter-spacing: -0.02em;
		color: #0f172a;
	}

	.lede {
		margin-top: 0.4rem;
		color: var(--muted);
		font-size: 0.98rem;
	}

	.articles-section {
		margin-top: 1.25rem;
	}

	.articles-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 1rem;
	}

	.article-card {
		background: var(--card-bg);
		border-radius: 10px;
		padding: 14px;
		box-shadow: 0 6px 18px rgba(10, 10, 10, 0.04);
		border: 1px solid rgba(15, 23, 42, 0.04);
	}

	.article-head {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.article-title {
		margin: 0;
		font-size: 1.05rem;
	}

	.article-link {
		color: inherit;
		text-decoration: none;
	}

	.article-link:hover {
		text-decoration: underline;
	}

	.meta {
		color: var(--muted);
		font-size: 0.9rem;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.sep {
		color: #e6e6e6;
	}

	.excerpt {
		margin-top: 0.8rem;
		color: #111827;
		font-size: 0.98rem;
	}

	.article-footer {
		margin-top: 0.9rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
		flex-wrap: wrap;
	}

	.tags {
		display: flex;
		gap: 6px;
		flex-wrap: wrap;
	}

	.tag {
		background: rgba(15, 23, 42, 0.06);
		color: #0f172a;
		padding: 4px 8px;
		border-radius: 999px;
		font-size: 0.8rem;
	}

	.cta {
		background: var(--accent);
		color: white;
		padding: 6px 10px;
		border-radius: 6px;
		text-decoration: none;
		font-size: 0.9rem;
		white-space: nowrap;
	}

	.read-more {
		margin: 0;
	}

	@media (max-width: 720px) {
		.articles-list {
			grid-template-columns: 1fr;
		}
	}
</style>
