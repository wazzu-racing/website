<script>
	import logo from '$lib/assets/WR/backgroundless_clean.png';
	import teamPicture from '$lib/assets/WR/12.jpg';
	import car1 from '$lib/assets/WR/3.jpg';
	import car2 from '$lib/assets/WR/4.jpg';
	import pits from '$lib/assets/WR/30.jpg';
	import shop from '$lib/assets/WR/5.jpg';

	// The user indicated the team has been competing for 20 years.
	const yearsCompeting = 20;
</script>

<svelte:head>
	<title>About — Wazzu Racing</title>
	<meta
		name="description"
		content="Wazzu Racing — Washington State University's Formula SAE team. We design, build, and race a formula-style car while teaching students practical engineering and teamwork."
	/>
</svelte:head>

<main class="container">
	<section class="intro sideBySide">
		<div class="text">
			<p>
				Wazzu Racing is a student-led Formula SAE (FSAE) team at Washington State University. We
				design, build, and compete with a formula-style race car in an international competition
				with universities from around the world. The program challenges students to apply classroom
				theory to practical engineering problems — from CAD and composites to vehicle dynamics and
				project management.
			</p>

			<p>
				Over the past two decades the team has grown in technical depth and student leadership.
				Members gain hands-on experience in mechanical and electrical systems, controls,
				manufacturing, and the business aspects of motorsport projects such as cost reporting and
				presentations.
			</p>
		</div>

		<figure class="leadImage">
			<img src={teamPicture} alt="Wazzu Racing team posing in front of the car" />
			<figcaption>Team and car at a regional competition</figcaption>
		</figure>
	</section>

	<section class="whatWeDo">
		<h2>What we build</h2>
		<p>
			Each year we design and fabricate a new competition car. Work spans chassis and suspension
			design, powertrain integration, aerodynamics, electronics, and safety systems. Prototyping and
			testing are central — we iterate using data acquisition and driver feedback to improve
			performance and reliability.
		</p>

		<ul>
			<li>Full vehicle design and manufacturing each season</li>
			<li>Aero development and CFD-informed updates</li>
			<li>Data-driven testing and performance tuning</li>
			<li>Documentation, cost analysis, and business presentations for static events</li>
		</ul>
	</section>

	<section class="gallery">
		<h2>Gallery</h2>
		<p class="galleryIntro">A few snapshots from the shop, the pits, and on track.</p>

		<div class="grid">
			<figure>
				<img src={car1} alt="Wazzu Racing car on track" />
				<figcaption>On-track testing</figcaption>
			</figure>

			<figure>
				<img src={car2} alt="Close-up of a car component" />
				<figcaption>Component detail and craftsmanship</figcaption>
			</figure>

			<figure>
				<img src={pits} alt="Pit area and crew working on the car" />
				<figcaption>Pit crew during an event</figcaption>
			</figure>

			<figure>
				<img src={shop} alt="Students working in the shop" />
				<figcaption>Hands-on build sessions in the shop</figcaption>
			</figure>
		</div>
	</section>

	<section class="join">
		<h2>Join the team</h2>
		<p>
			We welcome students from any major. Whether you're interested in design, fabrication,
			electronics, programming, or business, there's a place for you. No prior FSAE experience is
			required — we run workshops and mentorships to bring new members up to speed.
		</p>

		<div class="howTo">
			<h3>How to get involved</h3>
			<ol>
				<li>Attend an interest meeting (check our events or socials for dates)</li>
				<li>
					Contact our officers or reach out via email: <a href="mailto:wazzuracing@wsu.edu"
						>wazzuracing@wsu.edu</a
					>
				</li>
				<li>
					Join a subteam: chassis, powertrain, aero, controls, manufacturing, marketing, or business
				</li>
			</ol>
		</div>
	</section>

	<section class="impact">
		<h2>Impact & partnerships</h2>
		<p>
			Wazzu Racing has helped hundreds of students develop real-world engineering skills and
			professional experience. Alumni have gone on to careers in motorsports, automotive, aerospace,
			and other technical fields. We value collaborations with industry partners and alumni —
			sponsorships, mentorship, and in-kind support all make a meaningful difference.
		</p>
	</section>

	<section class="contact">
		<h2>Contact</h2>
		<p>
			For recruitment, sponsorship, or general inquiries: <a href="mailto:wazzuracing@wsu.edu"
				>wazzuracing@wsu.edu</a
			>. Follow our club pages and social media for the latest build updates and event
			announcements.
		</p>
	</section>
</main>

<footer class="siteFooter">
	<p>© Wazzu Racing — Washington State University</p>
	<p>Competing in Formula SAE for {yearsCompeting} years</p>
</footer>

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

	.hero {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1.5rem;
		background: linear-gradient(90deg, rgba(120, 20, 20, 0.03), transparent);
		border-bottom: 1px solid rgba(0, 0, 0, 0.04);
	}

	.logo {
		width: 84px;
		height: 84px;
		object-fit: contain;
	}

	.heroText h1 {
		margin: 0;
		font-size: 1.6rem;
	}

	.heroText .tagline {
		margin: 0.25rem 0 0;
		color: #444;
		font-size: 0.95rem;
	}

	.container {
		max-width: 1100px;
		margin: 2rem auto;
		padding: 0 1rem;
	}

	.sideBySide {
		display: flex;
		gap: 1.5rem;
		align-items: flex-start;
		flex-wrap: wrap;
	}

	.text {
		flex: 1 1 420px;
		min-width: 260px;
	}

	.leadImage {
		flex: 1 1 360px;
		text-align: center;
	}

	.leadImage img {
		width: 100%;
		border-radius: 8px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
	}

	h2 {
		margin-top: 1.75rem;
		font-size: 1.2rem;
	}

	.whatWeDo ul,
	.highlights ul {
		padding-left: 1.2rem;
	}

	.gallery .grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 12px;
		margin-top: 0.7rem;
	}

	.gallery figure {
		margin: 0;
	}

	.gallery img {
		width: 100%;
		height: 160px;
		object-fit: cover;
		border-radius: 6px;
		box-shadow: 0 6px 14px rgba(0, 0, 0, 0.05);
	}

	.gallery figcaption {
		font-size: 0.85rem;
		color: #555;
		margin-top: 0.4rem;
	}

	.join .howTo ol {
		padding-left: 1.2rem;
	}

	.siteFooter {
		margin-top: 2.5rem;
		padding: 1.2rem;
		text-align: center;
		color: #666;
		border-top: 1px solid rgba(0, 0, 0, 0.04);
	}

	a {
		color: #8a0000;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}

	@media (max-width: 900px) {
		.gallery .grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 560px) {
		.hero {
			padding: 1rem;
		}
		.heroText h1 {
			font-size: 1.25rem;
		}
		.gallery .grid {
			grid-template-columns: 1fr;
		}
		.gallery img {
			height: 140px;
		}
	}
</style>
