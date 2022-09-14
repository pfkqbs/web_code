<template>
  <div class="hello">

  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { defineComponent } from "vue";

import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log('key','keyPath',key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log('key','keyPath',key, keyPath);
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
