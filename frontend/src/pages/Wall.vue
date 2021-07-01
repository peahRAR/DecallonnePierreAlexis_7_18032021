<template>
  <div>
    <Header />
    <div class="container">
      <div class="editor container-fluid">
        <div class="container">
          <FakeInput
            :user="userInfo.username"
            type="button"
            class="btn"
            @click="showModal"
          />

          <Modal
          v-show="isModalVisible"
          @close="closeModal"
          valueBtn = "Publier"
          />

        </div>
        <hr class="separator space-bottom" />
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
          :idParent="message.idParent"
          :like="message.advices"
        />
      </div>
    </div>
  </div>
</template>

<script>
// Imports
import Header from "@/components/Header.vue";
import FakeInput from "@/components/FakeInput.vue";
import Message from "@/components/Message.vue";
import Modal from '../components/Modal.vue';

export default {
  name: "wall",
  components: {
    Header,
    FakeInput,
    Message,
    Modal,
  },
  data() {
    return {
      allMessages: null,
      userInfo: JSON.parse(localStorage.getItem("token")),
      isModalVisible: false,
    };
  },
  methods: {
    showModal(){
      this.isModalVisible = true;
    },
    closeModal(){
      this.isModalVisible = false;
    }
  },
  created() {
    const headers = { "Content-Type": "application/json" };
    fetch(`http://${process.env.VUE_APP_URL_BDD}/v1/messages?type=post`, { headers })
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
  margin-top: 13rem;
}

.editor {
  position: fixed;
  height: 100px;
  right: 0;
  left: 0;
  top: 0;
  margin: auto;
  margin-top: 50px;
  z-index: 2;
  padding-top: 25px;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 86%,
    rgba(255, 255, 255, 0) 100%
  );
}

.space-bottom {
  max-width: 700px;
  margin-bottom: 25px;
  margin-top: 2rem;
}
</style>
