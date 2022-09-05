<template>
  <div></div>
</template>

<script>
import mitt from '../utils/mitt'
export default {
  // 生命周期方法
  mounted() {
    //   观察者
    mitt.on('sendMsg', (val) => {
      console.log(val)
    })
  },
}
</script>

<style lang="less" scoped></style>
