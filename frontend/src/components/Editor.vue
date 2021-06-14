<template>
  <div class="editor">
    <Post v-if="type === 'post'" />


  </div>
</template>

<script>
import Post from "@/components/elemEditor/Post.vue";

export default {
  name: "Editor",
  components: {
    Post,
  },
  props: {
    type: String,
  },
};
</script>
