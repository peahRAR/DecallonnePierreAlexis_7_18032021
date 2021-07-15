<template>
  <div class="tableLine">
    <li class="line">
      <p class="username">{{ username }}</p>
      <div class="isAdmin">
        <p class="admin-txt">Admin :</p>
        <label class="switch">
          <input
            type="checkbox"
            ref="checkboxAdmin"
            :id="`checkbox-${userId}`"
            v-on:click="updateAdmin"
          />
          <span class="slider round"></span>
        </label>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      dataAdmin: this.isAdmin,
    };
  },
  props: {
    username: String,
    isAdmin: Boolean,
    userId: Number,
  },
  mounted: function () {
    let input = this.$refs.checkboxAdmin;
    if (this.dataAdmin) {
      input.checked = true;
    } else {
      input.checked = false;
    }
  },
  methods: {
    updateAdmin: function () {
      let token = localStorage.getItem("token");
      token = JSON.parse(token);
      token = token.token;

      const headers = {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      };
      fetch(`http://${process.env.VUE_APP_URL_BDD}/v1/users/${this.userId}`, {
        method: "PUT", headers
      }).then((response) => {
        const jsonResponse = response.json();

        if (response.status === 200) {
          jsonResponse.then((result) => {
            const data = result;
            return data
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.username {
  text-transform: capitalize;
  font-weight: bold;
}

.isAdmin {
  display: flex;
  align-items: center;
}

.admin-txt {
  margin-right: 7px;
}

.tableLine {
  border: 1px solid grey;
  border-bottom: none;
  padding: 0.5rem 1rem;
  &:nth-child(even){
      background-color: #dfdde8de;
  }
  &:last-child{
      border-bottom: 1px solid grey;
  }
}

.line {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  transform: scale(0.8);
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #091F43;
}

input:focus + .slider {
  box-shadow: 0 0 1px #091F43;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
