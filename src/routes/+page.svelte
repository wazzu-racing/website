<script>
	import { onMount, onDestroy } from 'svelte';
	// Ensure Font Awesome CSS is present (import kept)
	import '@fortawesome/fontawesome-svg-core/styles.css';

	// Hero / gallery images from the WR folder
	import hero1 from '$lib/assets/WR/30.jpg';
	import hero2 from '$lib/assets/WR/4.jpg';
	import hero3 from '$lib/assets/WR/5.jpg';

	import g1 from '$lib/assets/WR/1.png';
	import g2 from '$lib/assets/WR/3.jpg';
	import g3 from '$lib/assets/WR/10.jpg';
	import g4 from '$lib/assets/WR/11.jpg';
	import g5 from '$lib/assets/WR/12.jpg';
	import g6 from '$lib/assets/WR/13.jpg';
	import g7 from '$lib/assets/WR/16.png';
	import g8 from '$lib/assets/WR/19.jpg';
	import g9 from '$lib/assets/WR/backgroundless_clean.png';

	const slides = [hero1, hero2, hero3].map((src, i) => ({ id: i, src }));
	let current = 0;
	/** @type {ReturnType<typeof setInterval>|undefined} */
	let timer;

	onMount(() => {
		timer = setInterval(() => {
			current = (current + 1) % slides.length;
		}, 4500);
	});

	onDestroy(() => {
		if (timer) clearInterval(timer);
	});

	/** @param {number} i */
	function goTo(i) {
		current = i;
		// reset timer for a short delay after manual navigation
		if (timer) {
			clearInterval(timer);
			timer = setInterval(() => {
				current = (current + 1) % slides.length;
			}, 4500);
		}
	}

	// Gallery (lightbox)
	const gallery = [
		{ src: g1, alt: 'Wazzu Racing — car front' },
		{ src: g2, alt: 'Wazzu Racing — pit crew' },
		{ src: g3, alt: 'Wazzu Racing — on track' },
		{ src: g4, alt: 'Wazzu Racing — suspension detail' },
		{ src: g5, alt: 'Wazzu Racing — team photo' },
		{ src: g6, alt: 'Wazzu Racing — CAD and design' },
		{ src: g7, alt: 'Wazzu Racing — logo' },
		{ src: g8, alt: 'Wazzu Racing — rollout' },
		{ src: g9, alt: 'Wazzu Racing — silhouette' }
	];

	let lightboxOpen = false;
	let lightboxIndex = 0;

	/** @param {number} i */
	function openLightbox(i) {
		lightboxIndex = i;
		lightboxOpen = true;
		document.body.style.overflow = 'hidden';
	}

	function closeLightbox() {
		lightboxOpen = false;
		document.body.style.overflow = '';
	}

	function lbNext() {
		lightboxIndex = (lightboxIndex + 1) % gallery.length;
	}

	function lbPrev() {
		lightboxIndex = (lightboxIndex - 1 + gallery.length) % gallery.length;
	}

	/** @param {KeyboardEvent} e */
	function lbKey(e) {
		if (!lightboxOpen) return;
		if (e.key === 'Escape') closeLightbox();
		if (e.key === 'ArrowRight') lbNext();
		if (e.key === 'ArrowLeft') lbPrev();
	}
</script>

<svelte:head>
	<title>Wazzu Racing — Washington State University</title>
	<meta
		name="description"
		content="Wazzu Racing — Washington State University Formula SAE team. Student-designed, built, and tested race cars."
	/>
</svelte:head>

