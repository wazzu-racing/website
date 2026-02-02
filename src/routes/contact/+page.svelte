<script>
	import { Heading, P, List, Li } from 'flowbite-svelte';
</script>

<svelte:head>
	<title>Contact — Wazzu Racing</title>
	<meta
		name="description"
		content="Contact Wazzu Racing — reach out for recruitment, sponsorship, or general inquiries."
	/>
</svelte:head>

<main class="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
	<Heading tag="h1" class="mb-8 text-4xl font-bold text-gray-900">Contact</Heading>

	<div class="flex flex-col gap-6">
		<P class="text-gray-700">
			Feel free to email us at
			<a href="mailto:wazzu.racing@wsu.edu" class="font-semibold text-red-700 hover:underline">
				wazzu.racing@wsu.edu
			</a>
			for any questions you may have. We'll get back to you as soon as possible.
		</P>

		<div>
			<Heading tag="h2" class="mb-4 text-2xl font-bold text-gray-900">Social Media</Heading>
			<P class="mb-3 text-gray-700">Check out our social media accounts:</P>
			<List tag="ul" class="space-y-2 text-gray-700">
				<Li>
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://www.instagram.com/wazzu_racing"
						class="font-semibold text-red-700 hover:underline"
					>
						@wazzu_racing
					</a>
					on Instagram
				</Li>
				<Li>
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://www.linkedin.com/company/wazzu-racing/"
						class="font-semibold text-red-700 hover:underline"
					>
						wazzu-racing
					</a>
					on LinkedIn
				</Li>
				<Li>
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://github.com/wazzu-racing"
						class="font-semibold text-red-700 hover:underline"
					>
						wazzu-racing
					</a>
					on GitHub
				</Li>
			</List>
		</div>

		<div>
			<Heading tag="h2" class="mb-4 text-2xl font-bold text-gray-900">Join the Club</Heading>
			<P class="text-gray-700">
				If you are a student at WSU and you are interested in joining the club, first
				<a
					href="https://discord.gg/PQjz8bKtX9"
					target="_blank"
					rel="noopener noreferrer"
					class="font-semibold text-red-700 hover:underline"
				>
					join our Discord
				</a>, then come to one of our general meetings (11AM every Saturday, in our
				<a
					href="https://maps.app.goo.gl/JHnJ2f79Gac3HZfU7"
					target="_blank"
					rel="noopener noreferrer"
					class="font-semibold text-red-700 hover:underline"
				>
					shop
				</a>).
			</P>
		</div>
	</div>
</main>
