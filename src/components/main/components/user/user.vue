<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick">
      <Avatar :src="userAvator"/>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem>{{department}}</DropdownItem>
        <DropdownItem>{{role}}</DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <h3 class="backindex" @click="backind">返回主页</h3>
  </div>
</template>

<script>

import "./user.less";
import { mapActions } from "vuex";
export default {
  name: "User",
  props: {
    userAvator: {
      type: String,
      default: ""
    },
    department: {
      type: String,
      default: ""
    },
    role: {
      type: String,
      default: ""
    }
  },
  methods: {
      backind() {
          this.$router.push({
              name: "index"
          });
      },
    ...mapActions(["handleLogOut"]),
    handleClick(name) {
      switch (name) {
        case "logout":
          this.handleLogOut().then(() => {
            this.$router.push({
              name: "login"
            });
          });
          break;
      }
    },
  }
};
</script>
<style>
  .backindex {
    display: inline-block;
    margin-left: 20px;

  }
</style>
