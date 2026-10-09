export type Experience = {
  id: 'pikeazy' | 'looplabs'
  name: string // row label in the Experience card
  rowSubtext: string // small line under the row label
  preview: string // hover preview text
  modalTitle: string
  logo: string // shown only in the popup
  dates: string
  chips: string[] // "key numbers" above the bullet list
  bullets: string[]
}

export const experience: Experience[] = [
  {
    id: 'pikeazy',
    name: 'Pikeazy',
    rowSubtext: 'Creative Growth Intern · Jul–Sep 2025',
    preview: 'Creative Growth Intern · Jul–Sep 2025 · ₹1.78 cost per result, 800K+ view asset.',
    modalTitle: 'Creative Growth Intern, Pikeazy',
    logo: '/logos/pikeazy.webp',
    dates: 'Jul–Sep 2025',
    chips: ['₹1.78 cost per result', '800K+ views', '200K+ profile views', '40+ reels'],
    bullets: [
      'Set up and managed Instagram and Facebook for a Tier 1 metro audience.',
      'Shipped 40+ reels end to end (concept, script, shoot, edit, publish) across 7 formats.',
      'Ran a ₹15K/month Meta Ads budget down to ₹1.78 cost per result through creative testing.',
      'Scaled one asset past 800K+ views; baseline reels rose from 1–3K to 10K+.',
      'Drove 200K+ profile views in 30 days with a reel-first, retention-led strategy.',
      'Built a content intelligence tracker logging formats, hooks and results for every post, which led to 60% better content discoverability.',
    ],
  },
  {
    id: 'looplabs',
    name: 'LoopLabs',
    rowSubtext: "Creative Growth Intern, Founder's Office · Jun–Aug 2026",
    preview: "Creative Growth Intern, Founder's Office · Jun–Aug 2026 · Outbound, decks, retention.",
    modalTitle: "Creative Growth Intern, Founder's Office, LoopLabs Co",
    logo: '/logos/looplabs.webp',
    dates: 'Jun–Aug 2026',
    chips: ['10+ pitch decks', '200+ prospects', '40% retention boost', '50+ creative assets'],
    bullets: [
      'Built 10+ custom pitch decks for outbound sales.',
      'Supported outbound campaigns reaching 200+ prospects.',
      'Researched 50+ viral content pieces to fix low engagement, passing 100K total impressions.',
      'Analyzed metrics across 3 client accounts, boosting viewer retention by 40%.',
      'Coordinated monthly scripts, posts and edits, handling 50+ creative assets on schedule.',
    ],
  },
]
