<template>
  <div class="layout">
    <GithubCorner />
    <header class="header">
      <strong class="site-name">{{ $static.metadata.siteName }}</strong>
      <nav class="nav">
        <g-link class="nav__link" to="/">Home</g-link>
        <g-link class="nav__link" to="/articles/">Articles</g-link>
        <g-link class="nav__link" to="/cv/">CV</g-link>
        <g-link class="nav__link" to="https://github.com/ycmjason">Github</g-link>
      </nav>
    </header>
    <slot />
    <footer>Copyright &copy; {{ new Date().getFullYear() }} Jason Yu</footer>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import GithubCorner from '@/components/GithubCorner.vue';
export default {
  components: { GithubCorner },
};
</script>

<style>
body {
  font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.5;
}

.layout {
  max-width: 760px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;
  flex-wrap: wrap;
}

.site-name {
  padding-right: 1rem;
}

.nav__link {
  margin-left: 20px;
}

.nav__link:first-child {
  margin-left: 0;
}

footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  padding-bottom: 3rem;
}
</style>
