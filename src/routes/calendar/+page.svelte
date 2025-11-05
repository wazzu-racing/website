<script>
	// @ts-nocheck
	// Removed invalid import from Svelte runtime.
	// All DOM access is guarded so this file is safe for SSR.

	// Canonical events list — edit this array to add/update events shown on the public calendar.
	// Each event has: id, title, date (ISO YYYY-MM-DD), time (HH:MM 24h optional), location, description, optional url, tags
	let calendarEvents = [
		{
			id: 'e1',
			title: 'Interest Meeting — Fall Recruitment',
			date: '2025-09-03',
			time: '18:00',
			location: 'Engineering Lab (Room 210)',
			description:
				'Introductory meeting for new and returning students. Learn about subteams, time commitments, and how to get involved.',
			url: '/contact',
			tags: ['recruitment', 'meeting']
		},
		{
			id: 'e2',
			title: 'Shop Night — Fabrication Session',
			date: '2025-09-09',
			time: '17:30',
			location: 'Wazzu Racing Shop',
			description:
				'Open build session. Bring closed-toe shoes and safety glasses. All majors welcome.',
			tags: ['build', 'workshop']
		},
		{
			id: 'e3',
			title: 'Community Outreach — High School Demo',
			date: '2025-10-02',
			time: '10:00',
			location: 'Pullman High School Gym',
			description:
				'Our outreach team will present the car and talk about engineering opportunities to local high school students.',
			tags: ['outreach', 'demo']
		},
		{
			id: 'e4',
			title: 'Regional Competition — Prep & Departure',
			date: '2025-05-12',
			time: '08:00',
			location: 'Meet at Engineering Lab',
			description:
				'Final packing and caravan to the regional competition. All present-day team members are expected to attend.',
			url: null,
			tags: ['competition']
		},
		{
			id: 'e5',
			title: 'Autumn Public Shop Night',
			date: '2025-11-20',
			time: '18:00',
			location: 'Engineering Laboratory — Shop Area',
			description:
				'Public shop night with guided tours of the current car and Q&A with subteam leads. All majors welcome.',
			tags: ['shop', 'public']
		},
		{
			id: 'e6',
			title: 'Community STEM Day — Demo & Talk',
			date: '2025-12-05',
			time: '11:00',
			location: 'Campus Quad',
			description:
				'Wazzu Racing demo vehicle on display with short presentation about engineering pathways and team roles.',
			tags: ['outreach', 'demo']
		},
		{
			id: 'e7',
			title: 'Winter Design Review (Open Session)',
			date: '2026-01-15',
			time: '16:30',
			location: 'Engineering Lecture Hall 204',
			description:
				'An open walkthrough of our winter design progress; good opportunity for prospective members to see technical work.',
			tags: ['review', 'meeting']
		}
	];

	// derive a sorted copy of events (soonest first)
	const events = calendarEvents
		.slice()
		.sort((a, b) => {
			if (a.date === b.date) return (a.time || '').localeCompare(b.time || '');
			return a.date.localeCompare(b.date);
		})
		.map((e) => {
			// attach a Date object for convenience (use local timezone)
			const iso = e.date + (e.time ? 'T' + e.time : 'T00:00');
			return { ...e, dateObj: new Date(iso) };
		});

	// Utility: user-facing date formatting
	const formatDate = (d) => {
		if (!d) return '';
		const opts = { year: 'numeric', month: 'short', day: 'numeric' };
		return d.toLocaleDateString(undefined, opts);
	};

	// Format HH:MM 24h into a localized time string.
	const formatTime = (t) => {
		if (!t) return '';
		const [hhStr, mmStr] = t.split(':');
		const hh = Number(hhStr) || 0;
		const mm = Number(mmStr) || 0;
		// Use today's date and set hours/minutes so toLocaleTimeString formats correctly.
		// create a date for formatting without mutating a previously-constructed date
		const dt = new Date(1970, 0, 1, hh, mm, 0, 0);
		return dt.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
	};

	const today = new Date();

	// Start-of-day helper to compare dates ignoring time
	function startOfDay(d) {
		return new Date(d.getFullYear(), d.getMonth(), d.getDate());
	}

	// Convenience filters for "upcoming" and "past"
	const upcoming = events.filter((e) => e.dateObj >= startOfDay(today));
	const past = events.filter((e) => e.dateObj < startOfDay(today));

	// Modal state
	/** @type {any|null} */
	let selectedEvent = null;
	/** @type {HTMLElement|null} */
	let lastFocusedElement = null;

	// Open modal for an event: store previously focused element and then set selectedEvent
	/**
	 * @param {any} eventObj
	 * @param {HTMLElement|null} triggeringElement
	 */
	function openModal(eventObj, triggeringElement) {
		selectedEvent = eventObj;
		// Guard DOM access for SSR
		if (typeof document !== 'undefined') {
			lastFocusedElement = triggeringElement || document.activeElement;
			// wait for modal to render then focus the close button
			if (typeof window !== 'undefined') {
				setTimeout(() => {
					const closeBtn = document.querySelector('.modal-close');
					if (closeBtn && typeof closeBtn.focus === 'function') closeBtn.focus();
				});
			}
			// prevent page scroll while modal is open
			document.body.style.overflow = 'hidden';
		} else {
			lastFocusedElement = null;
		}
	}

	// Close modal and restore focus
	function closeModal() {
		selectedEvent = null;
		// Guard DOM access for SSR
		if (typeof document !== 'undefined') {
			if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
				lastFocusedElement.focus();
			}
			document.body.style.overflow = '';
		}
		lastFocusedElement = null;
	}

	// Click/keyboard handlers for cards to open modal
	/**
	 * @param {KeyboardEvent} e
	 * @param {any} ev
	 */
	function onCardKeydown(e, ev) {
		// open modal on Enter or Space
		if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
			e.preventDefault();
			openModal(ev, e.currentTarget);
		}
	}

	// Handle Escape and focus trapping while modal open
	/**
	 * @param {KeyboardEvent} e
	 */
	function handleWindowKeydown(e) {
		// Only act when a modal is open
		if (!selectedEvent) return;
		if (e.key === 'Escape') {
			e.preventDefault();
			closeModal();
			return;
		}
		// Simple focus trap: cycle focus within modal
		if (e.key === 'Tab') {
			// Guard DOM access for SSR
			if (typeof document === 'undefined') return;
			const modal = document.querySelector('.modal-dialog');
			if (!modal) return;
			const focusables = modal.querySelectorAll(
				'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
			);
			const focusArr = Array.from(focusables).filter((el) => el.offsetParent !== null);
			if (focusArr.length === 0) {
				e.preventDefault();
				return;
			}
			const first = focusArr[0];
			const last = focusArr[focusArr.length - 1];
			if (e.shiftKey) {
				if (document.activeElement === first) {
					e.preventDefault();
					last.focus();
				}
			} else {
				if (document.activeElement === last) {
					e.preventDefault();
					first.focus();
				}
			}
		}
	}

	// Programmatic navigation helper used by CTA buttons. Guards for SSR.
	function navigateTo(url) {
		if (!url) return;
		if (typeof window !== 'undefined') {
			// Use assign so the back button behaves as expected
			window.location.assign(url);
		}
	}
