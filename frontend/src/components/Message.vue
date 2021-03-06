<template>
  <div class="card" v-if="!idParent">
    <div class="header-card">
      <div class="column">
        <p class="author" v-if="!userInfo.isInactive">{{ author }}</p>
        <p class="date">{{ date }}</p>
      </div>
      <div class="flex-right">
        <p v-if="tag" class="tag">
          <i class="icon-tag fas fa-tag"></i>{{ tag }}
        </p>
        <div class="modifier-toggle" v-if="userInfo.isAdmin || userInfo.userId === authorId">
          <input
            type="checkbox"
            name="toggle"
            :id="`modifier-checkbox-${idMessage}`"
            class="modifier-checkbox"
            ref="checkboxInput"
          />

          <Modal
            v-show="isModalVisible"
            @close="closeModal"
            valueBtn="Modifier"
            :valueTag="tag"
            :valueContent="content"
            :valueAttachement="image"
            :id="idMessage"
          >
            <template v-slot:header>
              <p class="header-txt">Modifier la publication</p>
            </template>
          </Modal>

          <label
            :for="`modifier-checkbox-${idMessage}`"
            class="modifier-toggle"
          >
            <i class="adminOption fas fa-ellipsis-h"></i>
          </label>

          <ul :id="`option-${idMessage}`" class="option">
            <li class="elem">
              <button v-on:click.prevent="showModal">
                <i class="fas fa-edit"></i> Modifier
              </button>
            </li>
            <li class="elem">
              <button v-on:click.prevent="deletePost">
                <i class="fas fa-trash-alt"></i> Supprimer
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="header-content">
      <p class="content" ref="content">{{ content }}</p>
    </div>
    <div class="img-card">
      <img ref="attachement" :src="imageUrl" v-if="image" />
    </div>
    <div class="likeBar">
      <LikeButton
        v-on:likeAction="advice"
        styleIcon="far fa-thumbs-up"
        color="blue"
        value="1"
        :likeCounter="countLike"
        :actif="userLike"
      />
      <LikeButton
        v-on:likeAction="advice"
        styleIcon="far fa-thumbs-down"
        color="red"
        value="0"
        :likeCounter="countDislike"
        :actif="userDislike"
      />
    </div>

    <div class="comment">
      <div class="writeComment">
        <Editor
          type="comment"
          :valueBtn="'Envoyer'"
          :id="id"
          :idParent="idMessage"
          :placeholder="'Votre commentaire...'"
        />
      </div>

      <div class="showComment" v-if="allCommentaires?.length > 0">
        <div class="text-inline" v-on:click="openingComment">
          <i class="fas arrow fa-sort-down" :class="openingClass"></i>
          <p>Voir les commentaires</p>
        </div>
      </div>

      <div class="listComment" v-if="isOpen">
        <!--liste de commentaire -->
        <Commentaire
          v-for="commentaire in allCommentaires"
          v-bind:key="commentaire"
          :counter="0"
          :author="commentaire.user"
          :authorId="commentaire.userId"
          :date="commentaire.updatedAt.toLocaleString().replace(',', ' ')"
          :content="commentaire.content"
          :image="commentaire.attachement"
          :idMessage="commentaire.id"
          :idParent="commentaire.idParent"
          :like="commentaire.advices"
          :userInfo="userInfo"
         
        />
      </div>
    </div>
  </div>
</template>

<script>
// Import
import LikeButton from "@/components/LikeButton.vue";
import Commentaire from "@/components/Commentaire.vue";
import Modal from "@/components/Modal.vue";
import Editor from "./Editor.vue";

