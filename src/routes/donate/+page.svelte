<script>
	const contactEmail = 'wazzu.racing@wsu.edu';
	const mailingAddress = `Wazzu Racing
c/o Voiland College of Engineering and Architecture
Engineering Laboratory Building
900 NE College Ave
Pullman, WA 99163`;
	const foundationDonateUrl =
		'https://foundation.wsu.edu/give/?fund=99981d7c-3c77-4fed-a76b-1267a2069cae&utm_source=sae-formula&utm_medium=wsu-link&utm_campaign=voiland-college-of-engineering-and-architecture';

	// Sponsor packet PDF (bundled asset)
	import sponsorPacket from '$lib/assets/Wazzu_Racing_Sponsorship_Packet.pdf';
</script>

<svelte:head>
	<title>Donate — Wazzu Racing</title>
	<meta
		name="description"
		content="Support Wazzu Racing — Washington State University's Formula SAE team. Learn how to donate, sponsor, or give in-kind to support student engineers."
	/>
</svelte:head>

<main class="container donate-page">
	<header class="heroRow">
		<div>
			<h1>Support Wazzu Racing</h1>
			<p>
				Our student-led Formula SAE program depends on donations from alumni, industry partners, and
				friends to design, build, and compete each season. Your support funds parts, materials,
				travel, and hands-on learning opportunities for future engineers.
			</p>
		</div>
	</header>

	<section class="donation-options">
		<h2>Give directly</h2>
		<p>
			You can make a secure online gift through the Washington State University Foundation. Select
			"Other" and note "Wazzu Racing" in the designation, or contact us for a direct link.
		</p>

		<div class="cta-row">
			<a class="btn primary" href={foundationDonateUrl} target="_blank" rel="noopener noreferrer"
				>Donate via WSU Foundation</a
			>
			<a class="btn" href={'mailto:' + contactEmail}>Email: {contactEmail}</a>
		</div>
	</section>

	<section class="corporate">
		<h2>Corporate sponsorship & partnerships</h2>
		<p>
			Industry partners provide critical funding, mentorship, and in-kind support. Sponsorships help
			cover manufacturing, testing, and travel costs while creating recruiting pipelines for
			students.
		</p>

		<div class="sponsor-grid">
			<article class="sponsor-card">
				<h3>Crimson Package</h3>
				<p class="amount">($4000+ or equivalent in products or services)</p>
				<ul>
					<li>Logos of your choice on this year’s car and/or apparel</li>
					<li>Personal shop tour</li>
					<li>Product display at competition with banner</li>
					<li>Other benefits upon request</li>
					<li>All items from lower tiers</li>
				</ul>
			</article>

			<article class="sponsor-card">
				<h3>Gold Package</h3>
				<p class="amount">($2500 or equivalent in products or services)</p>
				<ul>
					<li>Featured on team media with special recognition</li>
					<li>Large logo on this year’s car</li>
					<li>Wazzu Racing banner</li>
					<li>All items from lower tiers</li>
				</ul>
			</article>

			<br />

			<article class="sponsor-card">
				<h3>Silver Package</h3>
				<p class="amount">($1500 or equivalent in products or services)</p>
				<ul>
					<li>Specific social media post about your company</li>
					<li>Medium logo on this year’s car</li>
					<li>3D-printed model of this year’s car</li>
					<li>All items from lower tiers</li>
				</ul>
			</article>

			<article class="sponsor-card">
				<h3>Bronze Package</h3>
				<p class="amount">($1000 or equivalent in products or services)</p>
				<ul>
					<li>Small logo or name on this year’s car</li>
					<li>Wazzu Racing hat and T-shirt</li>
					<li>All items from personal donation tier</li>
				</ul>
			</article>
		</div>

		<div class="sponsor-packet">
			<p>
				Want to see sponsorship options and benefits in detail? Download our sponsorship packet
				(PDF) for the 2025–2026 season.
			</p>
			<a class="btn primary" href={sponsorPacket} target="_blank" rel="noopener noreferrer" download
				>Download Sponsorship Packet (PDF)</a
			>
		</div>
	</section>
</main>

<style>
	:global(body) {
		font-family:
			system-ui,
			-apple-system,
			'Segoe UI',
			Roboto,
			'Helvetica Neue',
			Arial;
		margin: 0;
		color: #111;
		background: #fff;
	}

	.container {
		max-width: 1100px;
		margin: 2rem auto;
		padding: 0 1rem;
	}

	.heroRow {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		padding-bottom: 0.6rem;
		border-bottom: 1px solid rgba(0, 0, 0, 0.04);
	}

	h1 {
		margin: 0 0 0.45rem 0;
		color: #8a0000;
	}

	/* Use the same paragraph styling as other pages */
	p {
		margin: 0 0 0.75rem 0;
		color: #333;
		line-height: 1.55;
	}

	.donation-options,
	.corporate,
	.in-kind,
	.mailing,
	.impact,
	.contact-card {
		margin-top: 1.4rem;
	}

	.cta-row {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: 0.6rem;
	}

	.packet-row {
		display: flex;
		gap: 10px;
		margin-top: 0.9rem;
	}

	.btn {
		display: inline-block;
		padding: 10px 14px;
		border-radius: 6px;
		text-decoration: none;
		color: #111;
		background: #f0f0f0;
		border: 1px solid rgba(0, 0, 0, 0.06);
		font-weight: 700;
	}

	.btn.primary {
		background: #a60f2d;
		color: #fff;
		border: none;
	}

	.sponsor-grid {
		/* 3 columns on wide screens, 2 on medium, 1 on small */
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
		margin-top: 0.9rem;
		align-items: start;
	}

	@media (max-width: 1000px) {
		.sponsor-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 560px) {
		.sponsor-grid {
			grid-template-columns: 1fr;
		}
	}

	.sponsor-card {
		/* Make cards equal height and stack content vertically */
		display: flex;
		flex-direction: column;
		padding: 16px;
		border-radius: 8px;
		background: #fff;
		box-shadow: 0 6px 18px rgba(20, 20, 20, 0.04);
		min-height: 220px;
	}

	.sponsor-card h3 {
		margin: 0 0 6px 0;
		color: #8a0000;
	}

	.sponsor-card .amount {
		font-weight: 800;
		color: #333;
		margin: 6px 0;
	}

	.sponsor-card ul {
		padding-left: 1.05rem;
		margin: 0.3rem 0;
		color: #444;
		/* allow the list area to take remaining space so cards align nicely */
		flex-grow: 1;
	}

	.tier-list {
		padding-left: 1.05rem;
		color: #333;
	}

	.address {
		background: #f9f9f9;
		border-radius: 6px;
		padding: 10px;
		font-family:
			ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', 'Helvetica Neue', monospace;
		font-size: 0.95rem;
		white-space: pre-wrap;
	}

	.note {
		font-size: 0.95rem;
		color: #555;
		margin-top: 0.6rem;
	}

	@media (max-width: 720px) {
		.heroRow {
			flex-direction: column;
			align-items: flex-start;
		}
		.cta-row {
			flex-direction: column;
		}
		.packet-row {
			flex-direction: column;
		}
	}
</style>
