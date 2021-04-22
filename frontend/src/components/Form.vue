<template>
  <div class="login">
    <h3>Se connecter</h3>
    <form class="form" action="">
      <InputForm />
      <InputForm />
    </form>
  </div>
</template>

<script>
export default {
  name: 'Form',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.4rem;
  margin: 0 0 1rem 0;
}
</style>
