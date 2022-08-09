<template>
  <div class="child">子组件：{{ message }}</div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('蟑螂恶霸')

function changeMessage(data) {
  message.value = data
}

//使用 defineExpose 向外暴露指定的数据和方法
defineExpose({
  message,
  changeMessage
})

</script>

<style >
    .child{
        border: 2px solid skyblue;
        height: 100px;
    }
</style>