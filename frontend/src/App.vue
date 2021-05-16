<template>
  <router-view />
</template>

<script>

let tokenInformation = JSON.parse(localStorage.getItem("token"));
if (tokenInformation) {
  let timeOut = tokenInformation.expireDate - Date.now() ;
  setTimeout(function () {
    localStorage.removeItem("token");
    document.location.href = "/login";
  }, timeOut);
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
