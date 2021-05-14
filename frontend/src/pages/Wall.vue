<template>
  <div>
    <Header />
    <div class="corps container">
      <div class="row">
        <div class="flux col-xs-12">
          <!-- TODO :Component Ecrire un message  -->
          <Message
            v-for="message in allMessages"
            v-bind:key="message"
            :author="message.Users[0].username"
            :date="message.updatedAt"
          />
        </div>
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
    fetch("http://localhost:3000/v1/messages/", { headers })
      .then((response) => response.json())
      .then((data) => (this.allMessages = data));
  },
};
</script>


<style lang="scss" scoped>
.corps {
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
}


</style>