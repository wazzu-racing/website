<script>
	let { picture, name, title } = $props();
</script>

<div class="container">
	<img src={picture} alt={name} />
	<span class="text" id="name">{name}</span><br />
	<span class="text" id="title">{title}</span><br />
</div>

<style>
	.container {
		width: 20%;
		text-align: center;
	}

	.text {
		font-size: 20pt;
	}

	#name {
		font-weight: bold;
	}

	#title {
		font-style: italic;
		font-size: 15pt;
	}

	img {
		width: 100%;
	}
</style>
