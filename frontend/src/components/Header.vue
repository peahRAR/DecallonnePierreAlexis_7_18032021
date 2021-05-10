<template>
  <div class="header container-fluid">
    <div class="container">
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
        <div class="searchBar">

        </div>
        <div class="nav">
            
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  background-color: #081f43;
  height: 3.2rem;
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
}


@media only screen and (max-width: 700px) {
  .logo-large {
    display: none;
  }
  .logo-light {
    display: flex;
    max-height: 2.5rem;
    margin: auto;
  }
}
</style>