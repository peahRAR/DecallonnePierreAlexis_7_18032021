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
        <ul id="menu" class="col-xs-4">
          <li><i class="fas fa-times"></i>Suppression du compte</li>
          <li><i class="fas fa-users-cog"></i>Administration</li>
          <li><i class="fas fa-sign-out-alt"></i>Déconnexion
</li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
#menu {
  display: none;
  li{
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
    background-color:#254574;
    padding: 0.3rem;
    border-radius: 25px;
    margin-right: 1rem;
    &:hover{
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

li{
    margin: 0;
    height: 30px;
    i {
        margin-right: 8px;
        font-size: 1rem;
    }
}

#menu li{
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

li:hover{
    background-color: #254574;
}


.menu-toggle{
    padding: 3px;
    position: relative;
}
</style>