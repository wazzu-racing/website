<script>
	// Props
	export let picture = '';
	export let name = 'Unnamed';
	export let title = '';
	export let alt = '';
	// Optional explicit size (e.g. "180px" or "12rem"). If not provided the component is responsive.
	export let size;

	// Simple inline SVG placeholder (low payload, no external asset required)
	const placeholderSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='400' height='400' fill='none'>
  <rect width='24' height='24' rx='4' fill='%23f6f6f6'/>
  <g stroke='%23c8c8c8' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'>
    <circle cx='12' cy='8' r='3' fill='%23eee'/>
    <path d='M4 20c1.6-4 6-6 8-6s6.4 2 8 6' fill='none'/>
  </g>
</svg>`;
	const placeholder = `data:image/svg+xml;utf8,${encodeURIComponent(placeholderSvg)}`;

	// Derived values
	$: imgSrc = picture || placeholder;
	$: imgAlt = alt || name || 'Member photo';
</script>

<!-- Spread rest props so callers can pass `class`, `id`, event handlers, etc. -->
<div class="member" {...$$restProps} role="group" aria-label={'Member: ' + name}>
	<div class="photo" style={size ? `width:${size};height:${size};` : ''}>
		<img src={imgSrc} alt={imgAlt} loading="lazy" draggable="false" />
	</div>

	<div class="meta">
		<div class="name">{name}</div>
		{#if title}
			<div class="title">{title}</div>
		{/if}
		<!-- consumers can inject extra content (social links, bio, etc.) -->
		<slot />
	</div>
</div>

<style>
	/* Container: responsive card that plays well inside flex/grid parents.
	   Consumers can override sizing by passing a size prop or CSS classes. */
	.member {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem;
		gap: 0.75rem;
		/* increase minimum and maximum to make cards larger and reduce number per row */
		width: clamp(220px, 28%, 340px);
		text-align: center;
		color: var(--member-text, #111827);
		background: transparent;
	}

	/* Photo wraps the image and enforces a square aspect ratio.
	   When `size` prop is provided, an inline style will set width/height. */
	.photo {
		width: 100%;
		aspect-ratio: 1 / 1;
		/* allow larger photos so cards visually appear bigger */
		max-width: 340px;
		overflow: hidden;
		border-radius: 14px;
		background: linear-gradient(180deg, #ffffff, #f3f4f6);
		box-shadow: 0 1px 6px rgba(15, 23, 42, 0.06);
	}

	.photo img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		user-select: none;
		-webkit-user-drag: none;
	}

	.meta {
		width: 100%;
	}

	.name {
		font-weight: 700;
		font-size: 1rem;
		line-height: 1.15;
		color: var(--member-name-color, #0f172a);
		overflow-wrap: anywhere;
	}

	.title {
		margin-top: 0.125rem;
		font-style: italic;
		font-size: 0.875rem;
		color: var(--member-title-color, #4b5563);
	}

	/* Small screens: narrower card so multiple can fit */
	@media (max-width: 640px) {
		.member {
			/* prefer one card per row on small screens so cards remain large and readable */
			width: calc(100% - 1rem);
			padding: 0.75rem;
		}
	}

	@media (max-width: 420px) {
		.member {
			width: calc(100% - 1rem);
		}
	}

	/* Allow callers to more easily override spacing/appearance by applying classes */
	:global(.member) {
	}
</style>
