<!-- // is this main -->

<script>
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
</script>

<div class="bod">
	<div class="info">
		<!-- The video -->
		<video autoplay muted loop>
			<source src="src/lib/assets/carSlideshow.mp4" type="video/mp4" />
		</video>

		<div class="content">
			<h1>Washington State University</h1>
			<h1>Wazzu Racing</h1>
			<p>
				Washington State Univiersity Formuala SAE | Cars Designed Built and Tested by Student
				Engineers
			</p>
		</div>
	</div>

	<!-- could delete this section -->
	<div class="meetInfo">
		<div class="Join">
			<h1>Join Us</h1>
			<h2>
				Formula SAE at Washington State University. Formula-style racing car conceived, designed,
				and fabriacted by students.
			</h2>
			<p>Meet us at ELB 9 every Saturday at 11AM</p>
		</div>

		<div class="Collumn">
			<img src="src/lib/assets/One.jpeg" alt=" " />
			<img src="src/lib/assets/Five.jpeg" alt=" " />
			<img src="src/lib/assets/Nine.jpeg" alt=" " />
			<img src="src/lib/assets/Twelve.jpeg" alt=" " />
		</div>

		<div class="Collumn">
			<img src="src/lib/assets/Two.jpeg" alt=" " />
			<img src="src/lib/assets/Six.jpeg" alt=" " />
			<img src="src/lib/assets/Ten.png" alt=" " />
			<img src="src/lib/assets/Eight.png" alt=" " />
		</div>

		<div class="Collumn">
			<img src="src/lib/assets/Three.jpeg" alt=" " />
			<img src="src/lib/assets/Seven.jpeg" alt=" " />
			<img src="src/lib/assets/Eleven.png" alt=" " />
			<img src="src/lib/assets/Four.png" alt=" " />
		</div>
	</div>
</div>
<!-- could delete this section -->

<div class="contact">
	<h1>FOLLOW US</h1>
	<ul>
		<li>
			<a href="https://www.instagram.com/wazzu_racing/">
				<FontAwesomeIcon icon={faSquareInstagram} />
			</a>
		</li>
		<li>
			<a href="https://x.com/wazzuracing"><FontAwesomeIcon icon={faSquareTwitter} /> </a>
		</li>
		<li>
			<a href="mailto:someone@example.com"><FontAwesomeIcon icon={faSquareEnvelope} /> </a>
		</li>
		<li>
			<a href="https://www.linkedin.com/company/wazzu-racing/"
				><FontAwesomeIcon icon={faSquareLinkedin} />
			</a>
		</li>
	</ul>
</div>

<style>
	.bod {
		display: flex;
		flex-direction: column;
	}

	.info {
		display: flex;
		/* display: relative; */
	}

	.info video {
		min-width: 100%;
		min-height: 100%;
	}

	.content {
		position: absolute;
		width: 100%;

		/* color: var(--secondary-white) */
	}

	.content h1 {
		font-family: Verdana, Arial, Helvetica, sans-serif;
		font-weight: 600;
		font-size: 7em;
		color: var(--secondary-white);
		text-align: center;
	}

	.content p {
		font-family: Verdana, Arial, Helvetica, sans-serif;
		font-weight: 600;
		font-size: 1.5em;
		color: var(--secondary-white);
		text-align: center;
	}

	.meetInfo {
		display: flex;
		width: 100%;
	}

	.Join {
		/* background-color: black; */
		display: flex;
		flex-direction: column;
		width: 30%;
		padding-top: 5px;
		padding-right: 24px;
		padding-bottom: 24px;
		padding-left: 24px;
	}

	.Join h1 {
		font-family: Verdana, Arial, Helvetica, sans-serif;
		font-weight: 600;
		font-size: 5em;
		margin-block-start: 0.67em;
		margin-block-end: 0.67em;
		color: var(--primary-crimson);
	}

	.Join h2 {
		font-family: Verdana, Arial, Helvetica, sans-serif;
		font-weight: 100;
		font-size: 1.7em;
		/* color: var(--secondary-white); */
	}

	.Join p {
		font-family: Verdana, Arial, Helvetica, sans-serif;
		font-weight: 100;
		font-size: 1.5em;
		/* color: var(--secondary-white); */
	}

	.Collage {
		/* background-color: black; */
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		width: 70%;
	}

	.Collumn {
		display: flex;
	}

	.Collumn img {
		width: 22%;

		margin-top: 8px;
		margin-right: 8px;
		margin-bottom: 8px;
		margin-left: 8px;
		/* vertical-align: middle; */
	}

	/**----------------------------------*/

	.contact {
		align-content: end;
		padding-top: 15px;
		padding-bottom: 15px;
		background-color: black;
		width: 100%;
	}

	.contact h1 {
		font-family: Verdana, Arial, Helvetica, sans-serif;
		width: 100%;
		color: var(--secondary-white);
		text-align: center;
		margin-bottom: 40px;
	}

	.contact ul {
		width: 100%;
		display: inline-flex;

		text-decoration: none;
		list-style-type: none;
		justify-content: center;
		margin: auto 0;
		padding-inline-start: 0;
	}

	.contact ul li {
		justify-content: center;
		display: inline-flex;
		text-decoration: none;
		color: var(--secondary-white);
		font-size: 16pt;
	}

	.contact ul li a {
		/* text-decoration: none; */
		font-size: 2.25em;
		color: var(--secondary-white);
	}
</style>
