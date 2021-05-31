<template>
  <div class="header container-fluid">
    <div class="container-fluid">
      <div class="row">
        <div class="logo-box col-xs-3">
          <img
            class="logo-large"
            src="~@/assets/images/logo/logoInlineWhite.svg"
            alt="Logo large"
          />
          <img
            class="logo-light "
            src="~@/assets/images/logo/iconWhite.svg"
            alt="Logo large"
          />
        </div>
        <div class="searchBar col-xs-8">
          <SearchBarUser />
        </div>
        <div class="nav col-xs-1 flex-right">
          <NavBar />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Imports
import SearchBarUser from "@/components/SearchBarUser.vue";
import NavBar from "@/components/NavBar.vue"

export default {
  name: 'Header',
  components : {
    SearchBarUser,
    NavBar
  }
}
</script>


<style scoped>
.header {
  background-color: #081f43;
  height: 3.2rem;
  position: fixed;
  top: 0;
  z-index: 3;
}

.flex-right{
  display: flex;
  margin: auto;
  margin-right: 0;
}


.container {
  height: 100%;
}

.logo-box{
    display: flex;
}

.logo-light {
  display: none;
}

.logo-large{
    width: 100%;
    height: 2.3rem;
    margin:  auto 0;
    margin-left: 1rem;
    max-width: 240px;
    transform: scale(0.85);
}

.searchBar{
  display: flex;
}


@media only screen and (max-width: 700px) {
  .logo-large {
    display: none;
  }
  .logo-light {
    display: flex;
    height: 2.1rem;
    margin: auto 0;
    margin-left: 1rem;
  }
}
</style>