<template>
  <div class="parent1">
    父组件：拿到子组件的message数据：{{ msg }}

    <button @click="callChildFn">调用子组件的方法</button>

    <hr />

    <Child ref="com" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Child from "./Child.vue";

const com = ref(null); // 通过 模板ref 绑定子组件

const msg = ref("");

onMounted(() => {
  // 在加载完成后，将子组件的 message 赋值给 msg
  msg.value = com.value.message;
});

function callChildFn() {
  // 调用子组件的 changeMessage 方法
  com.value.changeMessage("蒜头王八");

  // 重新将 子组件的message 赋值给 msg
  msg.value = com.value.message;
}
</script>

<style >
.parent1 {
  border: 2px solid tomato;
  height: 200px;
}
</style>