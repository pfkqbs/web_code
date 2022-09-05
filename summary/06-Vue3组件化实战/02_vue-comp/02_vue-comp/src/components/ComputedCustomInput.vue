<template>
  <input type="text" v-model="myValue" />
</template>

<script>
//就可以在组件中直接使用v-model
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  computed: {
    myValue: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:modelValue', val)
      },
    },
  },
}
</script>

<style lang="less" scoped></style>
