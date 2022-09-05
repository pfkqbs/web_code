<template>
<!-- 封装按钮组件 -->
  <button class="m-button" :class="[typeClass, isPlain]">
    <!-- 匿名插槽 -->
    <slot name="loading" v-if="loading">
      <LoadingOutlined></LoadingOutlined>
    </slot>
    <slot></slot>
  </button>
  <!-- <h1 v-if='level===1'></h1>
  <h2 v-if='level===2'></h2> -->
</template>

<script>
import { LoadingOutlined } from '@ant-design/icons-vue'



export default {
  components: {
    LoadingOutlined,
  },
  data() {
    return {
      typeClass: this.type ? `m-button-${this.type}` : null,/* 如果传了type 则进行添加class */
      isPlain: this.plain ? `is-plain` : null,
      isDisabled: this.disabled ? 'is-disabled' : null,
    }
  },
  props: {
    type: {
      type: String,
      default: () => '',
    },
    // 是否朴素按钮
    plain: {
      type: Boolean,
      default: () => false,
    },
    // 是否禁用
    isDisabled: {
      type: Boolean,
      default: () => false,
    },
    round: {
      type: Boolean,
      default: () => false,
    },
    // 加载效果
    loading: {
      type: Boolean,
      default: () => false,
    },
  },
}
</script>

<style lang="less" scoped>
@import './MButton.less';
</style>
