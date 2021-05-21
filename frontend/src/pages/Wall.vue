<template>
  <div>
    <Header />
    <div class="container">
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
import Message from "@/components/Message.vue";

export default {
  name: "wall",
  components: {
    Header,
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
.feeds{
  max-width: 700px;
  margin: auto;
  margin-top: 4rem;
}
</style>