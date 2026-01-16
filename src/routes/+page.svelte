<script>
	import { onMount, onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	// Ensure Font Awesome CSS is present (import kept)
	import '@fortawesome/fontawesome-svg-core/styles.css';

	// Hero / gallery images from the WR folder
	import hero1 from '$lib/assets/WR/30.jpg';
	import hero2 from '$lib/assets/WR/4.jpg';
	import hero3 from '$lib/assets/WR/5.jpg';

	// Car image for officers section
	import carImage from '$lib/assets/WR/e.png';

	import teamPicture from '$lib/assets/WR/zeppos-team-picture.png';

	// Gallery images (commented out since gallery is disabled)
	/*
	import g1 from '$lib/assets/WR/1.png';
	import g2 from '$lib/assets/WR/3.jpg';
	import g3 from '$lib/assets/WR/10.jpg';
	import g4 from '$lib/assets/WR/11.jpg';
	import g5 from '$lib/assets/WR/12.jpg';
	import g6 from '$lib/assets/WR/13.jpg';
	import g7 from '$lib/assets/WR/16.png';
	import g8 from '$lib/assets/WR/19.jpg';
	import g9 from '$lib/assets/WR/backgroundless_clean.png';
	*/

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

	// Gallery (lightbox) - commented out since gallery is disabled
	/*
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
	*/

	// Lightbox functions (commented out since gallery is currently disabled)
	/*
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

	function lbKey(e) {
		if (!lightboxOpen) return;
		if (e.key === 'Escape') closeLightbox();
		if (e.key === 'ArrowRight') lbNext();
		if (e.key === 'ArrowLeft') lbPrev();
	}
	*/

	// Officers data
	const officers = [
		{ name: 'Malcolm', lastname: 'Childs', role: 'President' },
		{ name: 'Carson', lastname: 'Clary', role: 'Vice President' },
		{ name: 'Kasey', lastname: 'Kirschling', role: 'Chief Engineer' },
		{ name: 'Alex', lastname: 'Diaz', role: 'Safety Officer' }
	];
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
		<div class="hero-visual">
			{#each slides as slide (slide.id)}
				{#if slide.id === current}
					<img
						class="hero-img"
						src={slide.src}
						alt=""
						aria-hidden="true"
						in:fade={{ duration: 600 }}
						out:fade={{ duration: 400 }}
					/>
				{/if}
			{/each}
			<!-- Gradient overlay for better text contrast -->
			<div class="hero-gradient"></div>
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
			<h2>About Us</h2>
			<p>
				Wazzu Racing is the Formula SAE team for Washington State University. Every year we design
				and build a race car, then compete against other teams at the Michigan International
				Speedway.
			</p>
		</div>
		<div class="about-image">
			<img src={teamPicture} alt="The team with the car" />
		</div>
	</section>

	<!-- OFFICERS -->
	<section id="officers" class="officers">
		<article class="officer-entry">
			<div class="officer-image">
				<img src={carImage} alt="Wazzu Racing car" />
			</div>

			<div class="officer-info">
				<div class="officer-header">
					<h2>Team Leadership</h2>
					<span class="year">2025–2026</span>
				</div>

				<p class="officer-description">
					Our officers lead the team through design, fabrication, and competition. They coordinate
					project timelines, manage resources, and ensure technical excellence across all
					subsystems.
				</p>

				<div class="team-leads">
					<h3>Current Officers</h3>
					<ul>
						{#each officers as officer (officer.name)}
							<li>
								<strong>{officer.name} {officer.lastname}</strong> — {officer.role}
							</li>
						{/each}
					</ul>
				</div>

				<a href="/members/current/" class="learn-more" data-sveltekit-preload-data
					>Meet the Full Team →</a
				>
			</div>
		</article>
	</section>

	<!-- GALLERY -->
	<!-- <section id="gallery" class="gallery" aria-label="Team gallery">
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
	</section> -->

	<!-- site footer removed here (redundant with sitewide footer) -->

	<!-- LIGHTBOX (disabled since gallery is commented out) -->
	<!-- {#if lightboxOpen}
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
	{/if} -->
</main>

<style>
	:root {
		--crimson: #a60f2d; /* The WSU crimson color */
		--crimson-dark: #ca1237; /* Actually WSU red, a secondary color */
		--muted: #4d4d4d; /* WSU gray */
		--white: #ffffff;
		--text: #000000;
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
		background: var(--white);
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
		z-index: 0;
		background: #000;
	}

	.hero-gradient {
		position: absolute;
		inset: 0;
		background: radial-gradient(
			ellipse at center,
			rgba(0, 0, 0, 0.35) 0%,
			rgba(0, 0, 0, 0.55) 100%
		);
		z-index: 1;
	}

	/* explicit image ensures the topmost visible image loads (decorative alt) */
	.hero-img {
		position: absolute;
		inset: 0;
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.hero-overlay {
		position: relative;
		z-index: 2;
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
		padding: 2.25rem 1.5rem;
		pointer-events: auto;
	}

	.university {
		/* Doubled size for prominence; responsive with clamp */
		font-size: clamp(2.1rem, 4.4vw, 3rem);
		letter-spacing: 1px;
		margin-bottom: 0.25rem;
		color: #fff;
		font-weight: 700;
		-webkit-text-stroke: 0.5px rgba(0, 0, 0, 0.3);
	}

	.subtitle {
		/* larger and more readable subtitle */
		margin: 0.5rem 0 1rem;
		color: var(--white);
		font-size: 1.25rem;
		font-weight: 600;
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
		grid-template-columns: 1fr 1fr;
		gap: 2.5rem;
		align-items: start;
	}

	.about-main {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.about-main h2 {
		margin: 0 0 0.5rem 0;
	}

	.about-main p {
		margin: 0;
		line-height: 1.6;
	}

	.about-image {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.about-image img {
		width: 100%;
		height: auto;
		display: block;
		border-radius: 8px;
	}

	/* OFFICERS */
	.officers {
		max-width: 1200px;
		margin: 2.5rem auto 2.5rem;
		padding: 0 1rem;
	}

	.officer-entry {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2.5rem;
		align-items: start;
	}

	.officer-image {
		width: 100%;
		aspect-ratio: 4/3;
		border-radius: 8px;
		overflow: hidden;
		background: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.officer-image img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		display: block;
	}

	.officer-info {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.officer-header {
		display: flex;
		align-items: baseline;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.officer-header h2 {
		margin: 0;
	}

	.year {
		font-size: 1.25rem;
		color: var(--muted);
		font-weight: 600;
	}

	.officer-description {
		font-size: 1rem;
		color: #333;
		line-height: 1.6;
		margin: 0;
	}

	.team-leads {
		margin: 0;
	}

	.team-leads ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.team-leads li {
		color: #444;
		margin-bottom: 0.25rem;
		font-size: 0.95rem;
	}

	.team-leads strong {
		color: #222;
	}

	.learn-more {
		display: inline-block;
		color: var(--crimson);
		font-weight: 600;
		text-decoration: none;
		margin-top: 0.5rem;
		transition: color 0.2s ease;
	}

	.learn-more:hover {
		color: var(--crimson-dark);
		text-decoration: underline;
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

		.hero-controls-below {
			margin-top: 0.5rem;
			gap: 10px;
		}
		.officer-entry {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
	}

	@media (max-width: 420px) {
		.hero {
			height: 52vh;
		}
		.about-image {
			margin-top: 1rem;
		}

		.year {
			font-size: 1.1rem;
		}
	}
</style>
