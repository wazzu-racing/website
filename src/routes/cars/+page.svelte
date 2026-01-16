<script>
	import { cars } from '$lib/content/cars.js';
</script>

<svelte:head>
	<title>Past Cars — Wazzu Racing</title>
	<meta
		name="description"
		content="Explore Wazzu Racing's past Formula SAE cars. View competition results, technical highlights, and team leadership from each season."
	/>
</svelte:head>

<main class="container">
	<section class="page-header">
		<h1>Our Cars</h1>
		<p class="intro">
			Each year, Wazzu Racing designs and builds a new Formula SAE race car from the ground up.
			Explore our past vehicles and learn about the innovations, challenges, and achievements that
			have defined our program.
		</p>
	</section>

	<section class="cars-list">
		{#each cars as car, index (car.id)}
			<article class="car-entry" class:reverse={index % 2 === 1}>
				<a href={`/cars/${car.id}`} class="car-image-link" data-sveltekit-preload-data>
					<div class="car-image">
						<img src={car.image} alt={`${car.name} - ${car.year} Wazzu Racing car`} />
					</div>
				</a>

				<div class="car-info">
					<div class="car-header">
						<h2>
							<a href={`/cars/${car.id}`} data-sveltekit-preload-data>{car.name}</a>
						</h2>
						<span class="year">{car.year}</span>
					</div>

					<p class="short-description">{car.shortDescription}</p>

					<div class="team-leads">
						<h3>Team Leadership</h3>
						<ul>
							{#each car.teamLeads as lead (lead.name)}
								<li>
									<strong>{lead.name}</strong> — {lead.role}
								</li>
							{/each}
						</ul>
					</div>

					<div class="competition-summary">
						<h3>Competition Results</h3>
						<p class="event-name">{car.competition.event}</p>
						<p class="placement">{car.competition.placement}</p>
						<ul class="highlights">
							{#each car.competition.highlights as highlight, i (i)}
								<li>{highlight}</li>
							{/each}
						</ul>
					</div>

					<a href={`/cars/${car.id}`} class="learn-more" data-sveltekit-preload-data>Learn More →</a
					>
				</div>
			</article>
		{/each}
	</section>
</main>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.page-header {
		/*text-align: center;*/
		text-align: justify;
		margin-bottom: 3rem;
	}

	.intro {
		font-size: 1.1rem;
		color: #555;
		max-width: 800px;
		margin: 0 auto;
		line-height: 1.6;
	}

	.cars-list {
		display: flex;
		flex-direction: column;
		gap: 4rem;
	}

	.car-entry {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2.5rem;
		align-items: start;
		padding: 2rem;
		background: #fafafa;
		border-radius: 12px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
		transition: box-shadow 0.3s ease;
	}

	.car-entry:hover {
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
	}

	.car-entry.reverse {
		grid-template-columns: 1fr 1fr;
	}

	.car-entry.reverse .car-image-link {
		order: 2;
	}

	.car-entry.reverse .car-info {
		order: 1;
	}

	.car-image-link {
		display: block;
		text-decoration: none;
	}

	.car-image {
		width: 100%;
		aspect-ratio: 4/3;
		border-radius: 8px;
		overflow: hidden;
		background: #e0e0e0;
	}

	.car-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: transform 0.3s ease;
	}

	.car-image-link:hover img {
		transform: scale(1.05);
	}

	.car-info {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.car-header {
		display: flex;
		align-items: baseline;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.car-header h2 {
		margin: 0;
	}

	.car-header h2 a {
		color: var(--primary-crimson);
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.car-header h2 a:hover {
		color: var(--secondary-red);
		text-decoration: underline;
	}

	.year {
		font-size: 1.25rem;
		color: var(--primary-gray);
		font-weight: 600;
	}

	.short-description {
		font-size: 1rem;
		color: #333;
		line-height: 1.6;
		margin: 0;
	}

	.team-leads,
	.competition-summary {
		margin: 0;
	}

	.team-leads h3,
	.competition-summary h3 {
		color: var(--primary-gray);
		margin: 0 0 0.5rem 0;
	}

	.team-leads ul,
	.competition-summary ul {
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

	.event-name {
		font-weight: 600;
		color: #333;
		margin: 0 0 0.25rem 0;
	}

	.placement {
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--primary-crimson);
		margin: 0 0 0.5rem 0;
	}

	.highlights {
		font-size: 0.9rem;
		color: #555;
	}

	.highlights li {
		margin-bottom: 0.15rem;
		padding-left: 1.2rem;
		position: relative;
	}

	.highlights li:before {
		content: '•';
		position: absolute;
		left: 0.3rem;
		color: var(--primary-crimson);
		font-weight: bold;
	}

	.learn-more {
		display: inline-block;
		color: var(--primary-crimson);
		font-weight: 600;
		text-decoration: none;
		margin-top: 0.5rem;
		transition: color 0.2s ease;
	}

	.learn-more:hover {
		color: var(--secondary-red);
		text-decoration: underline;
	}

	/* Responsive Design */
	@media (max-width: 900px) {
		.car-entry,
		.car-entry.reverse {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.car-entry.reverse .car-image-link,
		.car-entry.reverse .car-info {
			order: initial;
		}

		.intro {
			font-size: 1rem;
		}
	}

	@media (max-width: 600px) {
		.container {
			padding: 1.5rem 1rem;
		}

		.cars-list {
			gap: 2.5rem;
		}

		.car-entry {
			padding: 1.5rem;
		}

		.year {
			font-size: 1.1rem;
		}
	}
</style>
