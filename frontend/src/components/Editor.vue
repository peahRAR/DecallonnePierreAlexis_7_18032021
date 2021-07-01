<template>
  <div class="editor">
    <Post
      v-if="type === 'post'"
      :valueBtn="valueBtn"
      :valueTag="valueTag"
      :valueContent="valueContent"
      :valueAttachement="valueAttachement"
      :id="id"
    />
    <Comment 
    v-if="type === 'comment'"
    :valueBtn="valueBtn"
    :id="id"
    :idParent="idParent"
    :valueAttachement="valueAttachement"
    />

  </div>
</template>

<script>
import Post from "@/components/elemEditor/Post.vue";
import Comment from "@/components/elemEditor/Comment.vue";

export default {
  name: "Editor",
  components: {
    Post,
    Comment,
  },
  props: {
    type: String,
    valueBtn: String,
    valueTag: String,
    valueContent: String,
    valueAttachement: String,
    id: Number,
    idParent: Number,
  },
};
</script>
