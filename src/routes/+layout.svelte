<script lang="ts">
	import './layout.css';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Footer } from 'flowbite-svelte';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
	import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

	let { children } = $props();
</script>

<Navbar class="bg-black px-4 py-2.5" fluid={true}>
	<NavBrand href="/">
		<img src="/racing_logo.png" class="h-12 w-auto" alt="Wazzu Racing Logo" />
	</NavBrand>
	<NavHamburger class="text-white hover:text-red-700 md:hidden" />
	<NavUl class="order-1 ml-auto bg-black md:order-0 md:space-x-4 md:bg-transparent">
		<NavLi
			href="/about"
			class="cursor-pointer text-xl text-white hover:text-red-700 md:py-0"
			active={false}>About</NavLi
		>
		<NavLi
			href="/contact"
			class="cursor-pointer text-xl text-white hover:text-red-700 md:py-0"
			active={false}>Contact</NavLi
		>
		<NavLi
			href="/shop"
			class="cursor-pointer text-xl text-white hover:text-red-700 md:py-0"
			active={false}>Shop</NavLi
		>
		<NavLi href="/donate" class="cursor-pointer md:py-0" active={false}>
			<span class="rounded-md bg-red-700 px-4 py-2 text-xl text-white hover:bg-red-800">Donate</span
			>
		</NavLi>
	</NavUl>

</Navbar>

<main class="px-[10%]">{@render children?.()}</main>

<Footer class="bg-gray-800">
	<div class="flex w-full flex-col items-center justify-between gap-6 px-8 py-6 sm:flex-row">
		<div class="flex items-center">
			<a href="https://vcea.wsu.edu/" target="_blank" rel="noopener noreferrer">
				<img
					src="/vcea.png"
					alt="Voiland College of Engineering and Architecture"
					class="h-auto w-48 sm:w-64"
				/>
			</a>
		</div>

		<div class="flex items-center gap-6">
			<a
				href="https://www.instagram.com/wazzu_racing"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Instagram"
				class="text-white transition-colors hover:text-red-700"
			>
				<FontAwesomeIcon icon={faInstagram} size="2x" />
			</a>

			<a
				href="https://www.linkedin.com/company/wazzu-racing/"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="LinkedIn"
				class="text-white transition-colors hover:text-red-700"
			>
				<FontAwesomeIcon icon={faLinkedin} size="2x" />
			</a>

			<a
				href="https://github.com/wazzu-racing"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="GitHub"
				class="text-white transition-colors hover:text-red-700"
			>
				<FontAwesomeIcon icon={faGithub} size="2x" />
			</a>

			<a
				href="https://maps.app.goo.gl/JHnJ2f79Gac3HZfU7"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Location"
				class="text-white transition-colors hover:text-red-700"
			>
				<FontAwesomeIcon icon={faLocationDot} size="2x" />
			</a>
		</div>
	</div>
</Footer>
