<template>
  <div class="editor">
    <Post
      v-if="type === 'post'"
      :valueBtn="valueBtn"
      :valueTag="valueTag"
      :valueContent="valueContent"
    />
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
    valueBtn: String,
    valueTag: String,
    valueContent: String,
    valueAttachement: String,
  },
};
</script>
