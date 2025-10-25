<script>
	import teamPicture from '$lib/assets/WR/12.jpg';
</script>

<h1>About Us</h1>

<div class="sideBySide">
	<p>
		Wazzu Racing is a Formula SAE team at Washington State University. We compete in a global
		competition with universities around the world to design and build a formula-style race car,
		which we then race. By participating, students are challenged to apply classroom knowledge to
		real-world problems,
	</p>
	<img src={teamPicture} alt="The team posing in front of the car" />
</div>

<style>
	img {
		width: 50%;
	}

	.sideBySide {
		display: flex;
	}

	p {
		text-align: justify;
		margin-right: 5em;
	}
</style>
