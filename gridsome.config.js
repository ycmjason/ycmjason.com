// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'YCM Jason',
  siteDescription: 'Jason loves solving problems. And he plays music.',
  metadata: {
    features: [
      { name: 'Handsome', description: 'He enjoys admiring his own beauty through the mirror.' },
      {
        name: 'Smart',
        description:
          'He is so smart that he could solve really hard problems single handedly within a short period of time.',
      },
      {
        name: 'Talented',
        description:
          'He can sing; He can dance; He can beatbox; He can make really good music; He can play the guitar, piano, (drum, chinese flute, harmonica...)',
      },
    ],
  },
  plugins: [],
  templates: {
    DevToPost: '/posts/:slug',
  },
};
