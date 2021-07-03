<template>
  <div class="inputComment">
    <form>
      <ResizeAuto>
        <template v-slot:default="{ resize }">
          <textarea
            v-model="message.content"
            @keydown.enter="submitCom"
            maxlength="500"
            :id="`comment${idParent}`"
            ref="textArea"
            @input="resize"
            class="textArea"
            :placeholder="placeholder"
            required
          ></textarea>
          <div class="toolbar flex">
            <div class="counter">{{ charactersCounter }}</div>
          </div>
        </template>
      </ResizeAuto>
    </form>
  </div>
</template>

<script>
import ResizeAuto from "@/components/elemEditor/ResizeAuto";

export default {
  name: "Comment",
  components: {
    ResizeAuto,
  },
  data() {
    return {
      message: {
        tags: null,
        content: null,
        attachement: null,
        idParent: null,
        userId: null,
        id: null,
        imageUpdated: null,
      },
    };
  },
  props: {
    valueBtn: String,
    valueContent: String,
    id: Number,
    idParent: Number,
    placeholder: String,
  },
  mounted: function () {
    this.message.idParent = this.idParent;
    this.message.content = this.valueContent;
  },
  computed: {
    // COMPTEUR
    charactersCounter() {
      let limit = 500;

      if (this.message.content) {
        return limit - this.message.content.length + " / " + limit;
      }
      return limit + " / " + limit;
    },
  },
  methods: {
    async submitCom(e) {
      e.preventDefault();

      console.log(this.message.content);

      // Recupération Token
      let token = localStorage.getItem("token");
      token = JSON.parse(token);
      token = token.token;

      // Recuperation des données du message
      let message = new FormData();

      // Recuperation content
      if (this.message.content) {
        message.append("content", this.message.content);
      }

      // Recuperation de l'ID Parent
      console.log(this.message.idParent);
      if (this.message.idParent) {
        message.append("idParent", this.message.idParent);
      }

      // Creation Message
      if (!this.id) {
        fetch(`http://${process.env.VUE_APP_URL_BDD}/v1/messages`, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: message,
        });
      }

      // Modification message
      else {
        fetch(`http://${process.env.VUE_APP_URL_BDD}/v1/messages/${this.id}`, {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: message,
        });
      }

      //Réinitialization du TextArea
      document.location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  margin: 0.5rem 0;
}

.textArea {
  width: 90%;
  height: 24px;
  resize: none;
  border-radius: 15px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  padding-top: 0.5rem;
  padding-left: 1rem;
  margin: auto;
  font-size: 15px;
  font-family: "Montserrat";
  &:hover {
    outline: none;
  }
  &:focus-visible {
    outline: none;
  }
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 90%;
  padding-left: 1.12rem;
  border: 1px solid rgba(0, 0, 0, 0.571);
  border-top: none;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  height: 1rem;
  margin: auto;
  margin-top: -3px;
  background-color: #061dcc0f;
}

.counter {
  padding-right: 1rem;
  font-size: 0.8rem;
}
</style>