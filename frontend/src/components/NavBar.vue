<template>
  <div>
    <nav role="navigation">
      <div id="menuToggle">
        <input
          id="menu-checkbox"
          class="menu-checkbox"
          name="toggle"
          type="checkbox"
        />
        <label for="menu-checkbox" class="menu-toggle">
          <i class="fas fa-chevron-down"></i>
        </label>

        <Modal v-show="isModalVisible" @close="closeModal">
          <template v-slot:header>
            <p class="header-txt">Supprimer votre compte</p>
          </template>
          <template v-slot:body>
            <p class="body-txt">
              Êtes-vous sure de vouloir supprimer votre compte ?
            </p>
            <button class="btn-delete" v-on:click.prevent="deleteUser">
              Supprimer
            </button>
          </template>
        </Modal>

        <ul id="menu" class="col-xs-4">
          <li v-if="userInfo.userId != 1" v-on:click.prevent="showModal">
            <i class="fas fa-times"></i>Suppression du compte
          </li>
          <li v-if="userInfo.userId === 1" v-on:click.prevent="goToAdmin">
            <i class="fas fa-users-cog"></i>Administration
          </li>
          <li>
            <i class="disconnect fas fa-sign-out-alt"></i>
            <a v-on:click="disconnect">Déconnexion</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
// Import
import Modal from "@/components/Modal.vue";

export default {
  name: "NavBar",
  components: {
    Modal,
  },
  data() {
    return {
      isModalVisible: false,
      openingClass: "close",
    };
  },
  props: {
    userInfo: Object,
  },
  methods: {
    disconnect() {
      localStorage.removeItem("token");
      document.location.href ="/login";
    },

    goToAdmin(){
      document.location.href = "/admin";
      console.log("admin page")
    },

    // Gestion Modal
    showModal() {
      this.isModalVisible = true;
      console.log("modal open " + this.isModalVisible);
    },
    closeModal() {
      this.isModalVisible = false;
    },

    deleteUser() {
      let id = this.userInfo.userId;
      let token = localStorage.getItem("token");
      token = JSON.parse(token);
      token = token.token;
      const headers = {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      };
      fetch(`http://${process.env.VUE_APP_URL_BDD}/v1/users/${id}`, {
        method: "delete",
        headers,
      });
      localStorage.removeItem("token");
      document.location.reload();
    },
  },
};
</script>


<style lang="scss" scoped>
#menu {
  display: none;
  li {
    color: white;
    text-decoration: none;
  }
}

.menu-checkbox:checked ~ #menu {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  width: 20rem;
  background-color: #081f43;
  padding-top: 10px;
  padding-bottom: 15px;
  margin-top: 5px;
  border-bottom-left-radius: 15px;
}

@media only screen and (max-width: 425px) {
  .menu-checkbox:checked ~ #menu {
    width: 100%;
    border-bottom-left-radius: 0;
  }
}

.fa-chevron-down {
  color: white;
  background-color: #254574;
  padding: 0.3rem;
  border-radius: 25px;
  margin-right: 1rem;
  &:hover {
    background-color: #0c3c88;
    color: #ffffffbf;
  }
}

.menu-checkbox {
  opacity: 0;
  position: absolute;
  top: -500px;
}

.menu-checkbox:focus-visible + .menu-toggle {
  border: 1px solid white;
}

.header-txt {
  margin: auto;
  font-size: 18px;
  font-weight: 600;
}

li {
  margin: 0;
  height: 30px;
  i {
    margin-right: 8px;
    font-size: 1rem;
  }
}

#menu li {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

li:hover {
  background-color: #254574;
}

.menu-toggle {
  padding: 3px;
  position: relative;
}

.btn-delete {
  margin-top: 1.5rem;
  display: flex;
  margin-left: auto;
  margin-right: 1rem;
  background-color: #081f43;
  color: white;
  font-weight: bold;
  padding: 0.3rem 0.8rem;
  border-radius: 5px;
  font-size: 15px;
  outline: none;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #081f43cb;
  }
}
</style>