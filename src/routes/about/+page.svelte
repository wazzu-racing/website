<script>
	import teamPicture from '$lib/assets/WR/12.jpg?enhanced';
	import fastCar from '$lib/assets/WR/21.png?enhanced';
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
				continually striving to improve our team and car. Since 2023, we have improved our score by
				280 points, and moved up 58 places in competition.
			</p>
		</div>

		<figure class="leadImage">
			<enhanced:img
				src={fastCar}
				alt="Wazzu Racing team posing in front of the car"
				sizes="(min-width: 1100px) 500px, 45vw"
			/>
		</figure>
	</section>

	<section class="intro sideBySide">
		<figure class="leadImage">
			<enhanced:img
				src={teamPicture}
				alt="Wazzu Racing team posing in front of the car"
				sizes="(min-width: 1100px) 500px, 45vw"
			/>
			<figcaption>The team with the car at competition in 2025</figcaption>
		</figure>

		<div class="text">
			<h2>Our Members</h2>
			<p>
				Wazzu Racing is made up of more than 50 students of diverse backgrounds and experiences,
				joined together by a passion for motorsports. We have ten subteams covering all aspects of
				the car, with students in many different majors, including business, communication,
				engineering, and more. Members are encouraged to branch out and take on multifaceted
				projects that cover a wide range of skills and expose them to new ideas.
			</p>
		</div>
	</section>

	<section class="contact">
		<h2>Contact</h2>
		<p>
			For recruitment, sponsorship, or general inquiries: <a href="mailto:wazzu.racing@wsu.edu"
				>wazzu.racing@wsu.edu</a
			>. For more information, see our <a href="/contact">contact page</a>.
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

	.leadImage :global(img),
	.leadImage :global(picture) {
		width: 100%;
		border-radius: 8px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
	}

	.leadImage :global(picture img) {
		width: 100%;
		height: auto;
		display: block;
	}

	h2 {
		margin-top: 1.75rem;
	}

	a {
		color: #8a0000;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
