<template>
  <div>
    <!-- 发消息的组件 -->
    <button @click="handleSendMsg">发消息</button>
  </div>
</template>

<script>
// vuex  pinia
import mitt from '../utils/mitt'
export default {
  methods: {
    handleSendMsg() {
      mitt.emit('sendMsg', '我是mittA的值')
    },
  },
}
</script>

<style lang="less" scoped></style>
