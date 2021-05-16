<template>
  <div class="login">
    <h3>S'inscrire</h3>
    <form @submit.prevent="signUp" class="form">
      <InputForm
        v-model="user.email"
        type="String"
        name="email"
        id="email"
        placeholder="email"
      />
      <InputForm
        v-model="user.username"
        datatip="Nom d'utilisateur unique &#xa; longueur entre 3 et 20 caractères"
        type="String"
        name="username"
        id="username"
        placeholder="username"
      />
      <InputForm
        v-model="user.password"
        datatip=" Votre mot de passe doit contenir: &#xa; - entre 4 et 8 caractères &#xa; - une majuscule au minimum &#xa; - une minuscule au minimum &#xa; - un chiffre au minimum"
        :style="{ redError, valid }"
        type="password"
        name="password"
        id="password"
        placeholder="password"
      />
      <InputForm
        v-model="passwordConfirmation"
        @blur="checkPassword"
        :style="{ redError, valid }"
        datatip="Veuillez confirmer votre mot de passe"
        type="password"
        name="confirmation"
        id="passwordConfirm"
        placeholder="confirmation"
      />

      <ButtonForm type="submit" value="Inscription" />
    </form>
  </div>
</template>

<script>
//import
import InputForm from "@/components/elemForm/InputForm.vue";
import ButtonForm from "./elemForm/ButtonForm.vue";

export default {
  name: "Register",
  components: {
    InputForm,
    ButtonForm,
  },
  data() {
    return {
      user: {
        email: null,
        username: null,
        password: null,
      },
    };
  },
  methods: {
    async signUp() {
      const request = new Request(`http://${process.env.VUE_APP_URL_BDD}/v1/users/register`, {
        method: "POST",
        mode: "cors",
        cache: "default",
        body: JSON.stringify(this.user),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await fetch(request);
      const data = await res.json();
      this.data = data;
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  font-family: "Montserrat", sans-serif;
  font-size: 1.4rem;
  margin: 0 0 1rem 0;
}

.checkbox {
  width: 2rem;
  margin-right: 3px;
  align-items: center;
  margin-top: 10px;
}

label {
  margin-top: 23px;
}
</style>