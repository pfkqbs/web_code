<template>
<div class="parent1">
    这是父组件  这有数据  {{message}} 要传递给子组件
  <!-- 使用子组件 -->
  <Child :msg="message" />
</div>

</template>

<script setup>
import Child from './Child.vue' // 引入子组件

let message = 'Son Name'
</script>
<style >
.parent1{
    border: 2px solid tomato;
    height: 200px;
}
</style>