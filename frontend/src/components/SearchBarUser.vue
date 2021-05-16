<template>
  <div class="wrap">
    <div class="search">
      <input
        type="text"
        class="searchTerm"
        placeholder="Rechercher une personne"
      />
      <button type="submit" class="searchButton">
        <i class="fa fa-search"></i>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$color-background: #254574;

.search {
  width: 100%;
  position: relative;
  display: flex;
}

.searchTerm {
  width: 100%;
  border-right: none;
  padding: 5px;
  height: 25px;
  border-radius: 25px 0 0 25px;
  outline: none;
  background-color: $color-background;
  color: #ffffff;
  padding-left: 0.75rem;
  border: none;
  &::placeholder {
    color: #ffffff89;
  }
}

.searchTerm:focus {
  color: #ffffff;
}

.searchButton {
  display: flex;
  align-items: center;
  width: 40px;
  height: 35px;
  background: $color-background;
  text-align: center;
  color: #ffff;
  border-radius: 0 25px 25px 0;
  cursor: pointer;
  font-size: 15px;
  border: none;
  border-left: 1px solid rgb(9, 7, 19);
  &:hover {
    background: #0c3c88;
  }
  i {
    margin-left: 3px;
  }
}

/*Resize the wrap to see the search bar change!*/
.wrap {
  width: 100%;
  margin: auto;
}

@media only screen and (max-width: 320px) {
  .searchTerm {
    &::placeholder {
      font-size: 10px;
    }
  }
}

@media only screen and (min-width: 700px) {
  .wrap {
    width: 85%;
    margin: auto;
    margin-right: 0;
  }
}

@media only screen and (min-width: 768px) {
  .wrap {
    width: 50%;
    margin: auto;
  }
}

@media only screen and (min-width: 1440px) {
  .wrap {
    width: 35%;
    margin: auto;
  }
}
</style>