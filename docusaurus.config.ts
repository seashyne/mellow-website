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
  projectName: 'mellowlang',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'th',
    locales: ['th', 'en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/seashyne/Mellowlang',
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
        { type: 'docSidebar', sidebarId: 'tutorialSidebar', position: 'left', label: 'เอกสาร' },
        { to: '/playground', label: 'Playground', position: 'left' },
        { to: '/roadmap', label: 'Roadmap', position: 'left' },
        { to: '/donate', label: 'สนับสนุน', position: 'left' },
        { href: 'https://github.com/seashyne/Mellowlang', label: 'GitHub', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'เอกสาร',
          items: [
            { label: 'เริ่มต้นใช้งาน', to: '/docs/intro/what-is-mellow' },
            { label: 'Syntax', to: '/docs/language/syntax' },
            { label: 'Playground', to: '/playground' },
          ],
        },
        {
          title: 'ชุมชน',
          items: [{ label: 'GitHub', href: 'https://github.com/seashyne/Mellowlang' }],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Mellow Language Project. Built with ❤️ by Seashyne.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
