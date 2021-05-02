<template>
  <div class="buttonValidation">
    <button :type="type" class="btnForm">
      {{ value }}
    </button>
  </div>
</template>

<script>
export default {
  name: "ButtonForm",
  props: {
    value: String,
    type:String
  },
};
</script>

<style lang="scss">
.btnForm {
  padding: 10px 20px;
  border-radius: 25px;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  font-size: 0.8rem;
  color: white;
  text-transform: uppercase;
  background-color: rgb(0, 0, 125);
  &:hover{
      background-color: rgb(52, 52, 165);
  }
}
</style>