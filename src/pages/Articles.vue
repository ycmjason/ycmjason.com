<template>
  <Layout>
    <div v-for="[year, months] of yearMonths" :key="year">
      <h2>{{ year }}</h2>
      <ul>
        <li v-for="month of months" :key="month">
          <h3>{{ month }}</h3>
          <ul>
            <li v-for="{ id, title, tags, publishedTimestamp, path } of getPostsByYearMonth(year, month)" :key="id">
              <g-link :to="path">{{ title }}</g-link>
              <br />
              {{ tags.map(t => `#${t}`).join(' ') }}
              <br />
              {{ timestampToDisplay(publishedTimestamp) }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </Layout>
</template>

<page-query>
query {
  posts: allDevToPost(sortBy: "publishedTimestamp", order: DESC) {
    edges {
      node {
        id
        tags
        title
        publishedTimestamp
        path
      }
    }
  }
}
</page-query>

<script>
import dayjs from 'dayjs';
import mapValues from 'lodash.mapvalues';

const groupListsBy = (xs, getGroupListBy) => {
  return xs.reduce((acc, x) => {
    const key = getGroupListBy(x);
    return {
      ...acc,
      [key]: [...(acc[key] || []), x],
    };
  }, {});
};

export default {
  metaInfo: {
    title: 'Articles',
  },
  computed: {
    posts() {
      return this.$page.posts.edges.map(({ node }) => node);
    },
    yearMonths() {
      return [...new Set(this.posts.map(({ publishedTimestamp }) => dayjs(publishedTimestamp).format('YYYY.MMMM')))]
        .map(d => d.split('.'))
        .reduce((acc, [year, month]) => {
          const entryForYear = acc.find(entry => entry[0] === year);
          if (!!entryForYear) {
            entryForYear[1].push(month);
            return acc;
          }

          return [...acc, [year, [month]]];
        }, []);
    },
  },

  methods: {
    timestampToDisplay(timestamp) {
      const date = dayjs(timestamp);
      return `${date.fromNow()} | ${date.format('DD MMMM YYYY')}`;
    },
    getPostsByYearMonth(year, month) {
      return this.posts.filter(
        ({ publishedTimestamp }) => dayjs(publishedTimestamp).format('YYYY.MMMM') === `${year}.${month}`,
      );
    },
  },
};
</script>

<style>
li {
  margin: 1rem 0;
}
</style>
