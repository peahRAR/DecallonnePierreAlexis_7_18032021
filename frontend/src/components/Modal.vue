<template>
  <div class="modal-backdrop">
    <div class="modal container">
      <header class="modal-header">
        <slot name="header">
          <p class="header-txt">Créer une publication</p>
        </slot>
        <button type="button" class="btn-close" @click="close">
          <i class="fas fa-times"></i>
        </button>
      </header>

      <section class="modal-body">
        <slot name="body">
          <Editor 
          type="post"
          />
        </slot>
      </section>
    </div>
  </div>
</template>

<script>
import Editor from "@/components/Editor";

export default {
  name: "Modal",
  components : {
      Editor
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.625);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  max-width: 700px;
  width: 100%;
  margin: 0 15px;
  padding: 0 !important;
  border-radius: 25px;
  max-height: 95vh;
}

.modal-header {
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
  color: #081f43;
}

.header-txt {
  margin: auto;
  font-size: 18px;
  font-weight: 600;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  border: none;
  font-size: 20px;
  width: 25px;
  height: 25px;
  cursor: pointer;
  font-weight: bold;
  color: white;
  background-color: #081f43;
  border-radius: 50%;
  padding-top: 2px;
  padding-right: 6px;
  &:hover {
    background-color: #081f43cb;
    color: rgb(225, 225, 225);
  }
}
</style>