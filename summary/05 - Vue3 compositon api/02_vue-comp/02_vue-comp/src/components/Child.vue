<template>
  <div class="divClass">

    <p :style="{ fontSize: size + 'px' }">{{ myTitle }}</p>

    <h3>{{ colorName }}</h3>

    <button @click="$emit('changeSize', 1)">改变字体大小</button>

    <m-inject></m-inject>

  </div>
</template>

<script>
import MInject from './MInject.vue'
export default {
  name: 'Child',
  components: {
      MInject,
  },
  
  // 父传子通过props
  //   props: ['myTitle','colorName','size'],
  props: {
    myTitle: {
      type: String,
    },
    colorName: {
      type: String,
      default: () => 'black',
    },
    size: {
      type: Number,
      default: () => 12,
    },
  },
  emits: ['changeSize'],
}
</script>

<style lang="less" scoped>
.divClass{
  border:2px solid #555;
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
