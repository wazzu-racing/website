<script>
	import Member from '$lib/components/Member.svelte';
	// import photo from '$lib/assets/WR/ChatGPT_Image_4_15_2025.png';
	import photo from '$lib/assets/WR/profile.svg';

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

	const members = [
		{
			name: 'Malcom',
			picture: photo,
			subteams: ['Business and Cost', 'President'],
			major: 'IDK',
			years: 'IDK',
			about: 'TBD'
		},
		{
			name: 'Carson',
			picture: photo,
			subteams: ['Business and Cost', 'Data Aquisition', 'Vice President'],
			major: 'Electrical Engineering',
			years: 'IDK',
			about: 'TBD'
		},
		{
			name: 'Blake',
			picture: photo,
			subteams: ['Data Aquisition'],
			major: 'Computer Science',
			years: 'IDK',
			about: 'TBD'
		},
		{
			name: 'Calvin',
			picture: photo,
			subteams: ['Data Aquisition', 'Vehicle Dynamics'],
			years: 'IDK',
			about: 'TBD'
		}
	];

	// Replace or extend this array with real member data (e.g. fetched from a CMS or API).
	// Each member can belong to multiple subteams by listing them in `subteams`.
	// Note: titles have been removed as top-level fields and are instead included in the `subteams` array.
	const oldMembers = [
		{
			name: 'Malcom',
			picture: photo,
			// moved title into subteams
			subteams: ['Business and Cost', 'President'],
			major: 'Mechanical Engineering',
			years: '2022–2025',
			about: 'Leads the team and coordinates project timelines, sponsorship, and outreach.'
		},
		{
			name: 'Calvin',
			picture: photo,
			subteams: ['Data Aquisition', 'Vehicle Dynamics'],
			major: 'Computer Science',
			years: '2025-2025',
			about: 'Collects and analyses data from car sensors to provide data for other subteams.'
		},
		{
			name: 'Ava',
			picture: photo,
			subteams: ['Aero Composites', 'Vehicle Dynamics', 'Aerodynamics'],
			major: 'Aerospace Engineering',
			years: '2023–2025',
			about: 'Focuses on aero package design and CFD validation for the car.'
		},
		{
			name: 'Jordan',
			picture: photo,
			subteams: ['Drivetrain', 'Engine', 'Powertrain'],
			major: 'Mechanical Engineering',
			years: '2021–2024',
			about: 'Works on powertrain integration, gear ratios, and reliability testing.'
		},
		{
			name: 'Maya',
			picture: photo,
			subteams: ['Chassis', 'Cockpit Controls', 'Chassis'],
			major: 'Mechanical Engineering',
			years: '2022–2024',
			about: 'Designs chassis components and ensures driver ergonomics and safety.'
		},
		{
			name: 'Liam',
			picture: photo,
			subteams: ['Electrical', 'Data Aquisition', 'Electronics'],
			major: 'Electrical Engineering',
			years: '2023–2025',
			about: 'Handles wiring, sensors, and data acquisition systems.'
		},
		{
			name: 'Ethan',
			picture: photo,
			subteams: ['Suspension', 'Vehicle Dynamics', 'Suspension'],
			major: 'Mechanical Engineering',
			years: '2022–2025',
			about: 'Responsible for suspension geometry, setup, and testing.'
		},
		{
			name: 'Sophia',
			picture: photo,
			subteams: ['Manufacturing', 'Chassis', 'Safety Lead'],
			major: 'Industrial Engineering',
			years: '2021–2024',
			about: 'Maintains safety procedures, PPE, and workshop safety training.'
		},
		{
			name: 'Noah',
			picture: photo,
			subteams: ['Business and Cost', 'Data Aquisition', 'Vice President'],
			major: 'Business Administration',
			years: '2022–2025',
			about: 'Oversees budgeting, cost reports, and business outreach.'
		},
		{
			name: 'Olivia',
			picture: photo,
			subteams: ['Business and Cost', 'Logistics'],
			major: 'Supply Chain Management',
			years: '2023–2025',
			about: 'Manages parts logistics, inventory, and event planning.'
		},
		{
			name: 'Lucas',
			picture: photo,
			subteams: ['Vehicle Dynamics', 'Driver'],
			isDriver: true,
			major: 'Mechanical Engineering',
			years: '2021–2024',
			about: 'Primary test driver and assists with vehicle dynamics testing.'
		},
		{
			name: 'Isabella',
			picture: photo,
			subteams: ['Aero Composites', 'Chassis', 'CAD Lead'],
			major: 'Mechanical Engineering',
			years: '2023–2025',
			about: 'Leads CAD workflows and ensures manufacturability of parts.'
		},
		{
			name: 'Mason',
			picture: photo,
			subteams: ['Drivetrain', 'Engine', 'Electrical', 'Chief Engineer'],
			major: 'Mechanical Engineering',
			years: '2020–2024',
			about: 'Responsible for overall technical direction and integration across subsystems.'
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
		<h1>Current Team Members</h1>
		<p class="lede">
			Meet the students who design, build, and race our Formula SAE car. Click a card for more info.
		</p>
	</header>

	<!-- Leadership section -->
	<section aria-label="Team leadership" class="subteam-section">
		<h2>Leadership</h2>
		<p class="lede">President, Vice President, Chief Engineer, and Safety Lead</p>
		<div class="members-grid" role="list" aria-label="Leadership members">
			{#each leadership as member (member.name + (member.subteams || []).join('-'))}
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

	<!-- Drivers section -->
	<section aria-label="Drivers" class="subteam-section">
		<h2>Drivers</h2>
		<div class="members-grid" role="list" aria-label="Drivers">
			{#each drivers as member (member.name)}
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

	<!-- Subteam sections -->
	{#each subteams as team (team)}
		<section aria-label={team} class="subteam-section">
			<h2>{team}</h2>
			<div class="members-grid" role="list" aria-label={`Members of ${team}`}>
				{#each getMembersForSubteam(team) as member (member.name + team)}
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
				{#if getMembersForSubteam(team).length === 0}
					<p class="lede">No members listed for this subteam yet.</p>
				{/if}
			</div>
		</section>
	{/each}
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
		margin: 0;
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
