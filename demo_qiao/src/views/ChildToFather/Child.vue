<template>
  <div class="child">
    子组件：<button @click="handleClick">子组件的按钮</button>
  </div>
</template>

<script setup>

// 注册一个自定义事件名，向上传递时告诉父组件要触发的事件。
const emit = defineEmits(['changeMsg'])

function handleClick() {
  // 参数1：事件名
  // 参数2：传给父组件的值
  emit('changeMsg', '红烧肉')
}

</script>
<style >
    .child{
        border: 2px solid skyblue;
        height: 100px;
    }
</style>