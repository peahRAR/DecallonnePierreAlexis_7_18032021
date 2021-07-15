<template>
  <div class="box">
    <div :class="`commentaire-box-${counter}`">
      <div class="commentaire">
        <div class="flex">
          <p class="author" v-if="!userInfo.isInactive">{{ author }}</p>
          <p class="author" v-if="userInfo.isInactive">Utilisateur supprimé</p>
        </div>

        <div class="position-content">
          <div class="content-box" v-if="!modifier">
            <!--Content-->
            <p class="content" ref="content">{{ content }}</p>
            <p class="date">{{ date }}</p>
          </div>
        </div>

        <div class="modifcator">
          <!--Modificateur-->
          <Editor
            v-if="modifier"
            type="comment"
            :id="idMessage"
            :idParent="idMessage"
            :valueContent="content"
            :placeholder="content"
          />
        </div>
      </div>

      <div class="bottom-bar">
        <div class="bottom-bar-content">
          <div class="advice">
            <!--Like-->
            <LikeButton
              v-on:likeAction="advice"
              styleIcon="far fa-thumbs-up"
              color="blue"
              value="1"
              :likeCounter="countLike"
              :actif="userLike"
            />

            <!--Dislike-->
            <LikeButton
              v-on:likeAction="advice"
              styleIcon="far fa-thumbs-down"
              color="red"
              value="0"
              :likeCounter="countDislike"
              :actif="userDislike"
            />
            <button>
              <p v-on:click="answer" v-if="counter < 3">Répondre</p>
            </button>
          </div>
          <div class="config" v-if="userInfo.isAdmin || userInfo.userId === authorId">
            <!--Modifier-->
            <button v-on:click="modificator">
              <i class="fas fa-edit"></i>
              Modifier
            </button>

            <!--Supprimer-->
            <button v-on:click.prevent="deletePost">
              <i class="fas fa-trash-alt"></i> Supprimer
            </button>
          </div>
        </div>
        <div class="answer" v-if="writeAnswer">
          <Editor
            type="comment"
            :valueBtn="'Répondre'"
            :id="id"
            :idParent="idMessage"
            :placeholder="'Votre réponse...'"
          />
        </div>

        <div class="showComment" v-if="allCommentaires?.length > 0">
          <div class="text-inline" v-on:click="openingComment">
            <i class="fas arrow fa-sort-down" :class="openingClass"></i>
            <p>Voir les réponses</p>
          </div>
        </div>

        <div class="subComment" v-if="isOpen">
          <Commentaire
            :counter="counter + 1"
            v-for="commentaire in allCommentaires"
            v-bind:key="commentaire"
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
  </div>
</template>

<script>
import LikeButton from "@/components/LikeButton.vue";
import Editor from "@/components/Editor";

export default {
  name: "Commentaire",
  components: {
    LikeButton,
    Editor,
  },
  data() {
    return {
      userLike: this.like.userReaction.like,
      userDislike: this.like.userReaction.dislike,
      countLike: this.like.nbLike,
      countDislike: this.like.nbDislike,
      allCommentaires: null,
      writeAnswer: false,
      modifier: false,
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

    modificator: function () {
      if (!this.modifier) {
        this.modifier = true;
        return;
      }
      this.modifier = false;
    },

    answer: function () {
      if (!this.writeAnswer) {
        this.writeAnswer = true;
        return;
      }
      this.writeAnswer = false;
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
.box {
  background-color: #061dcc0f;
  border-top: 1px solid rgba(0, 0, 0, 0.171);
}

.author{
  text-transform: capitalize;
}

.commentaire-box-0 {
  padding-left: 0;
}

.commentaire-box-1 {
  margin-left: 1rem;
  border-left: 4px solid rgba(27, 27, 145, 0.495);
}

.commentaire-box-2 {
  margin-left: 2rem;
  border-left: 4px solid rgba(27, 27, 145, 0.495);
}

.commentaire-box-3 {
  margin-left: 3rem;
  border-left: 4px solid rgba(27, 27, 145, 0.495);
}

.commentaire {
  padding: 1rem 15px;
}

.flex {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.7rem;
}

.author {
  font-weight: bold;
}

.position-content {
  display: flex;
}

.content-box {
  display: inline-flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  padding: 5px 10px;
}

.content {
  text-align: left;
  padding-right: 1rem;
}

.date {
  font-size: 11px;
  text-align: right;
  margin-top: 1.5rem;
}

.bottom-bar-content {
  padding: 0.2rem 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.advice {
  display: flex;
}

.boxBtn {
  border: none;
  height: 15px;
  margin: 0;
  padding: 5px;
  opacity: 0.75;
  margin-right: 10px;
  background-color: transparent;
  &:hover {
    background-color: transparent;
    opacity: 1;
  }
}

.flex.boxBtn.active {
  background-color: transparent;
  opacity: 1;
}

.answer {
  padding-bottom: 10px;
}

button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    color: rgba(0, 0, 0, 0.632);
  }
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
</style>