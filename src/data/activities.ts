export const activitiesRow = {
  label: 'Leadership, Wins & Events',
  preview: 'Editor-in-Chief, Social Media Head, competition wins, events',
}

export type LeadershipRole = {
  role: string
  org: string
  orgNote: string
  dates: string
  description: string
}

export const leadership: LeadershipRole[] = [
  {
    role: 'Editor-in-Chief',
    org: 'Ecossential',
    orgNote: 'The Economics Newsletter, DCAC',
    dates: 'Sep 2025–Aug 2026',
    description:
      'Led content strategy and the editorial team, and aligned the content calendar with campus events and audience interest cycles. Authored "The Sliding Rupee: Decoding India\'s Currency Challenges."',
  },
  {
    role: 'Social Media Head',
    org: 'Ecolibrium',
    orgNote: 'The Economics Department at DCAC',
    dates: 'Sep 2024–Aug 2025',
    description:
      'Built Instagram from zero, about 80% growth in reach, impressions and views, and tested trending audio, formats and hooks to build a repeatable content cadence.',
  },
]

export const wins: string[] = [
  '1st, Ecovision (Economics Debate, DCAC)',
  '2nd, Econfluence (Quiz, KMC)',
  'Top 5 of 1,400 teams, National Case Competition (Hansraj)',
  'Top 5 of 100 teams, EcoStrat Public Policy Case Competition (IIT Delhi)',
  '3rd, Sequence & Scandals (SGGSCC)',
  'Special Mention, Fiscal Frenzy (Aryabhatta)',
]

export const events: string[] = [
  'Econovision 2.0: 250+ participants, 40% rise in participation through content, sponsor outreach and audience engagement.',
]

export const highlights: string[] = [
  'Published article in the DCAC economics newsletter: "The Sliding Rupee: Decoding India\'s Currency Challenges."',
]
