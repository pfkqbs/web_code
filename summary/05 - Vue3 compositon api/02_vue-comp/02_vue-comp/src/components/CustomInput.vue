<template>
  <input
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
//就可以在组件中直接使用v-model
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
}
</script>

<style lang="less" scoped></style>
