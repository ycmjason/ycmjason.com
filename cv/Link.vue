<template>
  <a target="_blank" :href="href">{{ label || href }}</a>
</template>

<script>
export default {
  props: ['href', 'label'],
}
</script>
