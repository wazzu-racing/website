<script lang="ts">
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
	import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

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
	<a href="/">
		<img id="logo" src="/racing_logo.png" alt="Wazzu Racing's logo" />
	</a>

	<div class="links-right">
		<a href="/about">About</a>
		<!-- <a href="/cars">Cars</a>
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
		</div> -->
		<!-- <a href="/calendar">Calendar</a> -->
		<!-- TODO Coming soon -->
		<!-- <a href="/sponsors">Sponsors</a> -->
		<a href="/contact">Contact</a>
		<a class="donate" href="/donate">Donate</a>
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

		<div id="social-icons">
			<a
				href="https://www.instagram.com/wazzu_racing"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Instagram"
			>
				<FontAwesomeIcon icon={faInstagram} size="2x" />
			</a>
			<a
				href="https://www.linkedin.com/company/wazzu-racing/"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="LinkedIn"
			>
				<FontAwesomeIcon icon={faLinkedin} size="2x" />
			</a>
			<a
				href="https://github.com/wazzu-racing"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="GitHub"
			>
				<FontAwesomeIcon icon={faGithub} size="2x" />
			</a>
			<a
				href="https://maps.app.goo.gl/JHnJ2f79Gac3HZfU7"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Location"
			>
				<FontAwesomeIcon icon={faLocationDot} size="2x" />
			</a>
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

	#social-icons {
		display: flex;
		align-items: center;
		justify-content: right;
		gap: 24px;
		width: 100%;
	}

	#social-icons a {
		color: var(--secondary-white);
		transition: color 0.3s ease;
	}

	#social-icons a:hover {
		color: var(--primary-crimson);
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
		font-weight: 300;
		display: block;
		margin: auto 14px;
		color: var(--secondary-white);
		text-align: center;
		text-decoration: none;
		font-size: 14pt;
	}

	.navbar a img {
		width: 16vw;
	}

	.navbar a:hover {
		color: var(--primary-crimson);
	}

	/* Dropdown styles */
	.dropdown {
		position: relative;
		display: inline-block;
	}

	.dropdown-toggle {
		font-family: Verdana, Arial, Helvetica, sans-serif;
		font-weight: 300;
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

	#logo {
		/*height: 50%;*/
		height: 6vh;
		width: auto;
		/*position: relative;*/
	}

	.donate {
		background-color: var(--primary-crimson);
		border-radius: 5px;
		padding: 10px;
	}
</style>
