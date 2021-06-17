<template>
  <form @submit.prevent="sendPost" class="post">
    <div class="tagBox">
      <label for="tag">Tag : </label>
      <input
        v-model="message.tags"
        class="tag"
        name="tag"
        id="tag"
        type="text"
        maxlength="20"
        placeholder="un mot de 20 caractères max."
      />
    </div>

    <!-- PREVIEW -->

    <div class="image-preview" v-if="imageData.length > 0">
      <p class="close" @click="close">
        <i class="fas fa-times cross"></i>
      </p>
      <img class="preview" :src="imageData" />
    </div>

    <div class="txtArea">
      <textarea
        v-model="message.content"
        @input="$emit('input', message)"
        name="message"
        id="message"
        cols="30"
        rows="10"
        maxlength="500"
        :placeholder="`Exprimez vous, ${userInfo.username} !`"
        required
      ></textarea>
      <p class="counter">{{ charactersCounter }}</p>
    </div>

    <div class="addFile">
      <div class="column">
        <label class="bold" for="fileUpload">Ajouter un fichier :</label>
        <p class="baseline">Formats supportés : .jpg .jpeg .png .gif</p>
      </div>
      <input
        @change="previewImage"
        id="fileUpload"
        ref="file"
        type="file"
        hidden
      />
      <button class="btn-picture" @click.prevent="chooseFiles()">
        <i class="far fa-image picture-img"></i>
      </button>
    </div>
    <div class="row align-right">
      <button class="btn-post col-xs-4" type="submit" value="sendPost">
        {{valueBtn}}
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "Post",
  props: {
    valueBtn : String,
    valueTag : String,
    valueContent : String,
    valueAttachement : String,
  },
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem("token")),
      imageData: "",
      message: {
        tags: null,
        content: null,
        attachement: null,
        idParent: null,
        userId: null,
      },
    };
  },

  mounted: function() {
    this.message.tags = this.valueTag
    this.message.content = this.valueContent
    this.message.attachement = this.valueAttachement
  },

  computed: {
    charactersCounter() {
      let limit = 500;

      if (this.message.content) {
        return limit - this.message.content.length + " / " + limit;
      }
      return limit + " / " + limit;
    },
  },
  methods: {
    async sendPost() {
      // Recupération Token
      let token = localStorage.getItem("token");
      token = JSON.parse(token);
      token = token.token;

      // Recuperation du fichier attachement
      const inputFile = document.getElementById("fileUpload");

      // Creation message
      let message = new FormData();
      if (inputFile.files[0]) {
        message.append("attachement", inputFile.files[0]);
      }
      if (this.message.content) {
        message.append("content", this.message.content);
      }
      if (this.message.tags) {
        message.append("tags", this.message.tags);
      }

      console.log(message.tags);

      fetch(`http://${process.env.VUE_APP_URL_BDD}/v1/messages`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: message,
      });
      document.location.reload();
    },

    chooseFiles: function () {
      document.getElementById("fileUpload").click();
    },

    previewImage: function (event) {
      this.file = this.$refs.file.files[0];
      let input = event.target;
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = () => {
          this.imageData = String(reader.result);
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    close() {
      this.imageData = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.post {
  display: flex;
  flex-direction: column;
  width: 100%;
}

label {
  margin-right: 10px;
}

.tagBox {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 15px;
}

.tag {
  border-radius: 25px;
  height: 25px;
  width: 40%;
  outline: none;
  border: 1px solid grey;
  padding-left: 10px;
}

.bold {
  font-weight: bold;
}

.txtArea {
  width: 100%;
  display: flex;
  flex-direction: column;
}

textarea {
  resize: none;
  width: 100%;
  border: none;
  outline: none;
  font-size: 20px;
  font-family: "Montserrat";
}

.counter {
  font-size: 12px;
  width: fit-content;
  color: white;
  text-align: end;
  margin: 0 0 15px auto;
  background-color: #081f43;
  border-radius: 10px;
  padding: 3px 8px;
}

.addFile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #eeeeee;
  margin: 0 10px;
}

.column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.baseline {
  font-size: 15px;
  color: rgba(128, 128, 128, 0.694);
}

.picture-img {
  font-size: 30px;
  color: green;
  height: 35px;
  width: 35px;
  padding: 5px;
  padding-top: 10px;
  &:hover {
    background-color: #eeeeee;
    border-radius: 50%;
  }
}

.btn-picture {
  background: none;
  border: none;
  outline: none;
}

.image-preview {
  position: relative;
}

.close {
  position: absolute;
  top: 0;
  right: 0;
  color: white;
  margin: 10px 30px 0 0;
}

.cross {
  font-size: 25px;
  font-weight: bold;
  height: 30px;
  width: 30px;
  cursor: pointer;
  &:hover {
    color: #808080c2;
  }
}

.preview {
  width: 100%;
  max-height: 40vh;
  object-fit: cover;
  margin-bottom: 20px;
}

.align-right {
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
}

.btn-post {
  margin-top: 1.5rem;
  background-color: #081f43;
  color: white;
  font-weight: bold;
  padding: 0.3rem 0.8rem;
  border-radius: 5px;
  font-size: 15px;
  outline: none;
  border: none;
  cursor: pointer;
}
</style>
