<template>
  <div class="flex">
    <input class="inputForm" type="text" />
  </div>
</template>

<script>
export default {
  name: "InputForm",
  components: {
    InputForm,
  },
  data() {
    return {
      component: "InputForm",
    };
  },
};
</script>

<style lang="scss" scoped>
.inputForm {
  height: 20px;
  width: 100%;
  background-color: white;
}
</style>