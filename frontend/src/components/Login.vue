<template>
  <div class="login">
    <h3>Se connecter</h3>
    <form class="form" action="">
      <InputForm v-model="email" type="String" name="email" id="email" placeholder="email" />
      <InputForm v-model="password" type="String" name="password" id="password" placeholder="password"/>
      <ButtonForm value="Connexion" />
    </form>
  </div>
</template>

<script>
//import
import InputForm from "@/components/elemForm/InputForm.vue";
import ButtonForm from "@/components/elemForm/ButtonForm.vue";

export default {
  name: 'Form',
  props: {
    msg: String,
  },
  data() {
    return {
      email:null,
      password: null,
    };
  },
    components: {
    InputForm,
    ButtonForm
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
