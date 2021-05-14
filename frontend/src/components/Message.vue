<template>
  <div class="card flex-column">
    <div class="header-card">
      <p class="author">{{ author }}</p>
      <p class="date">{{ date }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    author: String,
    date: String,
  },
};
</script>

<style lang="scss" scoped>
.flex-column {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.header-card{
    width: 95%;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.author {
  display: flex;
  justify-content: flex-start;
}

.date {
  display: flex;
  justify-content: flex-end;
}
</style>
