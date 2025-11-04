<script>
	import { tick } from 'svelte';

	// Props
	export let picture = '';
	export let name = 'Unnamed';
	/** @type {string[]} */
	export let subteams = [];
	export let alt = '';
	/** @type {string|undefined} */
	export let size = undefined;

	// Derived unique list of subteams to avoid duplicate badges
	$: uniqueSubteams = Array.isArray(subteams) ? [...new Set(subteams)] : [];

	// Profile fields
	export let major = '';
	export let years = '';
	export let about = '';

	// Unique id for aria attributes (per component instance)
	const uid = `member-${Math.random().toString(36).slice(2, 9)}`;

	// Placeholder SVG (inline data URI)
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

	// Modal state
	let open = false;
	let closeButton = /** @type {HTMLButtonElement|null} */ (null);
	let lastActive = /** @type {HTMLElement|null} */ (null);

	// Open modal and move focus into dialog
	export async function openModal() {
		lastActive = document.activeElement instanceof HTMLElement ? document.activeElement : null;
		open = true;
		// wait for DOM to update, then focus close button for accessibility
		await tick();
		closeButton?.focus();
	}

	// Close modal and restore focus
	export function closeModal() {
		open = false;
		if (lastActive && typeof lastActive.focus === 'function') {
			lastActive.focus();
		}
	}

	// Global keyboard handler: close on Escape when open
	/** @param {KeyboardEvent} e */
	function handleKeydown(e) {
		if (e.key === 'Escape' && open) closeModal();
	}

	// Card keyboard interaction: Enter or Space opens modal
	/** @param {KeyboardEvent} e */
	function handleCardKeydown(e) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			openModal();
		}
	}

	// Backdrop click: only close when clicking backdrop itself
	/** @param {MouseEvent} e */
	function handleBackdropClick(e) {
		if (e.target === e.currentTarget) closeModal();
	}
</script>

<!-- Attach global keydown listener at top-level -->
<svelte:window on:keydown={handleKeydown} />

<!-- Member card (clickable, keyboard-accessible) -->
<div
	{...$$restProps}
	class="member"
	role="button"
	tabindex="0"
	aria-label={'Open details for ' + name}
	on:click={openModal}
	on:keydown={handleCardKeydown}
>
	<div class="photo" style={size ? `width:${size};height:${size};` : ''}>
		<img src={imgSrc} alt={imgAlt} loading="lazy" draggable="false" />
	</div>

	<div class="meta">
		<div class="name">{name}</div>
		{#if uniqueSubteams && uniqueSubteams.length}
			<div class="badges">
				{#each uniqueSubteams as s (s)}
					<span class="badge">{s}</span>
				{/each}
			</div>
		{/if}
		<slot />

		<!-- profile button removed: card itself opens the profile on click/keyboard -->
	</div>
</div>

{#if open}
	<!-- Modal backdrop/dialog -->
	<div class="modal-backdrop" role="presentation" on:click={handleBackdropClick}>
		<div class="modal" role="dialog" aria-modal="true" aria-labelledby={`${uid}-title`}>
			<button
				class="modal-close"
				aria-label="Close profile"
				on:click={closeModal}
				bind:this={closeButton}
			>
				×
			</button>

			<div class="modal-body">
				<div class="modal-photo">
					<img src={imgSrc} alt={imgAlt} loading="lazy" draggable="false" />
				</div>

				<div class="modal-info">
					<h2 id={`${uid}-title`} class="modal-name">{name}</h2>
					{#if uniqueSubteams && uniqueSubteams.length}
						<div class="modal-badges">
							{#each uniqueSubteams as s (s)}
								<span class="badge">{s}</span>
							{/each}
						</div>
					{/if}
					{#if major}<div class="modal-field"><strong>Major:</strong> {major}</div>{/if}
					{#if years}<div class="modal-field"><strong>Years in club:</strong> {years}</div>{/if}
					{#if about}<p class="modal-about">{about}</p>{/if}
					<slot name="modal-extra" />
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	:global(:root) {
		--member-bg: #ffffff;
		--member-hover: #fff6f8;
		--member-accent: #a60f2d;
		--member-name: #0f172a;
		--member-title: #4b5563;
	}

	.member {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem;
		gap: 0.75rem;
		width: clamp(220px, 28%, 340px);
		text-align: center;
		color: var(--member-text, #111827);
		background: var(--member-bg);
		border-radius: 12px;
		cursor: pointer;
		outline: none;
		transition:
			transform 180ms ease,
			box-shadow 180ms ease,
			background-color 160ms ease;
		border: 1px solid rgba(15, 23, 42, 0.04);
	}

	.member:hover,
	.member:focus,
	.member:focus-within {
		/* visible highlight: inset accent bar on the left plus lift and background tint */
		box-shadow:
			inset 6px 0 0 0 var(--member-accent),
			0 18px 40px rgba(15, 23, 42, 0.12);
		transform: translateY(-4px);
		background: var(--member-hover);
		outline: none;
	}

	.photo {
		width: 100%;
		aspect-ratio: 1 / 1;
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
		color: var(--member-name);
		overflow-wrap: anywhere;
	}

	.badges {
		margin-top: 0.5rem;
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		justify-content: center;
	}
	.badge {
		background: rgba(166, 15, 45, 0.08);
		color: var(--member-accent, #a60f2d);
		padding: 0.18rem 0.5rem;
		border-radius: 999px;
		font-size: 0.78rem;
		font-weight: 700;
		white-space: nowrap;
	}
	.modal-badges {
		margin-top: 0.5rem;
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	/* Profile button styles removed (button no longer used; card is clickable). */

	/* Modal backdrop and dialog */
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(2, 6, 23, 0.55);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.25rem;
		z-index: 60;
	}

	.modal {
		background: #fff;
		border-radius: 12px;
		max-width: 900px;
		width: 100%;
		box-shadow: 0 16px 40px rgba(2, 6, 23, 0.35);
		position: relative;
		overflow: auto;
		max-height: 90vh;
	}

	.modal-close {
		position: absolute;
		right: 0.5rem;
		top: 0.5rem;
		background: transparent;
		border: none;
		font-size: 1.5rem;
		line-height: 1;
		padding: 0.25rem 0.5rem;
		cursor: pointer;
		color: #374151;
	}

	.modal-body {
		display: flex;
		gap: 1rem;
		padding: 1.25rem;
		align-items: flex-start;
	}

	.modal-photo {
		flex: 0 0 220px;
		border-radius: 10px;
		overflow: hidden;
		box-shadow: 0 6px 18px rgba(2, 6, 23, 0.06);
	}

	.modal-photo img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.modal-info {
		flex: 1 1 auto;
		padding: 0.25rem 0;
	}

	.modal-name {
		margin: 0;
		font-size: 1.125rem;
		font-weight: 800;
		color: var(--member-name);
	}

	.modal-title {
		margin-top: 0.25rem;
		font-size: 0.95rem;
		color: var(--member-title);
		font-style: italic;
	}

	.modal-field {
		margin-top: 0.6rem;
		color: var(--member-name);
		font-size: 0.95rem;
	}

	.modal-about {
		margin-top: 0.75rem;
		color: #374151;
		line-height: 1.55;
		font-size: 0.95rem;
	}

	@media (max-width: 720px) {
		.modal-body {
			flex-direction: column;
		}
		.modal-photo {
			width: 100%;
			flex: 0 0 auto;
		}
	}

	@media (max-width: 640px) {
		.member {
			width: calc(100% - 1rem);
			padding: 0.75rem;
		}
	}

	@media (max-width: 420px) {
		.member {
			width: calc(100% - 1rem);
		}
	}
</style>
