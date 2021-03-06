<template>
  <form @submit.prevent="sendPost" class="post">
    <!-- TAG -->
    <div class="tagBox">
      <label for="tag">Tag : </label>
      <input
        v-model="message.tags"
        class="tag"
        name="tag"
        :id="`tag${message.id}`"
        type="text"
        maxlength="20"
        placeholder="un mot de 20 caractères max."
      />
    </div>

    <!-- PREVIEW ATTACHEMENT -->

    <div class="image-preview">
      <p class="close" @click="close" :class="{ hidden: hidden }">
        <i class="fas fa-times cross"></i>
      </p>
      <img
        :id="`preview${message.id}`"
        class="preview"
        :src="imageUrl || message.imageUpdated"
      />
    </div>

    <!-- CONTENT -->
    <div class="txtArea">
      <textarea
        v-model="message.content"
        @input="$emit('input', message)"
        name="message"
        :id="`message${message.id}`"
        cols="30"
        rows="10"
        maxlength="500"
        :placeholder="`Exprimez vous, ${userInfo.username} !`"
        required
      ></textarea>
      <p class="counter">{{ charactersCounter }}</p>
    </div>

    <!-- UPLOAD ATTACHEMENT -->
    <div class="addFile">
      <div class="column">
        <label class="bold" for="fileUpload">Ajouter un fichier :</label>
        <p class="baseline">Formats supportés : .jpg .jpeg .png .gif</p>
      </div>
      <input
        @change="previewImage"
        :id="`fileUpload${message.id}`"
        ref="file"
        type="file"
        hidden
      />

      <!-- BOUTON CREATE/MODIFY POST -->
      <button class="btn-picture" @click.prevent="chooseFiles()">
        <i class="far fa-image picture-img"></i>
      </button>
    </div>
    <div class="row align-right">
      <button class="btn-post col-xs-4" type="submit" value="sendPost">
        {{ valueBtn }}
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "Post",
  props: {
    valueBtn: String,
    valueTag: String,
    valueContent: String,
    valueAttachement: String,
    id: Number,
  },
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem("token")),
      imageData: "",
      hidden: false,
      message: {
        tags: null,
        content: null,
        attachement: null,
        idParent: null,
        userId: null,
        id: null,
        imageUpdated:null
      },
    };
  },

  mounted: function () {
    this.message.attachement = this.valueAttachement;
    this.message.tags = this.valueTag;
    this.message.content = this.valueContent;
    this.message.id = this.id;
    if (this.message.attachement) {
      this.hidden = false
    }
  },

  computed: {
    // TRANSFORME URL RELATIF EN ABSOLUE
    imageUrl() {
      if (this.message.attachement) {
        return `http://${process.env.VUE_APP_URL_BDD}${this.message.attachement}`;
      } else {
        return null;
      }
    },

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
    async sendPost() {
      // Recupération Token
      let token = localStorage.getItem("token");
      token = JSON.parse(token);
      token = token.token;

      // Recuperation du fichier attachement
      const inputFile = document.getElementById("fileUpload" + this.message.id);

      // Recuperation des données du message
      let message = new FormData();

      // Recuperation Attachement
      if (this.message.imageUpdated) {
        message.append("attachement", inputFile.files[0]);
      } else{
        message.append("attachement", this.message.attachement);
      }

      // Recuperation content
      if (this.message.content) {
        message.append("content", this.message.content);
      }

      // Recuperation tag
      if (this.message.tags) {
        message.append("tags", this.message.tags);
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

        // Modification message
      } else {
        fetch(`http://${process.env.VUE_APP_URL_BDD}/v1/messages/${this.id}`, {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: message,
        });
      }
      document.location.reload();
    },

    // UPLOAD ATTACHEMENT
    chooseFiles: function () {
      document.getElementById("fileUpload" + this.message.id).click();
    },

    // PREVIEW
    previewImage: function (event) {
      this.file = this.$refs.file.files[0];
      let input = event.target;
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = () => {
          this.message.imageUpdated = String(reader.result);
          document.getElementById("preview" + this.message.id).src = this.message.imageUpdated;
          if (this.message.imageUpdated) {
            this.hidden = false;
          }
        };
        reader.readAsDataURL(input.files[0]);
      }
    },

    // SUPPRESSION ATTACHEMENT
    close() {
      this.message.attachement = null;
      this.message.imageUpdated = null;
      this.hidden = true;
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
  margin: 0 10px 15px auto;
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

.hidden{
  display: none;
}
</style>
