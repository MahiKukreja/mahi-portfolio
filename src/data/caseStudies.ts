import { links } from './links'

export type CaseStudy = {
  company: string
  thumbnail: string
  href: string
}

export const caseStudiesIntro = {
  title: 'Case studies',
  subtitle: 'Two growth teardowns of AI companies.',
}

export const caseStudies: CaseStudy[] = [
  {
    company: 'Conversion',
    thumbnail: '/thumbs/case-study-1.webp',
    href: links.caseStudy1,
  },
  {
    company: 'Cardboard',
    thumbnail: '/thumbs/case-study-2.webp',
    href: links.caseStudy2,
  },
]

export const pikeazyDeck = {
  title: 'Pikeazy deck',
  thumbnail: '/thumbs/pikeazy-deck.webp',
  stats: '800K+ views · 200K+ profile views',
  cta: 'View the deck',
  href: links.pikeazyDeck,
}
