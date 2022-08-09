<template>
  <div class="parent1">
    父组件：{{ message }}

    <Child @changeMsg="changeMessage" />
  </div>
  <!-- 自定义 changeMsg 事件 -->
</template>

<script setup>
import { ref } from "vue";
import Child from "./Child.vue";

let message = ref("牛肉");

// 更改 message 的值，data是从子组件传过来的
function changeMessage(data) {
  message.value = data;
}
</script>

<style >
.parent1 {
  border: 2px solid tomato;
  height: 200px;
}
</style>