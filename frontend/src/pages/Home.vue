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
        <hr class="separator" />
        <div class="inline">
          <p class="formOpen col-sm-4">
            {{ openLabel }}
          </p>
          <p class="changeForm col-sm-4" v-on:click="changeTarget()">
            {{ buttonLabel }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";

export default {
  name: "Home",
  components: {
    Login,
    Register,
  },
  data() {
    return {
      component: "Login",
    };
  },
  computed: {
    buttonLabel() {
      return this.component === "Login" ? "S'inscrire" : "Se connecter";
    },
    openLabel() {
      return this.component === "Login" ? "Se connecter" : "S'inscrire";
    },
  },
  methods: {
    changeTarget() {
      if (this.component === "Login") {
        this.component = "Register";
        return;
      }
      this.component = "Login";
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

.form {
  width: 90%;
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

.changeForm {
  cursor: pointer;
  &:hover {
    color: rgb(11, 11, 130);
    text-decoration: underline;
  }
}

.formOpen{
  color: rgb(11, 11, 130);
}

.inline {
  display: flex;
  justify-content: center;
  p {
    padding: 0 10px;
  }
}
</style>