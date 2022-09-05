<template>
  <div>{{ title }}</div>
  <h3>{{ num }}</h3>
  <!-- <button @click='update'>更新</button> -->
  <button @click="handleClick">+1</button>
</template>

<script>
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from 'vue'
// 创建 到结束（v-if）
export default {
  data() {
    return {
      title: 'hello',
    }
  },
  methods: {
    update() {
      this.title = '更新的值'
    },
    //   handleClick(){
    //       console.log(this.num)
    //       this.num++
    //   }
  },
  beforeCreate() {
    console.log('创建之前', this.title)
  },
  created() {
    //   组件创建之前
    console.log('created')
  },
  beforeMount() {
    console.log('beforeMount')
  },
  mounted() {
    //   操作DOM 要在这个钩子函数中操作
    console.log('mounted')
  },
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  updated() {
    console.log('updated')
  },
  //   vue3变化 将beforeDestory改成了beforeUnmount
  beforeUnmount() {
    console.log('beforeUnmount')
  },
  //   vue3变化 destoryed改成了unmounted
  unmounted() {
    console.log('unmounted')
  },
  //   vue3新的组合 option，以后所有的composition api 都会在setup中函数中
  setup() {
    //   调用时机：在beforeCreate之前调用， 没有所谓的this的概念，记住：一定不能用this
    // ref声明的是响应式数据
    let num = ref(0)
    const handleClick = () => {
      console.log(num)
      //   num += 1
      num.value += 1
    }
    onBeforeMount(() => {
      console.log('---onBeforeMount')
    })
    onMounted(() => {
      console.log('---onMounted')
    })
    onBeforeUpdate(() => {
      console.log('---onBeforeUpdate')
    })
    onUpdated(() => {
      console.log('---onUpdated')
    })
    onBeforeUnmount(() => {
      console.log('---onBeforeUnmount')
    })
    onUnmounted(()=>{
        console.log('---onUnmounted')
    })
    return {
      num,
      handleClick,
    }
  },
}
</script>

<style lang="less" scoped></style>
