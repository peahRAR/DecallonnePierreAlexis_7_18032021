<template>
  <div class="admin-page">
    <Header :userInfo="userInfo" />
    <div class="container">
      <table class="table">
        <ol class="switches">
          <User
            v-for="user in allUsers"
            v-bind:key="user"
            :username="user.username"
            :isAdmin="user.isAdmin"
            :userId="user.id"
          />
        </ol>
      </table>
    </div>
  </div>
</template>

<script>
//Import
import Header from "@/components/Header.vue";
import User from "@/components/User.vue";

export default {
  name: "Admin",
  components: {
    Header,
    User,
  },
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem("token")),
      allUsers: null,
    };
  },
  created() {
    let token = localStorage.getItem("token");
    token = JSON.parse(token);
    token = token.token;

    const headers = {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    };
    fetch(`http://${process.env.VUE_APP_URL_BDD}/v1/users`, {
      headers,
    }).then((response) => {
      const jsonResponse = response.json();

      if (response.status === 200) {
        jsonResponse.then((result) => {
          const data = result;
          this.allUsers = data;
        });
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.table {
  margin-top: 100px;
  width: 100%;
}
</style>
