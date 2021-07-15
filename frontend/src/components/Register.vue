<template>
  <div class="login">
    <div class="popup" v-if="connexionOk || connexionError" :class="{ backgroundRed: connexionError , backgroundGreen: connexionOk}">
      <div class="flex-line">
        <i class="far fa-check-circle" v-if="connexionOk"></i>
        <p v-if="connexionOk" >Votre compte a été créé avec succès</p>
        <i class="far fa-times-circle" v-if="connexionError"></i>
        <div class="column">
          <p v-if="connexionError">Votre compte n'a pas pu être créé :</p>
          <p v-if="connexionError">{{errorMsg}} </p>
        </div>
      </div>
    </div>

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
        @keyup="verifyPass"
        type="password"
        name="password"
        id="password"
        placeholder="password"
      />

      <InputForm
        v-model="passwordConfirmation"
        @keyup="verifyPass"
        datatip="Veuillez confirmer votre mot de passe"
        type="password"
        name="confirmation"
        id="passwordConfirm"
        placeholder="confirmation"
      />

      <div class="checkPassword">
        <div class="line" :class="{ green: sizePassword }">
          <i class="far fa-check-circle"></i>
          <p>entre 4 et 8 caractères</p>
        </div>
        <div class="line" :class="{ green: uppercasePass }">
          <i class="far fa-check-circle"></i>
          <p>une majuscule au minimum</p>
        </div>
        <div class="line" :class="{ green: lowercasePass }">
          <i class="far fa-check-circle"></i>
          <p>une minuscule au minimum</p>
        </div>
        <div class="line" :class="{ green: numberPass }">
          <i class="far fa-check-circle"></i>
          <p>un chiffre au minimum</p>
        </div>
        <div class="line" :class="{ green: passwordConfirm }">
          <i class="far fa-check-circle"></i>
          <p>confirmation du mot de passe</p>
        </div>
      </div>

      <ButtonForm type="submit" value="Inscription" :showBtn="isDisable" />
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
      passwordConfirm: false,
      sizePassword: false,
      uppercasePass: false,
      lowercasePass: false,
      numberPass: false,
      isDisable: true,
      connexionOk: false,
      connexionError: false,
      errorMsg: null,
    };
  },
  methods: {
    verifyPass: function () {
      let sentence = this.user.password;
      const regexMaj = /[A-Z]/g;
      const regexMin = /[a-z]/g;
      const regexNumber = /[0-9]/g;

      // Initialisation des vérificaiton à False
      this.lowercasePass = false;
      this.numberPass = false;
      this.sizePassword = false;
      this.uppercasePass = false;
      this.passwordConfirm = false;
      this.isDisable = true;

      if (sentence) {
        // Vérification taille du MDP
        if (sentence.length >= 4 && sentence.length <= 8) {
          this.sizePassword = true;
        }

        // Vérifier la présence d'une majuscule
        if (sentence.match(regexMaj)) {
          this.uppercasePass = true;
        }

        // Vérifier la présence d'une minuscule
        if (sentence.match(regexMin)) {
          this.lowercasePass = true;
        }
        // Vérifier la présence d'un numéro
        if (sentence.match(regexNumber)) {
          this.numberPass = true;
        }

        //vérification confirmation du MDP
        if (this.passwordConfirmation === this.user.password) {
          this.passwordConfirm = true;
        }

        if (
          this.sizePassword &&
          this.uppercasePass &&
          this.lowercasePass &&
          this.numberPass &&
          this.user.email &&
          this.user.username
        ) {
          this.isDisable = false;
        }
      }
    },

    async signUp() {
      const request = new Request(
        `http://${process.env.VUE_APP_URL_BDD}/v1/users/register`,
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

        if (response.status >= 400 && response.status < 500) {
          jsonResponse.then((result) => {
            this.connexionOk = false;
            this.connexionError = true;
            this.errorMsg = result.error;
          });
        } else if (response.status === 201) {
          this.connexionOk = true;
          this.connexionError = false;
        }
      });
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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

.checkPassword {
  margin-left: 35px;
  margin-bottom: 15px;
  .line {
    margin: 5px 0;
    color: grey;
    display: flex;
    align-items: center;
    font-weight: bold;
  }
  .fa-check-circle {
    margin-right: 15px;
    font-size: 25px;
  }
}

.line.green {
  color: green;
}

.popup {
  width: 85%;
  padding: 5px;
  margin: auto;
  margin-bottom: 15px;
  border-radius: 10px;
}

.flex-line{
  display: flex;
  color: white;
  align-items: center;
  i{
    font-size: 30px;
    margin-right: 20px;
    margin-left: 20px;
  }
}

.column{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.backgroundRed{
  background-color: red;
}

.backgroundGreen{
  background-color: green;
}
</style>