<template>
  <button class="fakeInput">
    <p class="txt">Exprimez vous, {{ user }} !</p>
  </button>
</template>

<script>
export default {
  name: "FakeInput",
  props: { user: String },
};
</script>

<style lang="scss" scoped>
.fakeInput {
  max-width: 700px;
  margin: auto;
  width: 100%;
  height: 2.5rem;
  border-radius: 25px;
  background-color: white;
  cursor: text;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  outline: none;
  border-style: none;
  border: 2px solid #081f4372;
}

.txt {
  padding-left: 1rem;
  font-size: 1rem;
  color: #505050d6;
}
</style>