<template>
  <div v-show="isShow">{{ msg }}</div>
</template>

<script setup>
import {
  defineProps,
  ref,
  defineExpose,
  defineEmits,
  provide,
  inject,
  defineComponent
} from 'vue'
const props = defineProps(['msg'])
// const emit = defineEmits('update')
// emit('update')
const isShow = ref(false)
const handleShow = () => {
  isShow.value = true
  //   发请求 msg发送给后端
  console.log(props.msg)
}
defineExpose({
  handleShow,
})
</script>

<style lang="less" scoped></style>
