<script>
	import { Carousel, Controls, CarouselIndicators, Heading, P } from 'flowbite-svelte';
	import '@fortawesome/fontawesome-svg-core/styles.css';

	import hero1 from '$lib/assets/WR/30.jpg?url';
	import hero2 from '$lib/assets/WR/4.jpg?url';
	import hero3 from '$lib/assets/WR/5.jpg?url';
	import carImage from '$lib/assets/WR/e.png?enhanced';
	import teamPicture from '$lib/assets/WR/zeppos-team-picture.png?enhanced';

	const images = [
		{ alt: 'Wazzu Racing car in action', src: hero1, title: 'Wazzu Racing' },
		{ alt: 'Formula SAE competition', src: hero2, title: 'Competition' },
		{ alt: 'Team and vehicle', src: hero3, title: 'Our Team' }
	];

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

<!-- Hero Carousel -->
<div class="carousel-container">
	<Carousel {images} duration={7000} imgClass="w-full h-full" style="height: 75vh;">
		<Controls />
		<CarouselIndicators />
	</Carousel>

	<div class="carousel-overlay">
		<div class="max-w-4xl px-6 py-8 text-center text-white">
			<h1 class="mb-4 text-5xl font-bold tracking-wider drop-shadow-lg md:text-6xl lg:text-7xl">
				Wazzu Racing
			</h1>
			<p class="text-xl font-semibold text-white drop-shadow-md md:text-2xl lg:text-3xl">
				Washington State University Formula SAE
			</p>
		</div>
	</div>
</div>

<!-- Main Content -->
<main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
	<!-- About Section -->
	<section id="about" class="mb-12">
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
			<div class="flex flex-col gap-4">
				<Heading tag="h2" class="text-3xl font-bold text-gray-900">About Us</Heading>

				<P class="text-gray-700">
					Wazzu Racing is the Formula SAE team for Washington State University. Every year we design
					and build a race car, then compete against other teams at the Michigan International
					Speedway.
				</P>

				<P class="text-gray-700">
					Formula SAE is a collegiate design competition organized by the Society of Automotive
					Engineers. The competition is based on a formula race car with which students are granted
					the opportunity to design, build, and compete on an international playing field. By
					competing, students are challenged with applying classroom knowledge to real world
					problems that bolster their ability to communicate and work in teams. Leadership roles in
					the team further demand an ever-improving capacity to manage projects and leadership to
					succeed.
				</P>

				<div>
					<a
						href="/about"
						data-sveltekit-preload-data
						class="font-semibold text-red-700 hover:text-red-800 hover:underline"
					>
						Learn more →
					</a>
				</div>
			</div>

			<div>
				<enhanced:img
					src={teamPicture}
					alt="The Wazzu Racing team with the car"
					sizes="(min-width: 1024px) 600px, 100vw"
					class="h-auto w-full rounded-lg"
				/>
			</div>
		</div>
	</section>

	<!-- Officers Section -->
	<section id="officers" class="mb-12">
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
			<div class="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg">
				<enhanced:img src={carImage} alt="Wazzu Racing car" class="h-full w-full object-contain" />
			</div>

			<div class="flex flex-col gap-5">
				<div class="flex flex-wrap items-baseline gap-4">
					<Heading tag="h2" class="text-3xl font-bold text-gray-900">Team Leadership</Heading>
					<span class="text-xl font-semibold text-gray-500">2025–2026</span>
				</div>

				<P class="text-gray-700">
					Our officers lead the team through design, fabrication, and competition. They coordinate
					project timelines, manage resources, and ensure technical excellence across all
					subsystems.
				</P>

				<div>
					<Heading tag="h3" class="mb-3 text-xl font-semibold text-gray-900">
						Current Officers
					</Heading>
					<ul class="space-y-2">
						{#each officers as officer (officer.name)}
							<li class="text-gray-700">
								<strong class="font-semibold text-gray-900">
									{officer.name}
									{officer.lastname}
								</strong>
								<span class="text-gray-600"> — {officer.role}</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</section>
</main>

<style>
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
</style>
