<template>
  <a  v-on:click="$emit('likeAction',{value})" class="flex boxBtn" :class="{active : actif}">
    <p :class="`${styleIcon} ${color}`" class="icon"></p>
    <p :class="color +' number'">{{ likeCounter }}</p>
  </a>
</template>

<script>
export default {
  name: "LikeButton",
  props: {
    styleIcon: String,
    color: String,
    value: String,
    likeCounter: Number,
    actif: Boolean,
    classActive:String
  },
};
</script>


<style lang="scss" scoped>
.flex {
  display: flex;
  justify-items: center;
  margin: auto;
  align-items: center;
  justify-content: center;
}

.boxBtn {
  border: 1px solid rgba(128, 128, 128, 0.481);
  border-top-color: rgba(0, 0, 0, 0.173);
  width: 100%;
  height: 2rem;
  padding: 0.25rem;
  cursor: pointer;
  .blue {
    color: rgba(17, 17, 128, 0.666);
  }

  .red {
    color: rgba(255, 0, 0, 0.666);
  }
  &:hover {
    background-color: rgba(128, 128, 128, 0.091);
    .blue {
      color: rgba(17, 17, 128, 1);
    }
    .red {
      color: rgba(255, 0, 0, 1);
    }
  }
}

.active{
    background-color: #0f0a4614;
}

.number{
    cursor: pointer;
}

.icon {
  font-size: 18px;
  margin-right: 5px;
}
</style>