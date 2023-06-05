// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

require('dotenv').config();

const md = require('@vuepress/markdown')();
md.set({ linkify: true });
md.use(require('markdown-it-deflist'));

const options = {
  DEV_TO_API_KEY: process.env.DEV_TO_API_KEY,
};

const fm = require('front-matter');
const { stripIndent } = require('common-tags');
const markdownToHtml = markdown => {
  const { body } = fm(markdown);
  // parse {% youtube/replit ... %}
  const body2 = body.replace(/\{%\s+(youtube|replit)\s+(.+?)\s+%\}/gsu, (_, embedTarget, id) => {
    switch (embedTarget) {
      case 'youtube': {
        return stripIndent`<div class="yt-container">
          <iframe class="yt-container__yt" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>`;
        break;
      }
      case 'replit': {
        return `<iframe frameborder="0" width="100%" height="500px" src="https://repl.it/${id}?lite=true"></iframe>`;
        break;
      }
    }
  });
  return md.render(body2).html;
};

// loadDevTo
const fetch = require('node-fetch');

const DEV_TO_USERS_ARTICLES_ENDPOINT = 'https://dev.to/api/articles/me?per_page=1000';

const loadDevTo = async ({ addCollection }) => {
  const { DEV_TO_API_KEY } = options;
  const posts = addCollection('DevToPost');

  const articles = await fetch(DEV_TO_USERS_ARTICLES_ENDPOINT, {
    headers: { 'api-key': DEV_TO_API_KEY },
  }).then(res => res.json());

  for ({ id, title, published_timestamp, body_markdown, tag_list, slug } of articles) {
    posts.addNode({
      id,
      tags: tag_list,
      title,
      publishedTimestamp: new Date(published_timestamp).getTime(),
      slug,
      content: markdownToHtml(body_markdown),
    });
  }
};

// loadStatic
const fs = require('fs-extra');
const path = require('node:path');
const zip = require('lodash.zip');
const loadStatic = async ({ addCollection }) => {
  const STATIC_DIR = './content';

  const markdownFilenames = (await fs.readdir(STATIC_DIR)).filter(f => /\.md$/.test(f)).map(f => `${STATIC_DIR}/${f}`);
  const markdownContents = await Promise.all(markdownFilenames.map(f => fs.readFile(f, 'utf8')));

  const static = addCollection('Static');

  for (const [name, content] of zip(markdownFilenames, markdownContents)) {
    static.addNode({
      id: path.basename(name, '.md'),
      name: path.basename(name, '.md'),
      content: markdownToHtml(content),
    });
  }
};

module.exports = (api) => {
  api.loadSource(async api => {
    const LOADERS = [loadDevTo, loadStatic];
    await Promise.all(LOADERS.map(l => l(api)));
  });
};
