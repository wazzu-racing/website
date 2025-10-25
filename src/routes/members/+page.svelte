<script>
	import Member from '$lib/components/Member.svelte';
	import photo from '$lib/assets/WR/ChatGPT_Image_4_15_2025.png';
</script>

<div class="container">
	<Member class="hi" name="Calvin" picture={photo} title="Title" />
	<Member name="Calvin" picture={photo} title="Title" />
	<Member name="Calvin" picture={photo} title="Title" />
	<Member name="Calvin" picture={photo} title="Title" />
	<Member name="Calvin" picture={photo} title="Title" />
	<Member name="Calvin" picture={photo} title="Title" />
	<Member name="Calvin" picture={photo} title="Title" />
	<Member name="Calvin" picture={photo} title="Title" />
	<Member name="Calvin" picture={photo} title="Title" />
	<Member name="Calvin" picture={photo} title="Title" />
	<Member name="Calvin" picture={photo} title="Title" />
	<Member name="Calvin" picture={photo} title="Title" />
</div>

<style>
	.container {
		display: flex;
		flex-wrap: wrap;
	}

	.hi {
		color: red;
	}
</style>
