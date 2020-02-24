<template>
  <Layout>
    <div class="home">
      <g-image src="~/assets/dp.jpg" class="dp"></g-image>
      <h1>{{ $static.metadata.siteName }}</h1>
      <p class="description">{{ $static.metadata.siteDescription }}</p>
      <g-link class="cta" to="/articles/">See my articles</g-link>
    </div>
    <hr />
    <ul class="features">
      <li v-for="{ name, description } of $static.metadata.features" :key="name" class="feature">
        <h3>{{ name }}</h3>
        <p>
          {{ description }}
        </p>
      </li>
    </ul>
  </Layout>
</template>

<static-query>
query {
  metadata {
    siteName
    siteDescription
    features {
      name
      description
    }
  }
}
</static-query>

<script>
export default {
  metaInfo: {
    title: 'Home',
  },
};
</script>

<style scoped>
.home {
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.home .dp {
  max-width: 100%;
  max-height: 280px;
  width: auto;
  border-radius: 50%;
  margin: 3rem auto 2rem;
  display: block;
}

.home .description {
  font-size: 1.4rem;
  text-align: center;
  margin-top: 0;
  color: #20088b;
}

.home .cta {
  display: inline-block;
  padding: 1rem 2rem;
  background: #3a0dff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  margin-top: 1rem;
}

.home .cta:active,
.home .cta:visited {
  color: white;
}
.home .cta:hover {
  background: #2c07d3;
}

hr {
  margin: 2rem 0;
}

.features {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}

.features .feature {
  display: block;
  flex-basis: 33%;
  padding: 0 1rem;
  box-sizing: border-box;
}

@media screen and (max-width: 719px) {
  .features .feature {
    flex-basis: 100%;
  }
}
</style>
