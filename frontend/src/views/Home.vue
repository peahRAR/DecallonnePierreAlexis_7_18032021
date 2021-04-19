<template>
  <div class="home container-fluid">
    <img alt="Vue logo" src="../assets/logo.png">
    <Home/>
  </div>
</template>

<script>
// @ is an alias to /src
import Home from '@/components/Home.vue'

export default {
  name: 'Home',
  components: {
    Home
  }
}
</script>
