<template>
  <div class="login">
    <h3>Se connecter</h3>
    <form @submit.prevent="signIn" class="form" action="">
      <InputForm
        v-model="user.email"
        type="String"
        name="email"
        id="email"
        placeholder="email"
      />
      <InputForm
        v-model="user.password"
        type="password"
        name="password"
        id="password"
        placeholder="password"
      />
      <ButtonForm value="Connexion" />
    </form>
  </div>
</template>

<script>
//import
import InputForm from "@/components/elemForm/InputForm.vue";
import ButtonForm from "@/components/elemForm/ButtonForm.vue";

export default {
  name: "Form",
  props: {
    msg: String,
  },
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
    };
  },
  components: {
    InputForm,
    ButtonForm,
  },
  methods: {
    async signIn() {
      const request = new Request(
        `http://${process.env.VUE_APP_URL_BDD}/v1/users/login`,
        {
          method: "POST",
          mode: "cors",
          cache: "default",
          body: JSON.stringify(this.user),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return fetch(request).then((response) => {
        const jsonResponse = response.json();

        if (response.status === 200) {
          jsonResponse.then((result) => {
            const data = result;
            this.data = data;

            // Gerer dans le back pour que le token soit retourner avec sa date d expiraiton
            localStorage.setItem("token", JSON.stringify(data));
            document.location.href = "/";
          });
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  font-family: "Montserrat", sans-serif;
  font-size: 1.4rem;
  margin: 0 0 1rem 0;
}
</style>
