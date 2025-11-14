<script>
	export let data;
	const { car } = data;
</script>

<svelte:head>
	<title>{car.name} ({car.year}) — Wazzu Racing</title>
	<meta
		name="description"
		content={`${car.name} - ${car.shortDescription} Competition: ${car.competition.placement} at ${car.competition.event}.`}
	/>
</svelte:head>

<main class="container">
	<nav class="breadcrumb">
		<a href="/cars" data-sveltekit-preload-data>← Back to All Cars</a>
	</nav>

	<article class="car-detail">
		<header class="car-header">
			<div class="title-section">
				<h1>{car.name}</h1>
				<span class="year">{car.year} Season</span>
			</div>
			<p class="tagline">{car.shortDescription}</p>
		</header>

		<div class="hero-image">
			<img src={car.image} alt={`${car.name} - ${car.year} Wazzu Racing car`} />
		</div>

		<section class="overview">
			<div class="description">
				<h2>Overview</h2>
				{#each car.description.split('\n\n') as paragraph, i (i)}
					<p>{paragraph.trim()}</p>
				{/each}
			</div>

			<aside class="sidebar">
				<div class="info-card competition-card">
					<h3>Competition Results</h3>
					<div class="competition-details">
						<p class="event-name">{car.competition.event}</p>
						<p class="placement">{car.competition.placement}</p>
						<h4>Highlights</h4>
						<ul>
							{#each car.competition.highlights as highlight, i (i)}
								<li>{highlight}</li>
							{/each}
						</ul>
					</div>
				</div>

				<div class="info-card team-card">
					<h3>Team Leadership</h3>
					<ul class="team-leads">
						{#each car.teamLeads as lead (lead.name)}
							<li>
								<strong>{lead.name}</strong>
								<span class="role">{lead.role}</span>
							</li>
						{/each}
					</ul>
				</div>
			</aside>
		</section>

		<!-- <section class="technical-details">
			<h2>Technical Highlights</h2>
			<ul class="tech-list">
				{#each car.technicalHighlights as highlight, i (i)}
					<li>{highlight}</li>
				{/each}
			</ul>
		</section> -->
	</article>

	<nav class="car-navigation">
		<a href="/cars" class="back-button" data-sveltekit-preload-data>← View All Cars</a>
	</nav>
</main>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.breadcrumb {
		margin-bottom: 2rem;
	}

	.breadcrumb a {
		color: var(--primary-gray);
		text-decoration: none;
		font-size: 0.95rem;
		transition: color 0.2s ease;
	}

	.breadcrumb a:hover {
		color: var(--primary-crimson);
	}

	.car-detail {
		background: #fff;
	}

	.car-header {
		margin-bottom: 2rem;
	}

	.title-section {
		display: flex;
		align-items: baseline;
		gap: 1.5rem;
		flex-wrap: wrap;
		margin-bottom: 1rem;
	}

	.car-header h1 {
		font-size: 3rem;
		color: var(--primary-crimson);
		margin: 0;
		font-weight: 700;
	}

	.year {
		font-size: 1.5rem;
		color: var(--primary-gray);
		font-weight: 600;
	}

	.tagline {
		font-size: 1.25rem;
		color: #555;
		line-height: 1.6;
		margin: 0;
		max-width: 900px;
	}

	.hero-image {
		width: 100%;
		margin-bottom: 3rem;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
	}

	.hero-image img {
		width: 100%;
		height: auto;
		display: block;
		object-fit: cover;
		max-height: 600px;
	}

	.overview {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 3rem;
		margin-bottom: 3rem;
	}

	.description h2 {
		font-size: 1.75rem;
		color: var(--primary-crimson);
		margin: 0 0 1.5rem 0;
		font-weight: 700;
	}

	.description p {
		font-size: 1rem;
		line-height: 1.7;
		color: #333;
		margin-bottom: 1.25rem;
	}

	.sidebar {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.info-card {
		background: #f8f8f8;
		padding: 1.5rem;
		border-radius: 10px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
	}

	.info-card h3 {
		font-size: 1.1rem;
		color: var(--primary-gray);
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin: 0 0 1rem 0;
		font-weight: 600;
		border-bottom: 2px solid var(--primary-crimson);
		padding-bottom: 0.5rem;
	}

	.info-card h4 {
		font-size: 0.9rem;
		color: var(--primary-gray);
		text-transform: uppercase;
		letter-spacing: 0.3px;
		margin: 1rem 0 0.5rem 0;
		font-weight: 600;
	}

	.competition-details .event-name {
		font-weight: 600;
		color: #333;
		margin: 0 0 0.5rem 0;
		font-size: 1rem;
	}

	.competition-details .placement {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--primary-crimson);
		margin: 0 0 1rem 0;
	}

	.competition-details ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.competition-details li {
		color: #555;
		margin-bottom: 0.5rem;
		padding-left: 1.25rem;
		position: relative;
		font-size: 0.95rem;
	}

	.competition-details li:before {
		content: '✓';
		position: absolute;
		left: 0;
		color: var(--primary-crimson);
		font-weight: bold;
	}

	.team-leads {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.team-leads li {
		margin-bottom: 1rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid #e0e0e0;
	}

	.team-leads li:last-child {
		border-bottom: none;
		margin-bottom: 0;
		padding-bottom: 0;
	}

	.team-leads strong {
		display: block;
		color: #222;
		font-size: 1rem;
		margin-bottom: 0.25rem;
	}

	.team-leads .role {
		display: block;
		color: #666;
		font-size: 0.9rem;
		font-style: italic;
	}

	.technical-details {
		background: #fafafa;
		padding: 2.5rem;
		border-radius: 12px;
		margin-bottom: 3rem;
	}

	.technical-details h2 {
		font-size: 1.75rem;
		color: var(--primary-crimson);
		margin: 0 0 1.5rem 0;
		font-weight: 700;
	}

	.tech-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1rem;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.tech-list li {
		background: #fff;
		padding: 1rem 1.25rem;
		border-radius: 8px;
		color: #333;
		font-size: 0.95rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
		border-left: 3px solid var(--primary-crimson);
		line-height: 1.5;
	}

	.car-navigation {
		text-align: center;
		padding: 2rem 0;
	}

	.back-button {
		display: inline-block;
		padding: 0.75rem 2rem;
		background: var(--primary-crimson);
		color: white;
		text-decoration: none;
		border-radius: 6px;
		font-weight: 600;
		transition: background 0.2s ease;
	}

	.back-button:hover {
		background: var(--secondary-red);
	}

	/* Responsive Design */
	@media (max-width: 900px) {
		.overview {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.car-header h1 {
			font-size: 2.25rem;
		}

		.year {
			font-size: 1.25rem;
		}

		.tagline {
			font-size: 1.1rem;
		}

		.tech-list {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 600px) {
		.container {
			padding: 1.5rem 1rem;
		}

		.car-header h1 {
			font-size: 1.75rem;
		}

		.year {
			font-size: 1.1rem;
		}

		.tagline {
			font-size: 1rem;
		}

		.title-section {
			gap: 1rem;
		}

		.technical-details {
			padding: 1.5rem;
		}

		.hero-image img {
			max-height: 400px;
		}
	}
</style>
