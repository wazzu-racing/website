<script>
	import logo from '$lib/assets/WR/backgroundless_clean.png';
	import teamPicture from '$lib/assets/WR/12.jpg';
	import car1 from '$lib/assets/WR/3.jpg';
	import car2 from '$lib/assets/WR/4.jpg';
	import pits from '$lib/assets/WR/30.jpg';
	import shop from '$lib/assets/WR/5.jpg';
</script>

<svelte:head>
	<title>About — Wazzu Racing</title>
	<meta
		name="description"
		content="Wazzu Racing — Washington State University's Formula SAE team.
		We design, build, and race a formula-style car while teaching students
		practical engineering and teamwork."
	/>
</svelte:head>

<main class="container">
	<h1>About Us</h1>
	<section class="intro sideBySide">
		<div class="text">
			<p>
				Wazzu Racing is a student-led Formula SAE team at Washington State University. Every year we
				design and build a formula-style race car. Then every May we travel to the Michigan
				International Speedway to compete against 119 other universities in a variety of events.
			</p>

			<p>
				In addition to building a car, student on the team learn valuable skills &mdash; from CAD to
				aerodynamics to vehicle suspension &mdash; that will be useful later in life. In addition to
				applying what they learn in class, students have to go above and beyond to learn new skills,
				while also gaining hands-on experience in exactly what it takes to create an entire racecar.
			</p>

			<p>
				Currently ranked 60th out of the 120 teams that competed in Michigan 2025, we are
				continually striving to improve.
			</p>
		</div>

		<figure class="leadImage">
			<img src={teamPicture} alt="Wazzu Racing team posing in front of the car" />
			<figcaption>The team with the car at competition in 2025</figcaption>
		</figure>
	</section>

	<section class="whatWeDo">
		<h2>About Formula SAE</h2>

		<p>
			Formula SAE is a yearly collegiate competition. Students design and build small open-wheeled
			racecars, then race them against other teams from all around the globe. Each year teams travel
			to Michigan International Speedway to compete.
		</p>

		<!-- Formula SAE is an annual collegiate competition where students design,
		build, and race a small open-wheeled racecar against other college
		teams. Teams from all across the globe travel to Michigan International
		Speedway each year to compete in this event. The competition is broken
		into two categories: static events and dynamic events. Static events are
		where industry professionals judge the quality of the car and the team
		through a series of reports and presentations. Dynamic events are where
		the car races a series of time trials against other teams. The five
		dynamic events are Acceleration, Endurance, Autocross, Efficiency, and
		Skidpad. A breakdown of the events and scoring is below. -->

		<!-- <em>Some technical details about the car</em> -->
		<!-- <br />
		<br /> -->
		<!-- <br />
		<br />
		<br />
		<br /> -->

		<p>
			<!-- Each year we design and fabricate a new competition car. Work spans chassis and suspension
			design, powertrain integration, aerodynamics, electronics, and safety systems. Prototyping and
			testing are central — we iterate using data acquisition and driver feedback to improve
			performance and reliability. -->
		</p>

		<ul>
			<!-- <li>Full vehicle design and manufacturing each season</li>
			<li>Aero development and CFD-informed updates</li>
			<li>Data-driven testing and performance tuning</li>
			<li>Documentation, cost analysis, and business presentations for static events</li> -->
		</ul>
	</section>

	<section class="join">
		<h2>Join the team</h2>
		<p>
			We welcome students from any major. Whether you're interested in design, fabrication,
			electronics, programming, or business, there's a place for you. No prior FSAE experience is
			required — we run workshops and mentorships to bring new members up to speed.
		</p>
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
			For recruitment, sponsorship, or general inquiries: <a href="mailto:wazzu.racing@wsu.edu"
				>wazzu.racing@wsu.edu</a
			>. Follow our club pages and social media for the latest build updates and event
			announcements.
		</p>
		<p>
			Stay informed with our <a href="/newsletter">newsletter</a> for updates on events, build progress,
			and team news.
		</p>
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
		text-align: justify;
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
		.gallery .grid {
			grid-template-columns: 1fr;
		}
		.gallery img {
			height: 140px;
		}
	}
</style>
