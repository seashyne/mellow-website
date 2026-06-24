// docusaurus.config.ts
import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';

const config: Config = {
  title: 'Mellow',
  tagline: 'AI-Native Programming Language',
  favicon: 'img/Logo.png',

  url: 'https://mellow-lang.dev',
  baseUrl: '/',

  organizationName: 'seashyne',
  projectName: 'mellow-programming-language',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'th'],
    localeConfigs: {
      en: {
        label: 'English',
      },
      th: {
        label: 'ไทย',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/seashyne/mellow-programming-language',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Mellow',
      logo: {
        alt: 'Mellow Logo',
        src: 'img/Logo.png',
      },
      items: [
        { type: 'docSidebar', sidebarId: 'tutorialSidebar', position: 'left', label: 'Docs' },
        { to: '/playground', label: 'Playground', position: 'left' },
        { to: '/roadmap', label: 'Roadmap', position: 'left' },
        { to: '/release-pipeline', label: 'Release Pipeline', position: 'left' },
        { href: 'https://mellow-public-registry.jirayut-wh.workers.dev/packages', label: 'Registry', position: 'left' },
        { to: '/donate', label: 'Support', position: 'left' },
        { type: 'localeDropdown', position: 'right' },
        { href: 'https://github.com/seashyne/mellow-programming-language', label: 'GitHub', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Start here', to: '/docs/intro/what-is-mellow' },
            { label: 'Syntax', to: '/docs/language/syntax' },
            { label: 'Playground', to: '/playground' },
            { label: 'Release Pipeline', to: '/release-pipeline' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'Language source', href: 'https://github.com/seashyne/mellow-programming-language' },
            { label: 'Package registry', href: 'https://mellow-public-registry.jirayut-wh.workers.dev/packages' },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Mellow Language Project. Built by Seashyne.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
