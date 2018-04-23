<template>
  <a target="_blank" :href="href" rel="noopener noreferrer">{{ label || href }}</a>
</template>

<script>
export default {
  props: ['href', 'label'],
}
</script>
