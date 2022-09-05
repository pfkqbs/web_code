<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      exposeVal: 'hello',
    }
  },
  methods: {
    valid() {
      console.log('这是子组件的方法')
    },
  },
}
</script>

<style lang="scss" scoped></style>
