<template>
  <div id="app" class="app">
    <router-view /> <!-- or <router-view /> if using Vue Router -->
  </div>
</template>

<script>
import Home from './views/Home.vue' // only if not using router

export default {
  name: 'App',
  components: { Home }
}
</script>

<style>
/* Make sure the root, html, body, and #app take full width/height */
html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden; /* prevent horizontal scroll */
  overflow-y: auto;   /* allow vertical scroll */
   font-family: 'Outfit', sans-serif;
  /* Hide scrollbars but keep scroll functionality */
  scrollbar-width: none; /* Firefox */
}

body::-webkit-scrollbar {
  width: 0; /* Chrome, Safari, Edge */
  background: transparent;
}

.app {
  width: 100%;
  min-height: 100%;
}
</style>
