<script>
	// Sponsors page data — replace placeholder logos and URLs with real assets later
	const placeholderLogo = `data:image/svg+xml;utf8,${encodeURIComponent(
		`<svg xmlns='http://www.w3.org/2000/svg' width='600' height='220' viewBox='0 0 600 220'>
			<rect width='100%' height='100%' fill='%23f4f4f4'/>
			<g fill='%23888' font-family='Arial, Helvetica, sans-serif' font-size='28' text-anchor='middle'>
				<text x='50%' y='45%' dy='.35em'>Sponsor Logo</text>
				<text x='50%' y='70%' dy='.35em' font-size='16'>Replace with real logo</text>
			</g>
		</svg>`
	)}`;

	const tiers = [
		{
			id: 'crimson',
			title: 'Crimson Partners',
			color: '--primary-crimson',
			description: 'Our top-tier partners who provide exceptional support and resources.',
			sponsors: [
				{ name: 'Platinum Co. 1', url: '#', logo: placeholderLogo },
				{ name: 'Platinum Co. 2', url: '#', logo: placeholderLogo }
			]
		},
		{
			id: 'gold',
			title: 'Gold Partners',
			color: 'yellow',
			description: 'Major sponsors who enable key subsystems and long-term support.',
			sponsors: [
				{ name: 'Gold Co. 1', url: '#', logo: placeholderLogo },
				{ name: 'Gold Co. 2', url: '#', logo: placeholderLogo },
				{ name: 'Gold Co. 3', url: '#', logo: placeholderLogo }
			]
		},
		{
			id: 'silver',
			title: 'Silver Partners',
			color: 'green',
			description: 'Important contributors who support manufacturing, materials, and testing.',
			sponsors: [
				{ name: 'Silver Co. 1', url: '#', logo: placeholderLogo },
				{ name: 'Silver Co. 2', url: '#', logo: placeholderLogo },
				{ name: 'Silver Co. 3', url: '#', logo: placeholderLogo },
				{ name: 'Silver Co. 4', url: '#', logo: placeholderLogo }
			]
		},
		{
			id: 'bronze',
			title: 'Bronze Partners',
			color: 'blue',
			description: 'Contributors',
			sponsors: [
				{ name: 'Supporter 1', url: '#', logo: placeholderLogo },
				{ name: 'Supporter 2', url: '#', logo: placeholderLogo },
				{ name: 'Supporter 3', url: '#', logo: placeholderLogo },
				{ name: 'Supporter 4', url: '#', logo: placeholderLogo },
				{ name: 'Supporter 5', url: '#', logo: placeholderLogo }
			]
		},
		{
			id: 'personal',
			title: 'Personal Supporters',
			color: 'black',
			description: 'Organizations and friends who help keep Wazzu Racing moving.',
			sponsors: [
				{ name: 'Supporter 1', url: '#', logo: placeholderLogo },
				{ name: 'Supporter 2', url: '#', logo: placeholderLogo },
				{ name: 'Supporter 3', url: '#', logo: placeholderLogo },
				{ name: 'Supporter 4', url: '#', logo: placeholderLogo },
				{ name: 'Supporter 5', url: '#', logo: placeholderLogo }
			]
		}
	];
</script>

<svelte:head>
	<title>Wazzu Racing — Sponsors</title>
	<meta
		name="description"
		content="Wazzu Racing sponsors and partners — Washington State University Formula SAE team."
	/>
</svelte:head>

