<script>
	import Member from '$lib/components/Member.svelte';
	import photo from '$lib/assets/WR/ChatGPT_Image_4_15_2025.png';

	// canonical list of subteams to render sections for (order matters)
	const subteams = [
		'Aero Composites',
		'Business and Cost',
		'Chassis',
		'Cockpit Controls',
		'Data Aquisition',
		'Drivetrain',
		'Electrical',
		'Engine',
		'Suspension',
		'Vehicle Dynamics'
	];

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

	// helper to get members in a given subteam
	/**
	 * Get members for a subteam
	 * @param {string} team - subteam name to filter by
	 * @returns {Array<any>} array of member objects belonging to the subteam
	 */
	const getMembersForSubteam = (team) => members.filter((m) => (m.subteams || []).includes(team));

	// leadership: find specific leadership roles by subteam entries
	const leadershipRoles = ['President', 'Vice President', 'Chief Engineer', 'Safety Lead'];
	const leadership = members.filter((m) =>
		(m.subteams || []).some((r) => leadershipRoles.includes(r))
	);

	// drivers: either flagged by `isDriver` or appear in a subteam that includes 'Driver'
	const drivers = members.filter(
		(m) => m.isDriver || (m.subteams || []).some((s) => /driver/i.test(s))
	);
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

	.subteam-section h2 {
		margin: 0 0 0.5rem 0;
		font-size: 1.125rem;
		color: #0f172a;
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

	/* Tweak the Member card appearance when used here */
	.member-card {
		/* allow the Member component's internal width clamp to work,
		   but make the grid item fill available space */
		width: 100%;
		border-radius: 12px;
		transition:
			transform 160ms ease,
			box-shadow 160ms ease;
		cursor: default;
	}

	.member-card:hover,
	.member-card:focus-within {
		transform: translateY(-4px);
		box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
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

	/* Utility: if you want a highlighted heading */
	.page-header .highlight {
		color: var(--accent);
	}
</style>
