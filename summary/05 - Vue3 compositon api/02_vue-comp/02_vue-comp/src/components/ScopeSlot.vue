<template>
  <ul>
    <li v-for="item in items" :key="item">
      <slot :item="item"></slot>
      <slot :item='item' name='lisi'></slot>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      items: ['张三', '李四'],
    }
  },
}
</script>

<style lang="less" scoped></style>
