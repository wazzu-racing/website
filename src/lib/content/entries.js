// Centralized content storage for events and newsletter articles.
//
// This file intentionally avoids dynamic `import.meta.glob` or parsing .md files
// at import-time to prevent Vite import-analysis errors. Instead we import a
// generated JSON file (`generated-articles.json`) that contains parsed article
// entries (created by a local script during development or as part of your build).
//
// To update the newsletter articles list, either:
//  - Add/modify markdown files in `src/lib/newsletters/articles/` and run the
//    generation script `website/scripts/generate-articles.mjs` (or similar), or
//  - Edit the generated JSON directly (not recommended for long-term use).
//
// The generated JSON file should contain an array of entry objects with the same
// shape used below for `article` entries: { id, type: 'article', title, date, excerpt, content, tags, relatedEventId }
import generatedArticles from '$lib/content/generated-articles.json';

// Events (type: 'event'). Edit these directly to add/update events.
const events = [
	{
		id: 'e1',
		type: 'event',
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
		type: 'event',
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
		type: 'event',
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
		type: 'event',
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
		type: 'event',
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
		type: 'event',
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
		type: 'event',
		title: 'Winter Design Review (Open Session)',
		date: '2026-01-15',
		time: '16:30',
		location: 'Engineering Lecture Hall 204',
		description:
			'An open walkthrough of our winter design progress; good opportunity for prospective members to see technical work.',
		tags: ['review', 'meeting']
	}
];

// Ensure the imported generatedArticles is an array; if not, fall back to empty array.
const articleEntries = Array.isArray(generatedArticles) ? generatedArticles : [];

// Combine events and articles into the single `entries` export used across the app.
// Events first, then articles (articles should be sorted by date within generated JSON).
export const entries = [...events, ...articleEntries];
