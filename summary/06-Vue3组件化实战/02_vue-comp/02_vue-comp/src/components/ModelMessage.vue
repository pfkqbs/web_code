<template>
  <div>
    {{ myKey }}-{{ myValue }}
    <button @click="handleClick">传递</button>
  </div>
</template>

<script>
export default {
  // name-张三
  // age-28
  props: ['myKey', 'myValue'],
  
  methods: {
    handleClick() {
      this.$emit('update:myKey', 'age')
      this.$emit('update:myValue', 28)
    },
  },
}
</script>

<style lang="less" scoped></style>
