<svelte:head>
	<title>Contact — Wazzu Racing</title>
	<meta
		name="description"
		content="Contact Wazzu Racing — reach out for recruitment, sponsorship, or general inquiries."
	/>
</svelte:head>

<main class="container">
	<section class="hero">
		<div class="heroText">
			<h1>Contact</h1>
			<p class="tagline">
				For membership questions, sponsorship inquiries, or general information, email us and we'll
				get back to you.
			</p>
		</div>
	</section>

	<section class="contactCard">
		<h2>Get in touch</h2>

		<p>
			Email:
			<a class="email" href="mailto:wazzu.racing@wsu.edu">wazzu.racing@wsu.edu</a>
		</p>

		<h3>Mailing address</h3>
		<address>
			Engineering Laboratory<br />
			900 NE College Ave<br />
			Pullman, WA 99163
		</address>

		<h3>Follow</h3>
		<p class="socials">
			<a href="https://www.instagram.com/wazzu_racing" target="_blank" rel="noopener">Instagram</a>
			·
			<a href="https://www.linkedin.com/wazzu-racing" target="_blank" rel="noopener">LinkedIn</a>
			·
			<a href="https://github.com/wazzu-racing" target="_blank" rel="noopener">GitHub</a>
		</p>

		<h3>Newsletter</h3>
		<p>
			Stay updated on events, build progress, and team news:
			<a href="/newsletter" class="newsletter-link">View Newsletter</a>
		</p>
	</section>
</main>

<style>
	.container {
		max-width: 1100px;
		margin: 2rem auto;
		padding: 0 1rem;
	}

	.hero {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem 0;
		border-bottom: 1px solid rgba(0, 0, 0, 0.04);
	}

	.heroText h1 {
		margin: 0;
	}

	.tagline {
		margin: 0.25rem 0 0;
		color: #444;
		font-size: 0.95rem;
	}

	.card {
		background: transparent;
		border-radius: 0;
		padding: 0;
		box-shadow: none;
		border: none;
	}

	.contactCard {
		margin-top: 1.25rem;
		max-width: 820px;
	}

	h2 {
		margin-top: 0;
	}

	h3 {
		margin-bottom: 0.25rem;
		margin-top: 1rem;
	}

	a.email {
		color: #8a0000;
		text-decoration: none;
		font-weight: 500;
	}

	a.email:hover {
		text-decoration: underline;
	}

	.socials a {
		color: #8a0000;
		text-decoration: none;
		margin-right: 0.4rem;
	}

	.socials a:hover {
		text-decoration: underline;
	}

	.note {
		margin-top: 1rem;
		color: #555;
		font-size: 0.95rem;
	}

	.newsletter-link {
		color: #8a0000;
		text-decoration: none;
		font-weight: 500;
	}

	.newsletter-link:hover {
		text-decoration: underline;
	}

	@media (max-width: 600px) {
		.container {
			margin: 1rem;
		}
		.contactCard {
			padding: 1rem;
		}
	}
</style>
