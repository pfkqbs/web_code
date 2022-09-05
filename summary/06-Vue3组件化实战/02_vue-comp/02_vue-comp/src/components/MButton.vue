<template>
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
// JSX
// level 1 2 3 4 5 6
// render()  h1 h2 h3 h4 h5 h6
/**
 * if else-if else
 * if(){
 * }else if(){
 * }else if(){
 * }else if(){
 * }
 * if(){
 * }
 * if(){
 * }
 * if(){
 * }
 * 
 */
export default {
  components: {
    LoadingOutlined,
  },
  data() {
    return {
      typeClass: this.type ? `m-button-${this.type}` : null,
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
    isDisabled: {
      type: Boolean,
      default: () => false,
    },
    round: {
      type: Boolean,
      default: () => false,
    },
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