<main class="sponsors-page">
	<section class="hero">
		<div class="hero-inner">
			<h1 class="title">Sponsors & Partners</h1>
			<p class="lead">
				Thank you to the companies, alumni, and friends who support Wazzu Racing. Your contributions
				make our car programs, student development, and competitions possible.
			</p>
		</div>
	</section>

	<section class="cta">
		<p>
			Interested in sponsoring Wazzu Racing? Learn about sponsorship levels and benefits on our
			<a href="/contact">contact</a> page or email us at
			<a href="mailto:wazzu.racing@wsu.edu">wazzu.racing@wsu.edu</a>.
		</p>
	</section>

	<section class="tiers">
		{#each tiers as tier (tier.id)}
			<article id={tier.id} class="tier">
				<header class="tier-header">
					<div class="tier-title" style="color: {tier.color}">{tier.title}</div>
					{#if tier.description}
						<p class="tier-desc">{tier.description}</p>
					{/if}
				</header>

				<div class="sponsor-grid" role="list">
					{#each tier.sponsors as sponsor (sponsor.name)}
						<a
							class="sponsor-card"
							href={sponsor.url}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={'Sponsor: ' + sponsor.name}
						>
							<div class="logo-wrap" aria-hidden="false">
								<img src={sponsor.logo} alt={sponsor.name + ' logo'} loading="lazy" />
							</div>
							<div class="sponsor-info">
								<div class="sponsor-name" style="color: {tier.color}">{sponsor.name}</div>
							</div>
						</a>
					{/each}
				</div>
			</article>
		{/each}
	</section>
</main>

<style>
	/* Use global WSU color variables defined in static/global.css */
	.sponsors-page {
		max-width: 1200px;
		margin: 2.5rem auto;
		padding: 0 1rem;
		font-family:
			Inter,
			system-ui,
			-apple-system,
			'Segoe UI',
			Roboto,
			Arial,
			sans-serif;
		color: var(--primary-gray);
	}

	.hero {
		background: transparent;
		border-radius: 12px;
		padding: 1.75rem;
		margin-bottom: 1.25rem;
		box-shadow: 0 8px 30px rgba(20, 20, 20, 0.04);
	}

	.hero-inner {
		max-width: 1100px;
		margin: 0 auto;
		text-align: justify;
	}

	.title {
		margin: 0;
		color: #111;
	}

	.lead {
		margin-top: 0.5rem;
		color: #333;
		max-width: 80ch;
		margin-left: auto;
		margin-right: auto;
	}

	.tier {
		margin-top: 1.75rem;
	}

	.tier-header {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		margin-bottom: 0.85rem;
	}

	.tier-title {
		color: var(--primary-crimson);
		font-weight: 800;
		letter-spacing: 0.4px;
	}

	.tier-desc {
		margin: 0;
		color: #555;
		font-size: 0.95rem;
	}

	.sponsor-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		margin-top: 0.6rem;
	}

	.sponsor-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		border-radius: 10px;
		background: #fff;
		padding: 1rem;
		text-decoration: none;
		color: inherit;
		box-shadow: 0 6px 18px rgba(20, 20, 20, 0.04);
		border: 1px solid rgba(0, 0, 0, 0.04);
		transition:
			transform 180ms ease,
			box-shadow 180ms ease,
			border-color 180ms ease;
		min-height: 120px;
	}

	.sponsor-card:focus,
	.sponsor-card:hover {
		transform: translateY(-6px);
		box-shadow: 0 18px 36px rgba(20, 20, 20, 0.08);
		border-color: rgba(166, 15, 45, 0.12);
		outline: none;
	}

	.logo-wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 84px;
		margin-bottom: 0.55rem;
	}

	.logo-wrap img {
		max-height: 72px;
		max-width: 100%;
		object-fit: contain;
		filter: saturate(0.02) brightness(0.98);
	}

	.sponsor-info {
		text-align: center;
		width: 100%;
	}

	.sponsor-name {
		font-weight: 700;
		font-size: 0.98rem;
		color: #111;
	}

	/* Slight visual difference for Platinum tier cards */
	#platinum .sponsor-card {
		border: 1px solid rgba(166, 15, 45, 0.12);
		box-shadow: 0 10px 28px rgba(166, 15, 45, 0.04);
	}

	/* Responsive tweaks */
	@media (max-width: 860px) {
		.hero {
			padding: 1.1rem;
		}

		.logo-wrap {
			height: 72px;
		}
	}

	@media (max-width: 520px) {
		.sponsor-grid {
			grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
			gap: 0.7rem;
		}

		.sponsor-card {
			padding: 0.75rem;
			min-height: 110px;
		}
	}

	.cta {
		margin-top: 1.9rem;
		padding: 1rem;
		background: rgba(166, 15, 45, 0.03);
		border-radius: 8px;
		text-align: center;
		color: #333;
	}

	.cta a {
		color: var(--primary-crimson);
		font-weight: 700;
		text-decoration: underline;
	}
</style>
