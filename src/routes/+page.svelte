
<!-- // is this main -->

<script>
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

</script>



<div class=bod>

	<div class=info>

		<h1>Welcome to Wazzu Racing!</h1>

		<p>We're still working on our website, it should be complete soon!</p>

		<p>
			We meet every Saturday at 11 AM in <a href="https://maps.app.goo.gl/15P6iwDgqBRDkxYw6">ELB 9</a>.
			Come see what we're up to!
		</p>

	</div>

	<div class="meetInfo">

		<div class="Join">
			<h1>Join Us</h1>
			<h2>info</h2>
			<p>Meet every Saturday at 11AM in ELB 9</p>

		</div>
		
		<div class="Collage">

		</div>
	</div>


	<div class="contact">
		<h1>FOLLOW US</h1>
		<ul>
			<li>
				<a href="https://www.instagram.com/wazzu_racing/">
					<FontAwesomeIcon icon={faSquareInstagram} />
				</a>
			</li>
			<li>
				<a href="https://x.com/wazzuracing"
					><FontAwesomeIcon icon={faSquareTwitter} /> 
				</a>
			</li>
			<li>
				<a href="mailto:someone@example.com"
					><FontAwesomeIcon icon={faSquareEnvelope} /> 
				</a>
			</li>
			<li>
				<a href="https://www.linkedin.com/company/wazzu-racing/"
					><FontAwesomeIcon icon={faSquareLinkedin} /> 
				</a>
			</li>
		</ul>

	</div>

</div>



<style>

	.meetInfo {

		/* background-color: red; */

	}

	.contact {
		/* display: flex;
		flex-direction:column; */

		align-content:end;
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

	.contact ul li a{
		/* text-decoration: none; */
		font-size: 2.25em;
		color: var(--secondary-white);
	}
</style>



