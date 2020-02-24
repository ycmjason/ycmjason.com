<template>
  <Layout>
    <div class="markdown-body">
      <h1>{{ post.title }}</h1>
      <div v-html="post.content"></div>
    </div>
  </Layout>
</template>

<page-query>
query Post ($id: ID!) {
  post: devToPost(id: $id) {
    title
    content
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.post.title,
    };
  },

  computed: {
    post() {
      return this.$page.post;
    },
  },
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
