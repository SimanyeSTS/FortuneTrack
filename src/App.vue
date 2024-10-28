<template>
  <div class="wrapper">
    <NavBar />
    <router-view />
    <FooterComp />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import FooterComp from './components/FooterComp.vue'

export default {
  components: {
    NavBar,
    FooterComp
  }
}
</script>

<style>
html, body {
  height: 100%; /* Ensure full height for body */
  margin: 0; /* Remove default margins */
}

.wrapper {
  display: flex;
  flex-direction: column; /* Stack children vertically */
  min-height: 100vh; /* Full height of the viewport */
  background-color: #000080; /* Background color for the wrapper */
}

body {
  background-color: #000080; /* Background color for the body */
}

footer {
  margin-top: auto; /* Push footer to the bottom */
}
</style>

<style src="@/assets/css/style.css"></style>