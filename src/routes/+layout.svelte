<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { faLocationPin } from '@fortawesome/free-solid-svg-icons';
	import {
		faLinkedin,
		faSquareInstagram,
		faSquareGithub
	} from '@fortawesome/free-brands-svg-icons';
	import { config } from '@fortawesome/fontawesome-svg-core';

	import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS

	config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="navbar">
	<a href="#" class="active">
		<img src="racing_logo.png" alt="Wazzu Racing's logo" />
	</a>

	<div class="links-right">
		<a href="#">About</a>
		<a href="#">Sponsors</a>
		<a href="#">Donate</a>
		<a href="#">Contact</a>
	</div>
</div>

{@render children?.()}

<div class="footer">
	<div id="vcea">
		<a href="https://vcea.wsu.edu/">
			<img src="vcea.png" alt="Logo for the Voiland College of Engineering and Architecture" /></a
		>
	</div>

	<div class="contact">
		<ul>
			<li>
				<a href="https://www.linkedin.com/company/wazzu-racing/"
					><FontAwesomeIcon icon={faLinkedin} /> Wazzu Racing
				</a>
			</li>
			<li>
				<a href="https://www.instagram.com/wazzu_racing/">
					<FontAwesomeIcon icon={faSquareInstagram} /> @wazzu_racing
				</a>
			</li>
		</ul>
		<ul>
			<li>
				<a href="https://github.com/wazzu-racing">
					<FontAwesomeIcon icon={faSquareGithub} /> @wazzu-racing
				</a>
			</li>
			<li>
				<a href="https://maps.app.goo.gl/15P6iwDgqBRDkxYw6">
					<FontAwesomeIcon icon={faLocationPin} /> ELB 9
				</a>
			</li>
		</ul>
	</div>
</div>

<style>
	body {
		margin: 0;
		font-family: Arial, sans-serif;
	}

	.footer {
		background-color: var(--primary-gray);
		padding-top: 17px;
		padding-bottom: 17px;
		padding-left: 2vw;
		padding-right: 2vw;
		display: flex;
	}

	.contact {
		margin-left: auto;
		display: flex;
	}

	.contact ul {
		text-decoration: none;
		list-style-type: none;
		margin: auto 0;
	}

	.contact ul li a {
		text-decoration: none;
		color: var(--secondary-white);
		font-size: 16pt;
	}

	.contact a:hover {
		text-decoration: underline;
	}

	#vcea img {
		width: 20vw;
	}

	.navbar {
		background-color: var(--primary-gray);
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	.links-right {
		margin-left: auto;
		display: flex;
	}

	.navbar a {
		display: block;
		margin: auto 0;
		color: var(--secondary-white);
		text-align: center;
		padding: 14px 20px;
		text-decoration: none;
		font-size: 24pt;
	}

	.navbar a img {
		width: 22vw;
	}

	.navbar a:hover {
		background-color: var(--primary-crimson);
	}

	.navbar a.active {
		background-color: var(--secondary-gray);
		float: left;
	}
</style>