</script>

<svelte:head>
	<title>Calendar — Wazzu Racing</title>
	<meta
		name="description"
		content="Wazzu Racing public events calendar: meetings, shop nights, outreach, and competitions."
	/>
</svelte:head>

<!-- global key handler for Escape and Tab trapping -->
<svelte:window on:keydown={handleWindowKeydown} />

<main class="container calendar-page" aria-live="polite">
	<header class="page-header">
		<h1>Calendar</h1>
		<p class="lede">
			Public events, meetings, and competition dates. Click an event to view more details.
		</p>
	</header>

	<section aria-label="Upcoming events" class="events-section">
		<h2>Upcoming</h2>
		{#if upcoming.length > 0}
			<div class="events-grid" role="list">
				{#each upcoming as event (event.id)}
					<article role="listitem">
						<button
							class="event-button event-card clickable"
							aria-labelledby={'title-' + event.id}
							on:click={(e) => openModal(event, e.currentTarget)}
							on:keydown={(e) => onCardKeydown(e, event)}
						>
							<div class="event-top">
								<div class="event-date">
									<span class="event-month"
										>{event.dateObj.toLocaleString(undefined, { month: 'short' })}</span
									>
									<span class="event-day">{event.dateObj.getDate()}</span>
								</div>
								<div class="event-head">
									<h3 id={'title-' + event.id}>{event.title}</h3>
									<div class="event-meta">
										<time datetime={event.date + (event.time ? 'T' + event.time : '')}>
											{formatDate(event.dateObj)}{event.time ? ' · ' + formatTime(event.time) : ''}
										</time>
										<span class="sep">•</span>
										<span class="location">{event.location}</span>
									</div>
								</div>
							</div>

							<div class="event-body">
								<p class="description">{event.description}</p>
							</div>

							<footer class="event-footer">
								<div class="tags">
									{#each event.tags ?? [] as tag (tag)}
										<span class="tag">{tag}</span>
									{/each}
								</div>
							</footer>
						</button>
					</article>
				{/each}
			</div>
		{:else}
			<p class="lede">
				No upcoming events listed. Check back later or contact the team to find out about joining.
			</p>
		{/if}
	</section>

	<section aria-label="Past events" class="events-section">
		<h2>Past</h2>
		{#if past.length > 0}
			<div class="events-grid small-cards" role="list">
				{#each past as event (event.id)}
					<article role="listitem">
						<button
							class="event-button event-card past clickable"
							aria-labelledby={'title-p-' + event.id}
							on:click={(e) => openModal(event, e.currentTarget)}
							on:keydown={(e) => onCardKeydown(e, event)}
						>
							<div class="event-top">
								<div class="event-date compact">
									<span class="event-month"
										>{event.dateObj.toLocaleString(undefined, { month: 'short' })}</span
									>
									<span class="event-day">{event.dateObj.getDate()}</span>
								</div>
								<div class="event-head">
									<h3 id={'title-p-' + event.id}>{event.title}</h3>
									<div class="event-meta">
										<time datetime={event.date + (event.time ? 'T' + event.time : '')}>
											{formatDate(event.dateObj)}{event.time ? ' · ' + formatTime(event.time) : ''}
										</time>
										<span class="sep">•</span>
										<span class="location">{event.location}</span>
									</div>
								</div>
							</div>
						</button>
					</article>
				{/each}
			</div>
		{:else}
			<p class="lede">No past events are recorded yet.</p>
		{/if}
	</section>
</main>

<!-- Modal: rendered only when selectedEvent is set -->
{#if selectedEvent}
	<div class="modal-overlay" role="presentation" on:click|self={closeModal}>
		<div
			class="modal-dialog"
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
			aria-describedby="modal-desc"
		>
			<header class="modal-header">
				<h2 id="modal-title">{selectedEvent.title}</h2>
				<button class="modal-close" aria-label="Close dialog" on:click={closeModal}>
					&times;
				</button>
			</header>

			<div class="modal-content">
				<div class="modal-meta">
					<time
						datetime={selectedEvent.date + (selectedEvent.time ? 'T' + selectedEvent.time : '')}
					>
						{formatDate(selectedEvent.dateObj)}
						{selectedEvent.time ? ' · ' + formatTime(selectedEvent.time) : ''}
					</time>
					<span class="sep">•</span>
					<span class="location">{selectedEvent.location}</span>
				</div>

				<p id="modal-desc" class="modal-desc">{selectedEvent.description}</p>

				{#if selectedEvent.tags && selectedEvent.tags.length}
					<div class="modal-tags">
						{#each selectedEvent.tags as t, i (i)}
							<span class="tag">{t}</span>
						{/each}
					</div>
				{/if}

				{#if selectedEvent.url}
					<p class="modal-actions">
						<button type="button" class="cta" on:click={() => navigateTo(selectedEvent.url)}
							>More details</button
						>
					</p>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	:global(:root) {
		--page-max-width: 1100px;
		--accent: #e11d48; /* matches about/members pages */
		--muted: #6b7280;
		--card-bg: #fff;
	}

	.container {
		max-width: var(--page-max-width);
		margin: 2rem auto;
		padding: 0 1rem;
		box-sizing: border-box;
	}

	.page-header {
		text-align: left;
		margin-bottom: 1rem;
	}

	h1 {
		font-size: clamp(1.4rem, 2.2vw, 2rem);
		margin: 0;
		letter-spacing: -0.02em;
		color: #0f172a;
	}

	.lede {
		margin-top: 0.4rem;
		color: var(--muted);
		font-size: 0.98rem;
	}

	.events-section {
		margin-top: 1.25rem;
	}

	.events-section h2 {
		margin: 0 0 0.5rem 0;
		font-size: 1.125rem;
		color: #0f172a;
	}

	.events-grid {
		display: grid;
		/* Stack cards vertically (one per row) for both upcoming and past sections */
		grid-template-columns: 1fr;
		gap: 1rem;
		margin-top: 0.6rem;
	}

	/* smaller, tighter cards for past events section (stacked vertically as well) */
	.events-grid.small-cards {
		grid-template-columns: 1fr;
	}

	.event-card {
		background: var(--card-bg);
		border-radius: 10px;
		padding: 12px;
		box-shadow: 0 6px 18px rgba(10, 10, 10, 0.04);
		border: 1px solid rgba(15, 23, 42, 0.04);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		transition:
			transform 160ms ease,
			box-shadow 160ms ease;
	}

	.event-button {
		border: 0;
		background: transparent;
		padding: 0;
		text-align: left;
		width: 100%;
		cursor: pointer;
	}
	.event-button:focus {
		outline: 3px solid rgba(225, 29, 72, 0.15);
		outline-offset: 3px;
		border-radius: 10px;
	}

	.clickable {
		cursor: pointer;
	}

	/* keep the visual focus styles for non-button elements, but avoid double outlines */
	.clickable:focus {
		outline: none;
	}

	.event-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 30px rgba(10, 10, 10, 0.06);
	}

	.event-top {
		display: flex;
		gap: 12px;
		align-items: center;
	}

	.event-date {
		width: 64px;
		min-width: 64px;
		background: linear-gradient(180deg, rgba(225, 29, 72, 0.06), rgba(225, 29, 72, 0.02));
		border-radius: 8px;
		text-align: center;
		padding: 6px 4px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.event-date.compact {
		width: 52px;
		min-width: 52px;
		padding: 4px 4px;
	}

	.event-month {
		font-size: 0.8rem;
		color: var(--muted);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.event-day {
		font-size: 1.25rem;
		font-weight: 600;
		color: #111827;
		line-height: 1;
	}

	.event-head h3 {
		margin: 0;
		font-size: 1.05rem;
	}

	.event-meta {
		margin-top: 0.3rem;
		color: var(--muted);
		font-size: 0.9rem;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.event-meta .location {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 160px;
	}

	.sep {
		color: #e6e6e6;
	}

	.event-body {
		margin-top: 0.8rem;
		flex: 1 1 auto;
	}

	.description {
		margin: 0;
		color: #111827;
		font-size: 0.95rem;
	}

	.event-footer {
		margin-top: 0.9rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
	}

	.tags {
		display: flex;
		gap: 6px;
		flex-wrap: wrap;
	}

	.tag {
		background: rgba(15, 23, 42, 0.06);
		color: #0f172a;
		padding: 4px 8px;
		border-radius: 999px;
		font-size: 0.8rem;
	}

	.cta {
		background: var(--accent);
		color: white;
		padding: 6px 10px;
		border-radius: 6px;
		text-decoration: none;
		font-size: 0.9rem;
		white-space: nowrap;
	}

	.event-card.past {
		opacity: 0.92;
		filter: grayscale(0.02);
	}

	/* Modal styles */
	.modal-overlay {
		position: fixed;
		inset: 0;
		background: rgba(3, 7, 18, 0.6);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem 1rem;
		z-index: 1200;
	}

	.modal-dialog {
		background: white;
		border-radius: 10px;
		max-width: 820px;
		width: 100%;
		box-shadow: 0 20px 60px rgba(2, 6, 23, 0.5);
		border: 1px solid rgba(15, 23, 42, 0.06);
		overflow: auto;
		max-height: 90vh;
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: start;
		padding: 1rem 1.25rem;
		border-bottom: 1px solid rgba(15, 23, 42, 0.04);
	}

	.modal-header h2 {
		margin: 0;
		font-size: 1.25rem;
	}

	.modal-close {
		background: transparent;
		border: none;
		font-size: 1.6rem;
		line-height: 1;
		cursor: pointer;
		padding: 6px;
		color: #333;
	}

	.modal-close:focus {
		outline: 3px solid rgba(225, 29, 72, 0.15);
		outline-offset: 3px;
	}

	.modal-content {
		padding: 1rem 1.25rem 1.5rem 1.25rem;
	}

	.modal-meta {
		color: var(--muted);
		font-size: 0.95rem;
		margin-bottom: 0.75rem;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.modal-desc {
		font-size: 1rem;
		color: #111827;
		margin-top: 0;
	}

	.modal-tags {
		margin-top: 0.75rem;
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}

	.modal-actions {
		margin-top: 1rem;
	}

	@media (max-width: 720px) {
		.events-grid {
			grid-template-columns: 1fr;
		}
		.event-meta .location {
			max-width: 120px;
		}
		.modal-dialog {
			max-width: 680px;
		}
	}
</style>
