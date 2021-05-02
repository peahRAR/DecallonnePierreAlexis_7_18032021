<template>
  <div class="flex">
    <div class="col-12 inline" :data-tip="datatip">
      <input
        data-html="true"
        @input="handleInput"
        @blur="handleBlur"
        :class="style"
        class="inputForm"
        :type="type"
        :id="id"
        :name="name"
        :placeholder="placeholder"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "InputForm",
  props: {
    name: String,
    type: String,
    id: String,
    placeholder: String,
    value: String,
    style: Object,
    datatip: String,
  },
  data() {
    return {
      content: this.value,
    };
  },
  methods: {
    handleInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
    handleBlur(event){
      this.$emit('blur', event.target.value);
    }
  },
};
</script>


<style lang="scss" scoped>
.inputForm {
  height: 35px;
  width: 80%;
  padding-left: 20px;
  background-color: rgba(238, 238, 238, 0.92);
  border-radius: 25px;
  &:focus-visible {
    outline: none;
    border: 2px solid rgb(13, 28, 159);
  }
  &::placeholder {
    text-transform: capitalize;
    color: black;
  }
}

.inline {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  margin-top: 0;
}

.valid {
  background-color: rgba(22, 135, 0, 0.262);
}

// Error Anim
$shake-intensity: 2%;

.redError {
  background-color: rgba(255, 0, 0, 0.262);
  animation: headshake 100ms cubic-bezier(0.4, 0.1, 0.6, 0.9);
}

@keyframes headshake {
  25% {
    // entièrement à droite
    transform: translateX($shake-intensity);
  }
  75% {
    // entièrement à gauche
    transform: translateX($shake-intensity * -1);
  }
}

// Info-bulle

[data-tip] {
  position: relative;
}
[data-tip]:before {
  content: "";
  /* hides the tooltip when not hovered */
  display: none;
  content: "";
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #0b0339;
  position: absolute;
  top: 30px;
  left: 50%;
  z-index: 8;
  font-size: 0;
  line-height: 0;
  width: 0;
  height: 0;
  margin-top: 10px;
}
[data-tip]:after {
  margin: 0 auto;
  margin-top: 10px;
  display: none;
  content: attr(data-tip);
  position: absolute;
  top: 35px;
  left: 0px;
  right: 0;
  padding: 5px 8px;
  background: #0b0339;
  color: #fff;
  z-index: 9;
  font-size: 0.75em;
  line-height: 18px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  white-space: nowrap;
  word-wrap: normal;
  width: 80%;
}
[data-tip]:hover:before,
[data-tip]:hover:after {
  white-space: pre-wrap;
  display: block;
}
</style>