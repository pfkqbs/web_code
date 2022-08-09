<template>
  <div class="child">
    {{ msg }}
  </div>
</template>

<script setup>
const props = defineProps({
  msg: {
    type: String,
    default: "",
  },
});

console.log(props.msg); // 在 js 里需要使用 props.xxx 的方式使用。在 html 中使用不需要 props
</script>
<style >
    .child{
        border: 2px solid skyblue;
        height: 100px;
    }
</style>