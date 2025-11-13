<script>
	// @ts-nocheck
	// Accept server-provided load data when available; fallback to client-side lookup.
	export let data;
	import { entries } from '$lib/content/entries';
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';
	import { onMount } from 'svelte';

	// Use SSR-provided article/relatedEvent when present
	let article = data?.article ?? null;
	let relatedEvent = data?.relatedEvent ?? null;

	// format ISO YYYY-MM-DD to human-friendly
	const formatDate = (iso) => {
		if (!iso) return '';
		const d = new Date(iso + 'T00:00');
		const opts = { year: 'numeric', month: 'short', day: 'numeric' };
		return d.toLocaleDateString(undefined, opts);
	};

	// navigate helper (guards SSR)
	function navigateTo(url) {
		if (!url) return;
		if (typeof window !== 'undefined') window.location.assign(url);
	}

	// Fallback: if article not present server-side (client navigation), derive from page params
	const idStore = derived(page, ($page) => $page.params.id);

	let unsub = null;

	const tryResolveClient = (v) => {
		if (!v) return;
		if (article) return; // already have server data
		const found = entries.find((e) => e.type === 'article' && e.id === v) || null;
		article = found;
		relatedEvent = article?.relatedEventId
			? entries.find((x) => x.type === 'event' && x.id === article.relatedEventId) || null
			: null;
	};

	unsub = idStore.subscribe((v) => {
		tryResolveClient(v);
	});

	onMount(() => {
		// ensure we cleanup subscription if component is destroyed
		return () => {
			if (unsub) unsub();
		};
	});
</script>

<svelte:head>
	{#if article}
		<title>{article.title} — Wazzu Racing</title>
		<meta name="description" content={article.excerpt ?? article.title} />
	{:else}
		<title>Article not found — Wazzu Racing</title>
		<meta name="robots" content="noindex" />
	{/if}
</svelte:head>

<main class="container article-page" aria-live="polite">
	{#if article}
		<nav class="breadcrumbs" aria-label="Breadcrumb">
			<button class="crumb" on:click={() => navigateTo('/newsletter')}>Newsletter</button>
			<span class="sep">/</span>
			<span aria-current="page">{article.title}</span>
		</nav>

		<article class="article-detail">
			<header class="article-header">
				<h1 class="title">{article.title}</h1>
				<div class="meta">
					<time datetime={article.date + 'T00:00'}>{formatDate(article.date)}</time>
					{#if relatedEvent}
						<span class="sep">•</span>
						<button class="related-link" on:click={() => navigateTo('/calendar')}
							>{relatedEvent.title}</button
						>
						<span class="small-meta"> — {formatDate(relatedEvent.date)}</span>
					{/if}
				</div>
			</header>

			{#if article.excerpt}
				<p class="excerpt">{@html article.excerpt}</p>
			{/if}

			<hr />

			<section class="content" aria-labelledby="article-content">
				<div id="article-content" class="article-body">{@html article.content}</div>
			</section>

			{#if article.tags && article.tags.length}
				<footer class="article-footer">
					<div class="tags" aria-hidden="false">
						{#each article.tags as tag (tag)}
							<span class="tag">{tag}</span>
						{/each}
					</div>

					<div class="actions">
						<button class="cta" on:click={() => navigateTo('/newsletter')}
							>Back to newsletter</button
						>
						{#if relatedEvent}
							<button class="cta secondary" on:click={() => navigateTo('/calendar')}
								>View event on calendar</button
							>
						{/if}
					</div>
				</footer>
			{:else}
				<footer class="article-footer">
					<div class="actions">
						<button class="cta" on:click={() => navigateTo('/newsletter')}
							>Back to newsletter</button
						>
						{#if relatedEvent}
							<button class="cta secondary" on:click={() => navigateTo('/calendar')}
								>View event on calendar</button
							>
						{/if}
					</div>
				</footer>
			{/if}
		</article>
	{:else}
		<section class="not-found">
			<h1>Article not found</h1>
			<p class="lede">
				We couldn't find that article. It may have been removed or the link is incorrect.
			</p>
			<p>
				<button class="cta" on:click={() => navigateTo('/newsletter')}>Back to newsletter</button>
				<button class="link-muted" on:click={() => navigateTo('/calendar')} style="margin-left:1rem"
					>View calendar</button
				>
			</p>
		</section>
	{/if}
</main>

<style>
	:global(:root) {
		--page-max-width: 900px;
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

	.breadcrumbs {
		font-size: 0.95rem;
		color: var(--muted);
		margin-bottom: 0.6rem;
	}
	.breadcrumbs .crumb {
		color: inherit;
		text-decoration: none;
	}
	.breadcrumbs .sep {
		margin: 0 0.5rem;
		color: #e6e6e6;
	}

	.article-header {
		margin-bottom: 0.6rem;
	}
	.title {
		margin: 0 0 0.25rem 0;
		font-size: clamp(1.25rem, 2.5vw, 1.6rem);
	}
	.meta {
		color: var(--muted);
		font-size: 0.95rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.related-link {
		color: inherit;
		text-decoration: underline;
	}

	.excerpt {
		color: #111827;
		margin-top: 0.6rem;
		font-size: 1rem;
	}

	hr {
		border: none;
		height: 1px;
		background: rgba(15, 23, 42, 0.04);
		margin: 1rem 0;
	}

	.article-body {
		color: #111827;
		line-height: 1.6;
	}

	.article-body img {
		max-width: 100%;
		height: auto;
	}

	.article-footer {
		margin-top: 1.25rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
		flex-wrap: wrap;
	}

	.tags {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}

	.tag {
		background: rgba(15, 23, 42, 0.06);
		color: #0f172a;
		padding: 4px 8px;
		border-radius: 999px;
		font-size: 0.85rem;
	}

	.actions {
		display: flex;
		gap: 8px;
	}

	.cta {
		background: var(--accent);
		color: white;
		padding: 8px 12px;
		border-radius: 6px;
		border: none;
		cursor: pointer;
		text-decoration: none;
	}

	.cta.secondary {
		background: #374151;
	}

	.lede {
		color: var(--muted);
	}

	.not-found {
		text-align: center;
		padding: 2rem 1rem;
		background: var(--card-bg);
		border-radius: 10px;
		box-shadow: 0 6px 18px rgba(10, 10, 10, 0.04);
	}

	.link-muted {
		color: var(--muted);
		text-decoration: none;
	}

	@media (max-width: 720px) {
		.article-footer {
			flex-direction: column;
			align-items: stretch;
		}
		.actions {
			justify-content: center;
			width: 100%;
		}
	}
</style>
