// Centralized data for Wazzu Racing's past cars
// Each car entry includes team leads, competition results, and technical highlights

import wr24 from '$lib/assets/cars/wr24.jpg';
import wr23 from '$lib/assets/cars/wr23.jpg';
import wr22 from '$lib/assets/cars/wr22.jpg';
import wr19 from '$lib/assets/cars/wr19.jpg';

export const cars = [
	{
		id: 'wr-2024',
		year: 2024,
		name: 'WR-24',
		image: wr24,
		shortDescription:
			'Our most advanced car yet, featuring a carbon fiber monocoque chassis and full aero package with active dampers.',
		teamLeads: [
			{ name: 'Sarah Martinez', role: 'Team Captain' },
			{ name: 'Michael Chen', role: 'Technical Director' },
			{ name: 'Emma Rodriguez', role: 'Chief Engineer' }
		],
		competition: {
			event: 'Formula SAE Michigan',
			placement: '12th Overall',
			highlights: ['3rd in Design', '8th in Autocross', 'Best finish in team history']
		},
		technicalHighlights: [
			'Carbon fiber monocoque chassis (first for the team)',
			'Öhlins TTX25 dampers with custom tuning',
			'Full undertray and rear wing aero package',
			'Custom engine management system',
			'Lightweight 13-inch wheel package'
		],
		description: `WR-24 represented a major leap forward for Wazzu Racing. After years of tubular frame designs, the team committed to a carbon fiber monocoque chassis, reducing weight by 35 pounds while increasing torsional rigidity by 40%. The aero package was developed using CFD analysis and wind tunnel testing at WSU's facilities.

The car competed at Formula SAE Michigan, where it achieved the team's best overall finish to date. The design presentation impressed judges with its attention to manufacturing processes and cost analysis. On-track performance was strong, with consistent times in autocross and endurance events.

This car set a new standard for the program and established processes that will benefit future teams.`
	},
	{
		id: 'wr-2023',
		year: 2023,
		name: 'WR-23',
		image: wr23,
		shortDescription:
			'Refined steel space frame with improved suspension geometry and our first complete aero package.',
		teamLeads: [
			{ name: 'David Park', role: 'Team Captain' },
			{ name: 'Jessica Thompson', role: 'Technical Director' },
			{ name: 'Ryan Williams', role: 'Chief Engineer' }
		],
		competition: {
			event: 'Formula SAE Lincoln',
			placement: '18th Overall',
			highlights: ['15th in Endurance', 'Completed all dynamic events', 'First team car with wings']
		},
		technicalHighlights: [
			'Optimized steel space frame design',
			'Push-rod actuated suspension front and rear',
			'First functional rear wing implementation',
			'Motec M150 ECU integration',
			'Custom intake plenum design'
		],
		description: `WR-23 built upon lessons learned from previous years with a focus on reliability and consistency. The team redesigned the suspension pickup points to improve camber curves and reduce bumpsteer. This was the first year the team successfully implemented and tested an aerodynamic package.

At Formula SAE Lincoln, the car completed all dynamic events without major mechanical issues - a first for the program. The endurance event was particularly strong, with consistent lap times and no off-track excursions.

The experience gained with the aero package on WR-23 paved the way for the more aggressive design seen on WR-24.`
	},
	{
		id: 'wr-2022',
		year: 2022,
		name: 'WR-22',
		image: wr22,
		shortDescription:
			'Return to competition after pandemic with improved ergonomics and driver interface.',
		teamLeads: [
			{ name: 'Amanda Foster', role: 'Team Captain' },
			{ name: 'Chris Anderson', role: 'Technical Director' },
			{ name: 'Lauren Kim', role: 'Chief Engineer' }
		],
		competition: {
			event: 'Formula SAE Michigan',
			placement: '32nd Overall',
			highlights: [
				'Successful return to competition',
				'Passed all technical inspections',
				'Completed acceleration and skidpad'
			]
		},
		technicalHighlights: [
			'Revised ergonomics package for better driver fit',
			'New steering wheel with integrated controls',
			'Improved cooling system design',
			'Custom intake restrictor for better airflow',
			'Redesigned pedal assembly'
		],
		description: `WR-22 marked the team's return to competition after the pandemic disruption. With many experienced members having graduated, the new team focused on building institutional knowledge and documentation processes.

The car featured improved driver ergonomics based on feedback from previous years. The team invested significant effort in driver training and testing, which paid off in consistent performance during dynamic events.

While the overall finish was modest, successfully fielding a competitive car with a largely new team was considered a major achievement and set the foundation for future success.`
	},
	{
		id: 'wr-2019',
		year: 2019,
		name: 'WR-19',
		image: wr19,
		shortDescription:
			'Final pre-pandemic car with focus on weight reduction and simplified design.',
		teamLeads: [
			{ name: 'Brandon Lee', role: 'Team Captain' },
			{ name: 'Olivia Martinez', role: 'Technical Director' },
			{ name: 'Jake Morrison', role: 'Chief Engineer' }
		],
		competition: {
			event: 'Formula SAE Lincoln',
			placement: '28th Overall',
			highlights: [
				'Lightest car in team history (395 lbs)',
				'20th in Cost event',
				'Clean technical inspection pass'
			]
		},
		technicalHighlights: [
			'Aggressively lightweighted frame design',
			'Aluminum honeycomb composite panels',
			'Custom fabricated titanium exhaust',
			'Minimalist wiring harness',
			'3D printed intake components'
		],
		description: `WR-19 represented the culmination of a multi-year weight reduction initiative. Every component was analyzed for mass optimization, resulting in the lightest car the team had ever built.

The aggressive lightweighting approach required careful analysis to maintain safety and structural integrity. FEA simulations guided tube sizing decisions, and the team worked closely with faculty advisors to validate the design.

This car demonstrated the team's growing technical capabilities and set performance benchmarks that motivated future designs.`
	}
];
