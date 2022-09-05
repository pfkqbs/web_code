<template>
  <div>{{ filterData }}</div>
  <button @click="handleStop">停止</button>
  <input type="text" v-model="keyword" />
  <h3 id="keyword">{{ keyword }}</h3>
</template>

<script setup>
// import useWatch from './hooks/useWatch'
import { ref, reactive, computed, watch, watchEffect } from 'vue'
// const {count,handleClick} = useWatch()
const list = ref([
  {
    id: 1,
    name: '张三',
    age: 20,
  },
  {
    id: 2,
    name: '李四',
    age: 16,
  },
  {
    id: 3,
    name: '王五',
    age: 15,
  },
])

const filterData = computed(() => list.value.filter((item) => item.age < 18))
// const aa = computed({
//     get(){

//     },
//     set(){

//     }
// })

// watch的使用
const count = ref(0)
const user = reactive({
  name: '小马哥',
  age: 18,
  fav: {
    title: '美女',
  },
})
setTimeout(() => {
  count.value = 10
  num.value = 20
}, 2000)
// 监听一个值
// watch(
//   count,
//   (n, o) => {
//     console.log(n)
//   },
//   { immediate: true }
// )
// 监听多个值
/**
 * 1.第一个参数使用数组来指定
 * 2.如果ref对象，直接指定
 * 3.如果是reactive对象中的属性，必须通过函数来指定
 */
watch(
  [() => user.name, () => user.age, count],
  (values) => {
    console.log('监听多个数据：', values)
  },
  { immediate: true }
)
// watchEffect的用法
const num = ref(0)
// 监视所有回调中使用的响应式数据
const stopWatchEffect = watchEffect(() => {
  console.log(num.value)
})
const handleStop = () => {
  stopWatchEffect()
}
// 案例： 防抖
const asyncPrint = (val) => {
  return setTimeout(() => {
    console.log('用户输入：', val)
  }, 500)
}
const keyword = ref('')
watchEffect(
  (onInvalidate) => {
    // onInvalidate 用来注册清理是失效时的回调
    // const timer = asyncPrint(keyword.value)
    // onInvalidate(() => clearTimeout(timer))
    console.log('keword change:', keyword.value)
    console.log(
      document.querySelector('#keyword') &&
        document.querySelector('#keyword').innerText
    )
  },

  {
    //   默认pre,获取操作之前的DOM,如果是post,获取更新之后的DOM
    flush: 'post',
  }
)
</script>

<style lang="less" scoped></style>
