// Every external URL on the site lives here. Edit a value to change the link everywhere.
export const links = {
  resume:
    'https://www.dropbox.com/scl/fi/fzgf48fl9oqflwtdhpvxf/Mahi_Kukreja_Resume.docx?rlkey=9x646ea051sdv6twleif54lxg&st=3tmhwdnp&dl=0',
  linkedin: 'https://www.linkedin.com/in/mahi-kukreja-b818b228b',
  pikeazyDeck:
    'https://www.dropbox.com/scl/fi/q1lyvkqfux5vuqd5qxfk8/Pikeazy-deck.pdf?rlkey=x7bql31rpagxfyxvutpj9ytf9&st=yexl2daz&dl=0',
  caseStudy1:
    'https://www.dropbox.com/scl/fi/s1tef8jc105zexzpuy3kn/Conversion_Growth_Case_Study.pptx.pdf?rlkey=832a8uovzh62w3h8u782rgcw2&st=xzdhz1yt&dl=0',
  caseStudy2:
    'https://www.dropbox.com/scl/fi/91axfwqax7ef1s2ahm9f3/Cardboard-Growth-Case-Study.pdf?rlkey=59ov2xa2hxa7lw2pk7acqf14u&st=vcl3vsf5&dl=0',
  email: 'kukrejamahi9@gmail.com',
  phone: '+91 9911599009',
} as const

export const mailto = `mailto:${links.email}`
export const tel = `tel:${links.phone.replace(/\s+/g, '')}`
