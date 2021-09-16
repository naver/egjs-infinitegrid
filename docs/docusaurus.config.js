/** @type {import('@docusaurus/types').DocusaurusConfig} */

const packageInfo = require("../package.json");
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  title: 'InfiniteGrid',
  tagline: "A module used to arrange elements including content infinitely according to grid type. With this module, you can implement various layouts composed of different elements whose sizes vary. It guarantees performance by maintaining the number of DOMs the module is handling under any circumstance",
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  url: 'https://naver.github.io',
  baseUrl: isDev ? '/' : '/egjs-infinitegrid/',
  projectName: 'naver.github.io',
  organizationName: 'naver',
  plugins: ['docusaurus-plugin-sass', './webpack.js'],
  themes: ['@docusaurus/theme-live-codeblock'],
  themeConfig: {
    hideableSidebar: false,
    navbar: {
      logo: {
        alt: 'egjs',
        src: 'img/infinitegrid_textonly.svg'
      },
      items: [
        {
          type: 'doc',
          docId: 'installation',
          label: 'Docs',
          position: 'left'
        },
        {
          type: "doc",
          docId: "api/InfiniteGrid",
          label: "API",
          position: "left"
        },
        {
          to: "Guides",
          label: "Guides",
          position: "left"
        },
        {
          to: "https://naver.github.io/egjs-infinitegrid/storybook",
          label: "Demos",
          position: "left"
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
          dropdownItemsAfter: [
            {
              to: 'https://naver.github.io/egjs-infinitegrid/release/3.9.0/doc/index.html',
              label: '3.x.x'
            }
          ]
        },
        {
          type: 'localeDropdown',
          position: 'right'
        },
        {
          href: 'https://github.com/naver/egjs-infinitegrid',
          label: 'GitHub',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Docs',
              to: 'docs/'
            },
            {
              label: 'API',
              to: 'docs/api/InfiniteGrid'
            },
          ]
        },
        {
          title: 'Demo',
          items: [
            {
              label: 'Demos',
              to: "https://naver.github.io/egjs-infinitegrid/storybook",
            },
          ]
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/naver/egjs-infinitegrid'
            },
            {
              label: 'Issues',
              href: 'https://github.com/naver/egjs-infinitegrid/issues'
            },
            {
              label: 'Naver Open Source',
              href: 'https://naver.github.io/'
            }
          ]
        }
      ],
      logo: {
        alt: 'egjs',
        src: 'img/egjs_white.svg',
        href: 'https://naver.github.io/egjs/'
      },
      copyright: `Copyright © ${new Date().getFullYear()} NAVER, Inc. Built with Docusaurus & Bulma.`
    },
    prism: {
      theme: require('prism-react-renderer/themes/oceanicNext'),
      darkTheme: require("prism-react-renderer/themes/palenight")
    },
    googleAnalytics: {
      trackingID: 'UA-70842526-18',
      anonymizeIP: true
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: "https://github.com/naver/egjs-infinitegrid/edit/master/docs/",
          remarkPlugins: [require("remark-breaks")],
          lastVersion: isDev ? "current" : undefined,
          versions: {
            current: {
              label: `Next`
            }
          },
          editCurrentVersion: true
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: "https://github.com/naver/egjs-infinitegrid/edit/master/docs/blog/"
        },
        pages: {
          remarkPlugins: [require("remark-breaks")]
        },
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
            require.resolve('./node_modules/@egjs/react-flicking/dist/flicking.css'),
            require.resolve('./node_modules/@egjs/flicking-plugins/dist/flicking-plugins.css'),
            require.resolve('./src/css/bulma-override.sass')
          ]
        }
      }
    ]
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ko"]
  }
};
