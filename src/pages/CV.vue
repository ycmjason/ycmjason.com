<template>
  <Layout>
    <div class="markdown-body" v-html="$page.cv.content"></div>
  </Layout>
</template>

<page-query>
query {
  cv: static(id: "cv") {
    content
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: 'Curriculum Vitae',
  },
};
</script>
