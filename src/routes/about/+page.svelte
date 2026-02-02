<script>
	import { Heading, P } from 'flowbite-svelte';
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

<main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
	<Heading tag="h1" class="mb-8 text-4xl font-bold text-gray-900">About Us</Heading>

	<!-- First Section -->
	<section class="mb-12">
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
			<div class="flex flex-col gap-4">
				<P class="text-justify text-gray-700">
					Wazzu Racing is a student-led Formula SAE team at Washington State University. Every year
					we design and build a formula-style race car. Then every May we travel to the Michigan
					International Speedway to compete against 119 other universities in a variety of events.
				</P>

				<P class="text-justify text-gray-700">
					In addition to building a car, students on the team learn valuable skills — from CAD to
					aerodynamics to vehicle suspension — that will be useful later in life. In addition to
					applying what they learn in class, students have to go above and beyond to learn new
					skills, while also gaining hands-on experience in exactly what it takes to create an
					entire racecar.
				</P>

				<P class="text-justify text-gray-700">
					Currently ranked 60th out of the 120 teams that competed in Michigan 2025, we are
					continually striving to improve our team and car. Since 2023, we have improved our score
					by 280 points, and moved up 58 places in competition.
				</P>
			</div>

			<div class="flex items-center justify-center">
				<enhanced:img
					src={fastCar}
					alt="Wazzu Racing car on track"
					sizes="(min-width: 1024px) 500px, 100vw"
					class="h-auto w-full rounded-lg"
				/>
			</div>
		</div>
	</section>

	<!-- Second Section -->
	<section class="mb-12">
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
			<div class="flex flex-col items-center justify-center">
				<figure class="w-full">
					<enhanced:img
						src={teamPicture}
						alt="Wazzu Racing team posing in front of the car"
						sizes="(min-width: 1024px) 500px, 100vw"
						class="h-auto w-full rounded-lg"
					/>
					<figcaption class="mt-2 text-center text-sm text-gray-600">
						The team with the car at competition in 2025
					</figcaption>
				</figure>
			</div>

			<div class="flex flex-col gap-4">
				<Heading tag="h2" class="text-2xl font-bold text-gray-900">Our Members</Heading>
				<P class="text-justify text-gray-700">
					Wazzu Racing is made up of more than 50 students of diverse backgrounds and experiences,
					joined together by a passion for motorsports. We have ten subteams covering all aspects of
					the car, with students in many different majors, including business, communication,
					engineering, and more. Members are encouraged to branch out and take on multifaceted
					projects that cover a wide range of skills and expose them to new ideas.
				</P>
			</div>
		</div>
	</section>

	<!-- Contact Section -->
	<section>
		<div class="rounded-lg bg-gray-50 p-6">
			<Heading tag="h2" class="mb-4 text-2xl font-bold text-gray-900">Contact</Heading>
			<P class="text-gray-700">
				For recruitment, sponsorship, or general inquiries:
				<a href="mailto:wazzu.racing@wsu.edu" class="font-semibold text-red-700 hover:underline">
					wazzu.racing@wsu.edu
				</a>. For more information, see our
				<a
					href="/contact"
					data-sveltekit-preload-data
					class="font-semibold text-red-700 hover:underline"
				>
					contact page
				</a>.
			</P>
		</div>
	</section>
</main>
