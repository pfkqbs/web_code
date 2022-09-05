<template>
  <div>
    <TestPop ref="popRef" :msg="message"></TestPop>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue'
import TestPop from './TestPop'
const message = ref('hello pop')
const popRef = ref(null)
// popRef.value.handleShow()
onMounted(() => {
  setTimeout(async () => {
    message.value = '小马哥'
    await nextTick()
    popRef.value.handleShow()
  }, 2000)
})
</script>

<style lang="less" scoped></style>
