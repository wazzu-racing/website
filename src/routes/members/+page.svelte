<script>
	import Member from '$lib/components/Member.svelte';
	import photo from '$lib/assets/WR/ChatGPT_Image_4_15_2025.png';

	// Replace or extend this array with real member data (e.g. fetched from a CMS or API)
	const members = [
		{ name: 'Calvin', title: 'Team Lead', picture: photo },
		{ name: 'Ava', title: 'Aerodynamics', picture: photo },
		{ name: 'Jordan', title: 'Powertrain', picture: photo },
		{ name: 'Maya', title: 'Chassis', picture: photo },
		{ name: 'Liam', title: 'Electronics', picture: photo },
		{ name: 'Ethan', title: 'Suspension', picture: photo },
		{ name: 'Sophia', title: 'Manufacturing', picture: photo },
		{ name: 'Noah', title: 'Strategy', picture: photo },
		{ name: 'Olivia', title: 'Logistics', picture: photo },
		{ name: 'Lucas', title: 'Dynamics', picture: photo },
		{ name: 'Isabella', title: 'CAD Lead', picture: photo },
		{ name: 'Mason', title: 'Testing', picture: photo }
	];
</script>

<main class="members-page">
	<header class="page-header">
		<h1>Team Members</h1>
		<p class="lede">
			Meet the students who design, build, and race our Formula SAE car. Click a card for more info
			(coming soon).
		</p>
	</header>

	<section class="members-grid" role="list" aria-label="Wazzu Racing team members">
		{#each members as member (member.name + member.title)}
			<Member
				role="listitem"
				class="member-card"
				name={member.name}
				title={member.title}
				picture={member.picture}
				alt={`Photo of ${member.name}`}
			/>
		{/each}
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

	/* Responsive grid: larger cards, fewer per row */
	.members-grid {
		display: grid;
		/* increase the minimum column size so each card is larger and fewer fit per row */
		grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
		gap: 1.25rem;
		align-items: start;
		margin-top: 1rem;
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
