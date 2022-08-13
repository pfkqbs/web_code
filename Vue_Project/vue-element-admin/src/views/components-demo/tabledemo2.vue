<template>
  <div class="home">
    <div v-for="(item, index) in items" :key="index">{{ item }}</div>
    <button @click="btn()">修改</button>
  </div>
</template>
 
<script>
import Vue from "vue"; // 别忘了引入
export default {
  name: "Home",
  data() {
    return {
      items: [1, 2, 3],
    };
  },
  methods: {
    btn() {
      Vue.set(this.items, 1, "two");
      console.log(this.items);
    },
  },
};
</script>

