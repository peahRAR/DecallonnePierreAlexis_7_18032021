<template>
  <div class="card">
    <div class="header-card">
      <div class="column">
        <p class="author">{{ author }}</p>
        <p class="date">{{ date }}</p>
      </div>
      <ul class="option fas fa-ellipsis-h"></ul>
    </div>
    <div class="header-content">
      <p class="content">{{ content }}</p>
    </div>
    <div class="img-card">
      <img :src="imageUrl" />
      <p class="tag"><i class="icon-tag fas fa-tag"></i>{{ tag }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    author: String,
    date: String,
    image: String,
    content: String,
    tag: String,
  },
  computed: {
    imageUrl() {
      return `http://${process.env.VUE_APP_URL_BDD}${this.image}`;
    },
  },
};
</script>

<style lang="scss" scoped>

//Variables
$dark-blue : #081f43;
$border: 1px solid #091f4317;


.card {
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  position: relative;
  z-index: 1;
  background: inherit;
  overflow: hidden;
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
  font-size: 1.15rem;
  color: #091f43;
}

.date {
  display: flex;
  font-size: 0.8rem;
  color: #0000007e;
}

.option {
  cursor: pointer;
  color: #091f43;
  line-height: 2rem;
  height: 2rem;
  width: 2rem;
  &:hover {
    color: white;
    background-color: #081f43;
    border-radius: 50%;
  }
}

.content {
  font-size: 1.15rem;
  display: flex;
  padding: 1rem 1rem 1.15rem 1rem;
}

.img-card {
  position: relative;
  display: inline-block;
  img {
    width: 100%;
    object-fit: contain;
  }
}

.fa-tag {
  margin-right: 0.4rem;
}

.img-card .tag {
  cursor: default;
  margin: 3%;
  padding: 0.3rem 0.8rem;
  text-transform: capitalize;
  background-color: $dark-blue;
  box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.25),
    -8px -8px 12px 0 rgba(149, 142, 216, 0.132);
  border-radius: 50px;
  color: white;
  font-weight: bold;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}


</style>
