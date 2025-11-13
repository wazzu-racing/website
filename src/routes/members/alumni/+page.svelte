<script>
	import Member from '$lib/components/Member.svelte';
	import photo from '$lib/assets/WR/ChatGPT_Image_4_15_2025.png';

	// Alumni members data
	const members = [
		{
			name: 'Sarah Chen',
			picture: photo,
			subteams: ['Business and Cost', 'President'],
			major: 'Mechanical Engineering',
			years: '2019–2022',
			about: 'Former team president, now working as a design engineer at Tesla.'
		},
		{
			name: 'Marcus Johnson',
			picture: photo,
			subteams: ['Drivetrain', 'Chief Engineer'],
			major: 'Mechanical Engineering',
			years: '2018–2021',
			about: 'Led technical development for three competition seasons.'
		},
		{
			name: 'Emily Rodriguez',
			picture: photo,
			subteams: ['Aero Composites', 'Aerodynamics'],
			major: 'Aerospace Engineering',
			years: '2020–2023',
			about: "Pioneered the team's first full carbon fiber aero package."
		},
		{
			name: 'David Kim',
			picture: photo,
			subteams: ['Electrical', 'Data Aquisition'],
			major: 'Electrical Engineering',
			years: '2019–2022',
			about: "Developed the team's data acquisition system from the ground up."
		},
		{
			name: 'Rachel Thompson',
			picture: photo,
			subteams: ['Suspension', 'Vehicle Dynamics'],
			major: 'Mechanical Engineering',
			years: '2018–2021',
			about: 'Optimized suspension geometry and setup procedures.'
		},
		{
			name: 'James Wilson',
			picture: photo,
			subteams: ['Engine', 'Powertrain'],
			major: 'Mechanical Engineering',
			years: '2017–2020',
			about: 'Managed engine tuning and reliability testing.'
		},
		{
			name: 'Amanda Lee',
			picture: photo,
			subteams: ['Chassis', 'Safety Lead'],
			major: 'Mechanical Engineering',
			years: '2019–2022',
			about: 'Established safety protocols still used by the team today.'
		},
		{
			name: 'Tyler Brown',
			picture: photo,
			subteams: ['Vehicle Dynamics', 'Driver'],
			isDriver: true,
			major: 'Mechanical Engineering',
			years: '2018–2021',
			about: 'Lead driver for three competition seasons.'
		}
	];
</script>

<main class="members-page">
	<header class="page-header">
		<h1>Alumni</h1>
		<p class="lede">Honoring past team members who helped build the foundation of Wazzu Racing.</p>
	</header>

	<!-- All Alumni -->
	<section aria-label="Alumni members" class="subteam-section">
		<div class="members-grid" role="list" aria-label="Alumni members">
			{#each members as member (member.name)}
				<Member
					role="listitem"
					class="member-card"
					name={member.name}
					picture={member.picture}
					alt={`Photo of ${member.name}`}
					subteams={member.subteams}
					major={member.major}
					years={member.years}
					about={member.about}
				/>
			{/each}
		</div>
	</section>
</main>

<style>
	:global(:root) {
		--page-max-width: 1100px;
		--accent: #e11d48; /* rose-600 */
		--muted: #6b7280; /* gray-500 */
	}

	.members-page {
		max-width: var(--page-max-width);
		margin: 2.5rem auto;
		padding: 0 1rem;
		box-sizing: border-box;
	}

	.page-header {
		text-align: center;
		margin-bottom: 1.5rem;
	}

	h1 {
		font-size: clamp(1.5rem, 2.2vw, 2.2rem);
		margin: 0;
		letter-spacing: -0.02em;
		color: #0f172a;
	}

	.lede {
		margin-top: 0.4rem;
		color: var(--muted);
		font-size: 0.98rem;
	}

	.subteam-section {
		margin-top: 1.75rem;
	}

	/* Responsive grid: larger cards, fewer per row */
	.members-grid {
		display: grid;
		/* increase the minimum column size so each card is larger and fewer fit per row */
		grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
		gap: 1.25rem;
		align-items: start;
		margin-top: 0.5rem;
	}

	/* Make the image area a bit taller on wider screens */
	@media (min-width: 900px) {
		.members-grid {
			gap: 1.25rem;
		}
	}

	/* Small / narrow screens: prefer one card per row so cards stay large and readable */
	@media (max-width: 720px) {
		.members-grid {
			grid-template-columns: 1fr;
			gap: 0.75rem;
		}
		.page-header {
			margin-bottom: 1rem;
		}
	}
</style>
