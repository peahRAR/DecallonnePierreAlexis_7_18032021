<template>
  <div class="card">
    <div class="header-card">
      <div class="column">
        <p class="author">{{ author }}</p>
        <p class="date">{{ date }}</p>
      </div>
      <div class="flex-right">
        <p v-if="tag" class="tag">
          <i class="icon-tag fas fa-tag"></i>{{ tag }}
        </p>
        <ul class="option fas fa-ellipsis-h"></ul>
      </div>
    </div>
    <div class="header-content">
      <p class="content">{{ content }}</p>
    </div>
    <div class="img-card">
      <img :src="imageUrl" v-if="image" />
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
  </div>
</template>

<script>
// Import
import LikeButton from "@/components/LikeButton.vue";

export default {
  name: "Message",
  components: {
    LikeButton,
  },
  props: {
    author: String,
    date: String,
    image: String,
    content: String,
    tag: String,
    idMessage: Number,
    like: Object,
  },
  data() {
    return {
      userLike: this.like.userReaction.like,
      userDislike: this.like.userReaction.dislike,
      countLike: this.like.nbLike,
      countDislike: this.like.nbDislike,
    };
  },
  computed: {
    imageUrl() {
      return `http://${process.env.VUE_APP_URL_BDD}${this.image}`;
    },
  },
  methods: {
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
}

.date {
  display: flex;
  font-size: 0.75rem;
  color: #0000007e;
}

.option {
  cursor: pointer;
  color: #091f43;
  line-height: 2rem;
  height: 2rem;
  width: 2rem;
  font-size: 0.9rem;
  &:hover {
    color: white;
    background-color: #081f43;
    border-radius: 50%;
  }
}

.content {
  font-size: 0.94rem;
  display: flex;
  padding: 1rem 1rem 1.15rem 1rem;
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
  box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.112),
    -8px -8px 12px 0 rgba(149, 142, 216, 0.057);
  border-radius: 50px;
}

.likeBar {
  display: flex;
  justify-content: space-between;
}
</style>
