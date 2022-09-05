<template>
  <div class="m-space" :class="[`m-space-${direction}`]" style="gap: 8px">
      <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    // vertical
    direction: {
      type: String,
      default: () => 'horizontal',
    },
  },
}
</script>

<style lang="less" scoped>
.m-space {
  display: inline-flex;
}
.m-space-vertical {
  flex-direction: column;
}
</style>
