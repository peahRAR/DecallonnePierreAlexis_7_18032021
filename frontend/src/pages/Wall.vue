<template>
  <div>
    <Header />
    <div class="container">
      <div class="editor">
        <Editor
          api-key="lqatqo1ukanem8d2hrsh08axudcxncolmul6vtfaiwu0er4e"
          :init="{
            height: 200,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount',
            ],
            toolbar:
              'formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help',
          }"
        />
      </div>
      <div class="feeds">
        <!-- TODO :Component Ecrire un message  -->
        <Message
          v-for="message in allMessages"
          v-bind:key="message"
          :author="message.user"
          :date="message.updatedAt.toLocaleString().replace(',', ' ')"
          :content="message.content"
          :image="message.attachement"
          :tag="message.tag"
          :idMessage="message.id"
          :like="message.advices"
        />
      </div>
    </div>
  </div>
</template>

<script>
// Imports
import Header from "@/components/Header.vue";
import Editor from "@tinymce/tinymce-vue";
import Message from "@/components/Message.vue";

export default {
  name: "wall",
  components: {
    Header,
    Editor,
    Message,
  },
  data() {
    return {
      allMessages: null,
    };
  },
  created() {
    const headers = { "Content-Type": "application/json" };
    fetch(`http://${process.env.VUE_APP_URL_BDD}/v1/messages/`, { headers })
      .then((response) => response.json())
      .then(
        (data) =>
          (this.allMessages = data.map((msg) => {
            return {
              ...msg,
              updatedAt: new Date(msg.updatedAt),
            };
          }))
      );
  },
};
</script>


<style lang="scss" scoped>
.feeds {
  max-width: 700px;
  margin: auto;
  margin-top: 20rem;
}

.editor {
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  margin: 4rem 0 0 0;
  z-index: 3;
  padding-bottom: 50px;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 86%,
    rgba(255, 255, 255, 0) 100%
  );
}
</style>
