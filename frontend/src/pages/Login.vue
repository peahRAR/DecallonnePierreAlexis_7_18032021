<template>
  <div class="background container-fluid">
    <div class="container log-page">
      <div class="boxForm col-6 col-md-8">
        <img
          class="logo"
          src="~@/assets/images/logo/logoInlineBlack.svg"
          alt="Logo Groupomania"
        />
        <hr class="separator" />
        <keep-alive>
          <component v-bind:is="component"></component>
        </keep-alive>
        <button v-on:click="changeTarget()">
          {{ buttonLabel }}
        </button>
        <!--doit etre switchable aussi -->
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Form from "@/components/Form.vue";
import Register from "@/components/Register.vue";

export default {
  name: "Login",
  components: {
    Form,
    Register,
  },
  data() {
    return {
      component: "Form",
    };
  },
  computed: {
    buttonLabel() {
      return this.component === "Form" ? "S'inscrire" : "Se connecter";
    },
  },
  methods: {
    changeTarget() {
      if (this.component === "Form") {
        this.component = "Register";
        return;
      }
      this.component = 'Form';
    },
  },
};
</script>

<style lang="scss">
.background {
  background-image: url("~@/assets/images/backgroundImg.webp");
  background-color: #091f43c6;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  background-blend-mode: multiply;
}

.log-page {
  height: 100vh;
  display: flex;
  padding: 0;
}

.boxForm {
  margin: auto;
  background-color: rgba(255, 255, 255, 0.769);
  padding: 1rem;
  border-radius: 1rem;
}

.logo {
  width: 50%;
  margin-top: 0.5rem;
}

.form{
  width: 80%;
  margin: auto;
  display: flex;

  flex-direction: column;
}

.separator {
  width: 85%;
  border: solid 1px rgba(0, 0, 0, 0.091);
  border-radius: 2px;
  margin: 1rem auto;
}
</style>