export default {
  name: "Message",
  components: {
    LikeButton,
    Modal,
    Editor,
    Commentaire,
  },
  data() {
    return {
      userLike: this.like.userReaction.like,
      userDislike: this.like.userReaction.dislike,
      countLike: this.like.nbLike,
      countDislike: this.like.nbDislike,
      isModalVisible: false,
      allCommentaires: null,
      isOpen: false,
      openingClass: "close",
    };
  },
  props: {
    author: String,
    authorId: Number,
    date: String,
    image: String,
    content: String,
    tag: String,
    id: Number,
    idParent: Number,
    idMessage: Number,
    like: Object,
    counter: Number,
    userInfo: Object
  },
  created() {
    const headers = { "Content-Type": "application/json" };
    fetch(
      `http://${process.env.VUE_APP_URL_BDD}/v1/messages?type=comment&idparent=${this.idMessage}`,
      { headers }
    )
      .then((response) => response.json())
      .then(
        (data) =>
          (this.allCommentaires = data.map((commentaire) => {
            return {
              ...commentaire,
              updatedAt: new Date(commentaire.updatedAt),
            };
          }))
      );
  },
  mounted: function () {
    let input = this.$refs.checkboxInput;
    let body = document.querySelector("body");

    if (input) {
      input.addEventListener("click", (e) => {
        e.stopPropagation();
        if (this.$refs.checkboxInput.checked) {
          body.addEventListener("click", (e) => {
            e.stopPropagation();
            this.$refs.checkboxInput.checked = false;
          });
        }
      });
    }
  },
  computed: {
    imageUrl() {
      return `http://${process.env.VUE_APP_URL_BDD}${this.image}`;
    },
  },
  methods: {
    openingComment: function () {
      if (!this.isOpen) {
        this.isOpen = true;
        this.openingClass = "open";
        return;
      }
      this.isOpen = false;
      this.openingClass = "close";
    },

    // Gestion Modal
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },

    // Methode delete Post
    deletePost: function () {
      let token = localStorage.getItem("token");
      token = JSON.parse(token);
      token = token.token;
      const headers = {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      };
      fetch(
        `http://${process.env.VUE_APP_URL_BDD}/v1/messages/${this.idMessage}`,
        { method: "delete", headers }
      );
      document.location.reload();
    },

    // Methode suppression de Like
    deleteAdvice: function () {
      let token = localStorage.getItem("token");
      token = JSON.parse(token);
      token = token.token;
      const headers = {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      };
      fetch(
        `http://${process.env.VUE_APP_URL_BDD}/v1/messages/${this.idMessage}/delete`,
        { method: "delete", headers }
      );
    },

    addAdvice: function (value) {
      let token = localStorage.getItem("token");
      token = JSON.parse(token);
      token = token.token;
      const headers = {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      };
      fetch(
        `http://${process.env.VUE_APP_URL_BDD}/v1/messages/${this.idMessage}/${value}`,
        { method: "POST", headers }
      ).then((response) => response.json());
    },

    //logique du system de like
    advice: function (value) {
      // Gestion suppression d'un like ou dislike
      const likeValue = +value.value;

      // Premier avis
      // Like
      if (likeValue === 1) {
        // Si déja like et veux supprimer son avis
        if (this.userLike) {
          this.countLike -= 1;
          this.userLike = false;
          this.userDislike = false;
          this.deleteAdvice();
        }
        // Si dislike et change d'avis
        else if (this.userDislike) {
          this.countDislike -= 1;
          this.countLike += 1;
          this.userLike = true;
          this.userDislike = false;
          this.addAdvice(likeValue);
        }
        // Premier avis
        else {
          this.countLike += 1;
          this.userLike = true;
          this.userDislike = false;
          this.addAdvice(likeValue);
        }
      }

      // Dislike
      if (likeValue === 0) {
        // Si deja Dislike et veux supprimer son avis
        if (this.userDislike) {
          this.countDislike -= 1;
          this.userLike = false;
          this.userDislike = false;
          this.deleteAdvice();
        }
        // Si like et change d'avis
        else if (this.userLike) {
          this.userDislike = true;
          this.userLike = false;
          this.countLike -= 1;
          this.countDislike += 1;
          this.addAdvice(likeValue);
        }
        // Premier avis
        else {
          this.countDislike += 1;
          this.userDislike = true;
          this.userLike = false;
          this.addAdvice(likeValue);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
//Variables
$dark-blue: #081f43;
$border: 1px solid #091f4317;

.card {
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background: inherit;
  overflow: hidden;
  margin-bottom: 2rem;
  &::before {
    content: "";
    position: absolute;
    background: inherit;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.5);
    filter: blur(10px);
    margin: -20px;
  }

  [id^="option"] {
    li {
      text-decoration: none;
      &:hover {
        background-color: #254574;
        color: white;
      }
    }
  }

  .option {
    display: none;
    margin-top: 15px;
    position: absolute;
    cursor: pointer;
    color: #091f43;
    line-height: 2rem;
    height: 2rem;
    width: 2rem;
    font-size: 0.9rem;
    filter: drop-shadow(0 0.0625rem 0.0625rem rgba(0, 0, 0, 0.3));
    &::before {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      bottom: 100%;
      left: 4.4rem;
      border: 0.75rem solid transparent;
      border-top: none;
      border-bottom-color: #fff;
      filter: drop-shadow(0 -0.0625rem 0.0625rem rgba(0, 0, 0, 0.1));
    }
    .elem {
      &:hover button {
        color: white;
      }
      &:first-child {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }
      &:last-child {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
      }
      button {
        border: none;
        background: none;
        cursor: pointer;
      }
    }
  }

  .modifier-checkbox:checked ~ label i {
    background-color: #081f43;
    border-radius: 25px;
    color: #fff;
  }

  .modifier-checkbox:checked ~ .option {
    display: flex;
    flex-direction: column;
    width: 100px;
    z-index: 4;
    transform: translate(-48px, -16px);
  }

  .header-txt {
    margin: auto;
    font-size: 18px;
    font-weight: 600;
  }

  .adminOption {
    height: 20px;
    width: 20px;
    padding: 5px;
    &:hover {
      background: $dark-blue;
      border-radius: 25px;
      color: white;
    }
  }

  .elem {
    background-color: white;
  }

  .modifier-checkbox {
    opacity: 0;
  }

  .header-card {
    padding: 0.8rem 1rem 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: $border;
  }

  .author {
    display: flex;
    font-weight: bold;
    font-size: 0.94rem;
    color: #091f43;
    text-transform: capitalize;
    margin-bottom: 3px;
  }

  .date {
    display: flex;
    font-size: 0.75rem;
    color: #0000007e;
  }

  .content {
    font-size: 0.94rem;
    display: flex;
    padding: 1rem 1rem 1.15rem 1rem;
    text-align: left;
    line-height: 1.33rem;
  }

  .img-card {
    position: relative;
    display: inline-block;
    img {
      display: block;
      width: 100%;
      object-fit: contain;
    }
  }

  .flex-right {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .fa-tag {
    margin-right: 0.4rem;
  }

  .tag {
    cursor: default;
    font-size: 0.75rem;
    padding: 0.3rem 0.8rem;
    margin-right: 15px;
    font-weight: bold;
    text-transform: capitalize;
    background-color: $dark-blue;
    color: white;
    border-radius: 50px;
  }

  .likeBar {
    display: flex;
    justify-content: space-between;
  }

  .showComment {
    height: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .arrow {
    font-size: 25px;
    margin-right: 8px;
    margin-bottom: 8px;
  }

  .text-inline {
    align-items: center;
    display: flex;
    justify-content: center;
    line-height: 25px;
    cursor: pointer;
  }

  .close {
    transform: rotate(-90deg);
    margin-bottom: 3px;
    margin-right: 15px;
  }
}
</style>