<main class="page">
	<!-- HERO -->
	<section class="hero" aria-label="Wazzu Racing hero">
		<!-- background and image (keeps a visible photo at the top) -->
		<div class="hero-visual" style={"background-image: `url('${slides[current].src}')`"}>
			<img class="hero-img" src={slides[current].src} alt="" aria-hidden="true" />
		</div>

		<!-- Overlay contains the main headline and CTAs, centered and visually above the image -->
		<div class="hero-overlay">
			<div class="hero-text">
				<div class="university">Washington State University</div>
				<h1 class="team">Wazzu Racing</h1>
				<p class="subtitle">
					Formula SAE — student-designed, built, and tested prototype race cars
				</p>
			</div>
		</div>
	</section>

	<!-- Hero controls moved below the hero — dots-only control style -->
	<div class="hero-controls-below" aria-hidden="false">
		<div class="dots" role="tablist" aria-label="Hero slides">
			{#each slides as slide (slide.id)}
				<button
					class:dot-active={slide.id === current}
					aria-label={'Go to slide ' + (slide.id + 1)}
					on:click={() => goTo(slide.id)}
				></button>
			{/each}
		</div>
	</div>

	<!-- ABOUT / JOIN -->
	<section id="about" class="about">
		<div class="about-main">
			<h2>What we do</h2>
			<p>
				Wazzu Racing is Washington State University's Formula SAE team. Each year students from
				across engineering and related disciplines design, fabricate, and test a new single-seat
				race car, learning hands-on skills and competing at national and international events.
			</p>
			<p class="meet">Meetings: ELB 9 · Saturdays · 11:00 AM</p>
		</div>
		<aside class="about-stats" aria-hidden="true">
			<div class="stat">
				<span class="stat-num">10+</span>
				<span class="stat-label">Years Competing</span>
			</div>
			<div class="stat">
				<span class="stat-num">100+</span>
				<span class="stat-label">Student Alumni</span>
			</div>
		</aside>
	</section>

	<!-- GALLERY -->
	<section id="gallery" class="gallery" aria-label="Team gallery">
		<h2>Gallery</h2>
		<div class="grid">
			{#each gallery as item, i (i)}
				<button
					class="grid-item"
					on:click={() => openLightbox(i)}
					aria-label={'Open image ' + (i + 1)}
				>
					<img src={item.src} alt={item.alt} loading="lazy" />
				</button>
			{/each}
		</div>
	</section>

	<!-- site footer removed here (redundant with sitewide footer) -->

	<!-- LIGHTBOX -->
	{#if lightboxOpen}
		<div
			class="lightbox"
			role="dialog"
			aria-modal="true"
			aria-label="Image preview"
			tabindex="0"
			on:keydown={lbKey}
			on:click|self={closeLightbox}
		>
			<button class="lb-close" on:click={closeLightbox} aria-label="Close">✕</button>
			<button class="lb-prev" on:click={lbPrev} aria-label="Previous">‹</button>
			<div class="lb-inner">
				<img src={gallery[lightboxIndex].src} alt={gallery[lightboxIndex].alt} />
				<p class="lb-caption">{gallery[lightboxIndex].alt}</p>
			</div>
			<button class="lb-next" on:click={lbNext} aria-label="Next">›</button>
		</div>
	{/if}
</main>

<style>
	:root {
		--crimson: #b51c1c;
		--crimson-dark: #941516;
		--muted: #6b6f73;
		--bg: #f7f7f7;
		--text: #111;
	}

	.page {
		font-family:
			Inter,
			system-ui,
			-apple-system,
			'Segoe UI',
			Roboto,
			Arial;
		color: var(--text);
		background: var(--bg);
		margin: 0;
	}

	/* HERO */
	.hero {
		position: relative;
		/* full-bleed across the viewport with no horizontal gaps */
		width: 100vw;
		max-width: 100vw;
		left: 50%;
		right: 50%;
		margin-left: -50vw;
		margin-right: -50vw;
		height: min(68vh, 640px);
		display: block;
		overflow: visible;
	}

	.hero-visual {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center;
		z-index: 0;
	}

	/* explicit image ensures the topmost visible image loads (decorative alt) */
	.hero-img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		/* keep image for layout and preloading, but we use background image visually */
	}

	.hero-overlay {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		inset: 0;
		min-height: 100%;
		padding: 2.5rem 1rem;
		pointer-events: none; /* allow buttons below overlay to be visually above but not blocked */
	}

	.hero-text {
		max-width: 1100px;
		text-align: center;
		color: #fff;
		/* removed the dark translucent box so the photo shows through cleanly */
		background: transparent;
		/* keep a modest backdrop blur / shadow only for legibility without a full black box */
		padding: 2.25rem 1.5rem;
		border-radius: 12px;
		pointer-events: auto;
		text-shadow: 0 6px 28px rgba(0, 0, 0, 0.6);
	}

	.university {
		/* Doubled size for prominence; responsive with clamp */
		font-size: clamp(2.1rem, 4.4vw, 3rem);
		letter-spacing: 1px;
		opacity: 0.98;
		margin-bottom: 0.25rem;
		color: var(--crimson);
		font-weight: 700;
	}

	.team {
		/* larger, bolder, and higher-contrast heading */
		font-size: clamp(2.6rem, 8vw, 5rem);
		margin: 0.25rem 0 0.5rem;
		color: #ffffff;
		font-weight: 900;
		text-shadow: 0 10px 36px rgba(0, 0, 0, 0.75);
		letter-spacing: 0.5px;
	}

	.subtitle {
		/* larger and more readable subtitle */
		margin: 0.5rem 0 1rem;
		color: #ffffff;
		font-size: 1.25rem;
		font-weight: 600;
		opacity: 0.98;
	}

	/* HERO CONTROLS (dots-only and CTA under hero) */
	.hero-controls-below {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		margin: 0.6rem auto 1.2rem;
		max-width: 1200px;
		padding: 0 1rem;
	}

	/* small dot-only controls */
	.dots {
		display: flex;
		gap: 8px;
		align-items: center;
		justify-content: center;
	}

	.dots button {
		width: 10px;
		height: 10px;
		background: #ddd;
		border-radius: 50%;
		border: none;
		cursor: pointer;
		padding: 0;
	}

	.dots button.dot-active {
		background: var(--crimson);
		box-shadow: 0 3px 10px rgba(181, 28, 28, 0.12);
		transform: scale(1.05);
	}

	/* ABOUT */
	.about {
		max-width: 1200px;
		margin: 1.25rem auto 2rem;
		padding: 0 1rem;
		display: grid;
		grid-template-columns: 1fr 280px;
		gap: 1.35rem;
		align-items: start;
	}

	.about-main h2 {
		margin: 0 0 0.5rem 0;
		color: var(--crimson);
	}

	.about-main p {
		margin: 0 0 0.5rem 0;
		color: #333;
		line-height: 1.55;
	}

	.meet {
		color: var(--muted);
		font-weight: 700;
		margin-top: 0.35rem;
	}

	.about-stats {
		background: #fff;
		border-radius: 8px;
		padding: 1rem;
		box-shadow: 0 6px 18px rgba(20, 20, 20, 0.04);
	}

	.stat {
		text-align: center;
		padding: 0.45rem 0;
	}

	.stat-num {
		display: block;
		font-weight: 800;
		color: var(--crimson);
		font-size: 1.2rem;
	}

	.stat-label {
		color: var(--muted);
		font-size: 0.92rem;
	}

	/* GALLERY */
	.gallery {
		max-width: 1200px;
		margin: 0 auto 2.5rem;
		padding: 0 1rem;
	}

	.grid {
		display: grid;
		gap: 12px;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
	}

	.grid-item {
		border-radius: 8px;
		overflow: hidden;
		padding: 0;
		border: none;
		background: #fff;
		cursor: pointer;
		aspect-ratio: 4/3;
		display: block;
	}

	.grid-item img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: transform 0.22s ease;
	}

	.grid-item:hover img {
		transform: scale(1.03);
	}

	/* LIGHTBOX */
	.lightbox {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.85);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		z-index: 2000;
	}

	.lb-inner {
		max-width: min(1100px, 96vw);
		max-height: 86vh;
		text-align: center;
	}

	.lb-inner img {
		max-width: 100%;
		max-height: 78vh;
		object-fit: contain;
		border-radius: 6px;
	}

	.lb-caption {
		color: #ddd;
		margin-top: 0.6rem;
	}

	.lb-prev,
	.lb-next,
	.lb-close {
		position: absolute;
		background: transparent;
		color: #fff;
		border: none;
		font-size: 22px;
		cursor: pointer;
		padding: 6px;
	}

	.lb-close {
		right: 18px;
		top: 18px;
		font-size: 20px;
	}

	.lb-prev {
		left: 18px;
		top: 50%;
		transform: translateY(-50%);
		font-size: 28px;
	}

	.lb-next {
		right: 18px;
		top: 50%;
		transform: translateY(-50%);
		font-size: 28px;
	}

	/* Responsive tweaks */
	@media (max-width: 860px) {
		.about {
			grid-template-columns: 1fr;
		}
		.hero {
			height: 56vh;
		}
		.hero-text {
			padding: 1.25rem;
		}
		.team {
			font-size: clamp(1.4rem, 7.5vw, 2.6rem);
		}
		.hero-controls-below {
			margin-top: 0.5rem;
			gap: 10px;
		}
	}

	@media (max-width: 420px) {
		.hero {
			height: 52vh;
		}
	}
</style>
