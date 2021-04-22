<template>
  <div class="login">
    <h3>S'inscrire</h3>
    <form class="form" action="">
        <InputForm />
    </form>
  </div>
</template>

<script>
//import

export default {
  name: 'Register',
  props: {
    msg: String
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.4rem;
  margin: 0 0 1rem 0;
}
</style>