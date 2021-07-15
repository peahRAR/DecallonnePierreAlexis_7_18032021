<template>
  <div class="buttonValidation">
    <button :type="type" class="btnForm" :disabled="showBtn">
      {{ value }}
    </button>
  </div>
</template>

<script>
export default {
  name: "ButtonForm",
  props: {
    value: String,
    type:String,
    showBtn: Boolean
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
  &:hover:enabled{
      background-color: rgb(52, 52, 165);
  }
  &:disabled{
    opacity: 0.45;
  }
}
</style>