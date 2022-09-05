<template>
  <div>{{ count }}--{{ title }}</div>
  <button @click="update">修改</button>
  <button @click="updateName">更改name</button>
  <form action="javascript:;">
    <div>
      <label for="name">姓名：</label>
      <input type="text" v-model="formState.name" />
    </div>
    <div>
      <label for="pwd">密码：</label>
      <input type="password" v-model="formState.pwd" />
    </div>
    <div>{{ formState.sex }}</div>
    <div>
      <button @click="handleSubmit">提交</button>
    </div>
  </form>
</template>

<script>
/**
 * reactive和ref
 * 是vue3中composition api中2个最重要的响应式API
 * ref是用来处理基本类型数据，reative用来处理对象（递归深度响应式 proxy）
 * 如果ref,对象或者数组，内部会自动将对象或者数组换换成reactive的代理对象
 * ref内部：通过对value属性添加getter和setter来实现对数据的劫持
 * reactive内部：通过使用Proxy来实现对对象内部所有数据的劫持，并且通过Reflect操作对象内部的数据
 *
 *
 */
import { ref, reactive, toRefs } from 'vue'
export default {
  props: ['title'],
  emits: ['update'], // 可选的
  /**
   * props: 包含props配置声明且传入的所有属性的对象
   * attrs: 非props的所有的属性，相当于this.$attrs
   * slots: 包含所有传入的插槽内容的对象，this.$slots
   * emit: 用来分发自定义事件的函数。相当于this.$emit
   */
  setup(props, { emit, attrs, slots, expose }) {
    console.log(props, attrs)
    // 声明任意的数据类型，
    // 1.使用ref声明的数据，如果在js操作此响应式数据，则通过xx.value
    const count = ref(0)
    let formState = reactive({
      name: '小马哥',
      pwd: '123',
    })
    const refFormState = toRefs(formState)
    console.log(refFormState)
    const handleSubmit = () => {
      //   es6的解构
      //   formState = { ...formState, sex: 1 }
      //   formState.sex = 1

      Object.assign(formState, { sex: 1, a: 2, c: 3 })
      console.log(formState)
    }
    const updateName = () => {
      formState.name = '大马哥'
    }
    const update = () => {
      emit('update', '我是新修改的值')
    }
    const childMethod = () => {
      console.log('我是孩子组件的方法')
    }
    expose({
      childMethod,
    })

    return {
      count,
      update,
      updateName,
      handleSubmit,
      formState,
    }
  },
}
</script>

<style lang="less" scoped></style>
