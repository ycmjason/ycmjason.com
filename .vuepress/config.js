const { join, basename } = require('path');
const glob = require('glob');

const generateSideBar = dir => glob.sync(join(__dirname, dir, '*.md')).map(p => basename(p, '.md')).filter(n => n !== 'README');

module.exports = {
  title: 'Jason Yu',
  description: 'A passionate real-life problem solver and musician.',
  ga: 'UA-113352609-1',
  head: [
    ['link', { rel: 'icon', href: `/favicon.png` }],
  ],
  themeConfig: {
    nav: [
      {
        text: 'Blog',
        link: '/blog/',
      },
      {
        text: 'Curriculum Vitae',
        link: '/cv/'
      },
    ],
    sidebar: {
      '/blog/': [
        '',
        ...generateSideBar('../blog'),
      ],
      '/cv/': [
        '',
      ],
    },
    sidebarDepth: 0,
  },
  markdown: {
    config: md => md.use(require('markdown-it-deflist')),
  }
};
