<template>
  <div class="commentaire-box">
    <div class="commentaire">
      <div class="flex">
        <p class="author">{{ author }}</p>
      </div>

      <div class="position-content">
        <div class="content-box">
          <!--Content-->
          <p class="content" ref="content">{{ content }}</p>
          <p class="date">{{ date }}</p>
        </div>
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
        </div>
        <div class="config">
          <!--Modifier-->
          <button>
            <i class="fas fa-edit"></i> Modifier
          </button>

          <!--Supprimer-->
          <button v-on:click.prevent="deletePost">
            <i class="fas fa-trash-alt"></i> Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LikeButton from "@/components/LikeButton.vue";

export default {
  name: "Commentaire",
  components: {
    LikeButton,
  },
  data() {
    return {
      userLike: this.like.userReaction.like,
      userDislike: this.like.userReaction.dislike,
      countLike: this.like.nbLike,
      countDislike: this.like.nbDislike,
      allCommentaires: null,
    };
  },
  props: {
    author: String,
    date: String,
    image: String,
    content: String,
    tag: String,
    id: Number,
    idParent: Number,
    idMessage: Number,
    like: Object,
  },
  methods: {
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
.commentaire-box {
  background-color: #061dcc0f;
}

.commentaire {
  padding: 1rem 15px;
  border-top: 1px solid rgba(0, 0, 0, 0.171);
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
  margin-top: 0.5rem;
}

.bottom-bar {
  border-top: 1px solid rgba(0, 0, 0, 0.171);
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
  &:hover {
    background-color: #f0f3fd;
    opacity: 1;
  }
}

.flex.boxBtn.active {
  background-color: #f0f3fd;
  opacity: 1;
}


button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    color: rgba(0, 0, 0, 0.632);
  }
}
</style>