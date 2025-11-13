<script lang="ts">
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
	let membersDropdownOpen = $state(false);

	function toggleMembersDropdown() {
		membersDropdownOpen = !membersDropdownOpen;
	}

	function closeMembersDropdown() {
		membersDropdownOpen = false;
	}
</script>

<header class="navbar">
	<a href="/" class="active">
		<img id="logo" src="/racing_logo.png" alt="Wazzu Racing's logo" />
	</a>

	<div class="links-right">
		<a href="/about">About</a>
		<div class="dropdown" role="navigation" onmouseleave={closeMembersDropdown}>
			<button
				class="dropdown-toggle"
				onclick={toggleMembersDropdown}
				onmouseenter={() => (membersDropdownOpen = true)}
			>
				Members ▾
			</button>
			{#if membersDropdownOpen}
				<div class="dropdown-menu">
					<a href="/members/current" onclick={closeMembersDropdown}>Current Members</a>
					<a href="/members/alumni" onclick={closeMembersDropdown}>Alumni</a>
				</div>
			{/if}
		</div>
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
				<img
					src="/vcea.png"
					alt="Logo for the Voiland College of Engineering and Architecture"
				/></a
			>
		</div>

		<div id="location">
			<h1>
				Engineering Laboratory<br />900 NE College Ave<br />Pullman, WA 99163
			</h1>
		</div>
	</div>
</footer>

<style>
	.main {
		padding-left: 10%;
		padding-right: 10%;
	}

	.footer {
		background-color: var(--primary-gray);
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
		display: flex;
		align-content: center;
		width: 100%;
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

	#location h1 {
		display: flex;
		align-self: center;
		font-family: Verdana, Arial, Helvetica, sans-serif;
		font-weight: 100;
		font-size: 16px;
		color: var(--secondary-white);
	}

	.navbar {
		background-color: black;
		overflow: visible;
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
		width: 16vw;
	}

	.navbar a:hover {
		color: var(--primary-crimson);
	}

	.navbar a.active {
		background-color: black;
		float: left;
	}

	/* Dropdown styles */
	.dropdown {
		position: relative;
		display: inline-block;
	}

	.dropdown-toggle {
		font-family: Verdana, Arial, Helvetica, sans-serif;
		font-weight: 100;
		background: none;
		border: none;
		color: var(--secondary-white);
		cursor: pointer;
		font-size: 14pt;
		padding: 14px 20px;
		margin: 0;
		display: block;
	}

	.dropdown-toggle:hover {
		color: var(--primary-crimson);
	}

	.dropdown-menu {
		position: absolute;
		top: 100%;
		left: 0;
		background-color: black;
		min-width: 180px;
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
		z-index: 1000;
		display: flex;
		flex-direction: column;
	}

	.dropdown-menu a {
		padding: 12px 20px;
		text-align: left;
		display: block;
		font-size: 14pt;
	}

	.dropdown-menu a:hover {
		background-color: #1a1a1a;
		color: var(--primary-crimson);
	}
</style>
