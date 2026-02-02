<script>
	import { Carousel, Controls, CarouselIndicators } from 'flowbite-svelte';
	// Ensure Font Awesome CSS is present (import kept)
	import '@fortawesome/fontawesome-svg-core/styles.css';

	// Hero / gallery images from the WR folder
	import hero1 from '$lib/assets/WR/30.jpg?url';
	import hero2 from '$lib/assets/WR/4.jpg?url';
	import hero3 from '$lib/assets/WR/5.jpg?url';

	// Car image for officers section
	import carImage from '$lib/assets/WR/e.png?enhanced';

	import teamPicture from '$lib/assets/WR/zeppos-team-picture.png?enhanced';

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

	const images = [
		{ alt: 'Alt of image', src: hero1, title: 'title' },
		{ alt: 'Alt of image', src: hero2, title: 'title' },
		{ alt: 'Alt of image', src: hero3, title: 'title' }
	];

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

<div class="carousel-container">
	<Carousel {images} duration={7000} imgClass="w-full h-full" style="height: 75vh;">
		<Controls />
		<CarouselIndicators />
	</Carousel>

	<div class="carousel-overlay">
		<div class="carousel-text">
			<h1 class="carousel-title">Wazzu Racing</h1>
			<p class="carousel-subtitle">Washington State University Formula SAE</p>
		</div>
	</div>
</div>

<main class="page">
	<!-- ABOUT / JOIN -->
	<section id="about" class="about">
		<div class="about-main">
			<h2>About Us</h2>
			<p>
				Wazzu Racing is the Formula SAE team for Washington State University. Every year we design
				and build a race car, then compete against other teams at the Michigan International
				Speedway.
			</p>

			<p>
				Formula SAE is a collegiate design competition organized by the Society of Automotive
				Engineers. The competition is based on a formula race car with which students are granted
				the opportunity to design , build, and compete on an international playing field. By
				competing, students are challenged with applying classroom knowledge to real world problems
				that bolster their ability to communicate and work in teams. Leadership roles in the team
				further demand an ever-improving capacity to manage projects and leadership to succeed.
			</p>

			<p>
				<a href="/about" data-sveltekit-preload-data>Learn more</a>.
			</p>
		</div>
		<div class="about-image">
			<enhanced:img
				src={teamPicture}
				alt="The team with the car"
				sizes="(min-width: 1200px) 600px, 50vw"
			/>
		</div>
	</section>

	<!-- OFFICERS -->
	<section id="officers" class="officers">
		<article class="officer-entry">
			<div class="officer-image">
				<enhanced:img src={carImage} alt="Wazzu Racing car" />
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

				<!-- <a href="/members/current/" class="learn-more" data-sveltekit-preload-data
					>Meet the Full Team →</a
				> -->
			</div>
		</article>
	</section>
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

	/* CAROUSEL */
	.carousel-container {
		position: relative;
		width: 100vw;
		max-width: 100vw;
		left: 50%;
		right: 50%;
		margin-left: -50vw;
		margin-right: -50vw;
		height: 75vh;
		overflow: hidden;
	}

	.carousel-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
		background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.5) 100%);
	}

	.carousel-text {
		text-align: center;
		color: #fff;
		padding: 2rem 1.5rem;
		max-width: 1100px;
	}

	.carousel-title {
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: 700;
		letter-spacing: 2px;
		margin: 0 0 1rem 0;
		color: #fff;
		text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
	}

	.carousel-subtitle {
		font-size: clamp(1.25rem, 2.5vw, 1.75rem);
		font-weight: 600;
		margin: 0;
		color: #fff;
		text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);
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

	.about-image :global(img),
	.about-image :global(picture) {
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

	.officer-image :global(img),
	.officer-image :global(picture) {
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

	/* Responsive tweaks */
	@media (max-width: 860px) {
		.about {
			grid-template-columns: 1fr;
		}

		.officer-entry {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.carousel-text {
			padding: 1.25rem;
		}

		.carousel-title {
			font-size: clamp(2rem, 6vw, 3rem);
		}
	}

	@media (max-width: 420px) {
		.about-image {
			margin-top: 1rem;
		}

		.year {
			font-size: 1.1rem;
		}

		.carousel-container {
			height: 60vh;
		}
	}
</style>
