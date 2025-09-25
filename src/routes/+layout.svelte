<script lang="ts">
	import '../../static/global.css';
	import favicon from '$lib/assets/favicon.svg';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { faEnvelope, faLocationPin, faSquareEnvelope } from '@fortawesome/free-solid-svg-icons';
	import {
		faLinkedin,
		faSquareInstagram,
		faSquareGithub,

		faSquareTwitter,

		faSquareLinkedin


	} from '@fortawesome/free-brands-svg-icons';
	import { config } from '@fortawesome/fontawesome-svg-core';

	import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS

	config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

	let { children } = $props();




</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header class="navbar">
	<a href="/" class="active">
		<img src="racing_logo.png" alt="Wazzu Racing's logo" />
	</a>

	<div class="links-right">
		<a href="/about">About</a>
		<a href="/calendar">Calendar</a>
		<a href="/sponsors">Sponsors</a>
		<a href="/donate">Donate</a>
		<a href="/contact">Contact</a>
	</div>
</header>

<main class="main">
	{@render children?.()}
</main>

<footer class="footer">

	<div class="college">

		<div id="vcea">
			<a href="https://vcea.wsu.edu/">
			<img src="vcea.png" alt="Logo for the Voiland College of Engineering and Architecture" /></a>
		</div>

		<div id=location>
			<h1>
				Engineering Laboratory<br>900 NE College Ave<br>Pullman, WA 99163
			</h1>

		</div>

	</div>

</footer>

<style>

	/* .main {
		background-color: black;
	} */
	.footer {
		background-color: var(--primary-gray);
		/* padding-top: 15px;
		padding-bottom: 15px;
		padding-left: 2vw;
		padding-right: 2vw; */
		display: flex;
		flex-direction: column;
	}

	.college {
		padding-top: 15px;
		padding-bottom: 15px;
		padding-left: 2vw;
		padding-right: 2vw;
		display: flex;
	}

	#vcea {
		display:flex;
		align-content: center;
		width:100%;

	}

	#vcea img {
		display: flex;
		align-content: center;
		justify-content: center;
		width: 20vw;
	}

	#location {
		display: flex;
		align-content: center;
		justify-content: right;
		width: 100%;
	}

	#location h1{
		display: flex;
		align-self: center;
		font-family: Verdana, Arial, Helvetica, sans-serif;
		font-weight: 100;
		font-size: 16px;
		color: var(--secondary-white);
	}

	.navbar {
		background-color: black;
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
		font-family: Verdana, Arial, Helvetica, sans-serif;
		font-weight: 100;
		display: block;
		margin: auto 0;
		color: var(--secondary-white);
		text-align: center;
		padding: 14px 20px;
		text-decoration: none;
		font-size: 14pt;
	}

	.navbar a img {
		width: 22vw;
	}

	.navbar a:hover {
		color: var(--primary-crimson);
	}

	.navbar a.active {

		background-color: black;
		float: left;
	}

	
</style>
