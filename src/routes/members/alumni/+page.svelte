<script lang="ts">
	import Member from '$lib/components/Member.svelte';
	// import photo from '$lib/assets/WR/ChatGPT_Image_4_15_2025.png';

	// Alumni members data
	const members: {
		name: string;
		picture: string;
		subteams: string[];
		major: string;
		years: string;
		about: string;
	}[] = [];
</script>

<main class="members-page">
	<header class="page-header">
		<h1>Alumni</h1>
		<p class="lede">Honoring past team members who helped build the foundation of Wazzu Racing.</p>

		<section id="comingsoon">
			<h2>Coming soon - we're working to show our alumni here</h2>
		</section>
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
