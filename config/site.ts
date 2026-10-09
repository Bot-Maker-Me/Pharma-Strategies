export const siteConfig = {
  name: 'Pharma Strategies',
  description:
    'A focused compliance marketplace for pharmaceutical and care operations teams.',
  url: 'https://pharmastrategies.com',
  logo: '/logo.svg',
  links: {
    twitter: 'https://twitter.com/pharmasuite',
    linkedin: 'https://linkedin.com/company/pharmasuite',
    github: 'https://github.com/pharmasuite',
  },
  nav: [
    { label: 'Apps', href: '/apps' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Resources', href: '/resources' },
    { label: 'About', href: '/about' },
  ],
  footer: {
    sections: [
      {
        title: 'Apps',
        links: [
          { label: 'Narcotics Ledger', href: '/apps/narcotics-ledger' },
          { label: 'Nursing Home', href: '/apps/nursing-home' },
          { label: 'Pharma Portal', href: '/apps/pharma-portal' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'Legal & Privacy', href: '/legal' },
        ],
      },
    ],
  },
};
