<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <hr />
  <h3>测试传送门组件</h3>
  <TestTeloport></TestTeloport>
  <hr />
  <h3>测试NextTick</h3>
  <TestNextTick></TestNextTick>
  <hr />
  <m-child
    :myTitle="title"
    :colorName="color"
    :size="size"
    @changeSize="handleChangeSize"
  ></m-child>
  <m-child v-bind="{ myTitle: title, colorName: color }"></m-child>
  <hr />
  <!-- :modelValue="" @update:modelValue="" 相当于v-model -->
  <custom-input v-model="msg"></custom-input>
  <computed-custom-input v-model="msg"></computed-custom-input>
  <h3 ref="h3Ref">{{ msg }}</h3>
  <hr />
  <expose-ref ref="formRef"></expose-ref>
  <button @click="handleNext">下一步</button>
  <hr />
  <h3>model通信</h3>
  <model-message
    v-model:myKey="myKey"
    v-model:myValue="myValue"
  ></model-message>
  <hr />
  <h3>平行组件通信- mitt</h3>
  <mitt-a></mitt-a>
  <mitt-b></mitt-b>
  <hr />
  <h3>slot插槽的用法</h3>
  <m-space>
    <m-button>默认</m-button>
    <m-button type="primary">Primary</m-button>
    <m-button type="info">Info</m-button>
    <m-button type="warning">Warning</m-button>
    <m-button type="danger" :loading="loading" @click="fetchData">
      <!-- <template #loading> Loading... </template> -->
      Danger
    </m-button>
    <div>
      <scope-slot>
        <template v-slot:default="{ item }">
          <h3>{{ item }}</h3>
        </template>
        <template v-slot:lisi="{ item }">
          <h3>{{ item }}</h3>
        </template>
      </scope-slot>
    </div>
  </m-space>
  <hr />
  <h3>Render的使用</h3>
  <RenderComponent :level="2">
    <span>我是h2的插槽</span>
  </RenderComponent>
  <RenderComponent :level="3"> </RenderComponent>
  <!-- <hr />
  <h3>生命周期</h3>
  <LifeCircle></LifeCircle> -->
  <hr />
  <h3>Setup</h3>
  <Setup
    :title="setup"
    name="张三"
    @update="hanldeUpdate"
    ref="setupRef"
  ></Setup>
  <WatchAndComputed></WatchAndComputed>
</template>

<script>
import { getCurrentInstance } from 'vue'
import MChild from './components/Child.vue'
import TestNextTick from './components/TestNextTick.vue'
import TestTeloport from './components/TestTeloport.vue'
import WatchAndComputed from './components/WatchAndComputed.vue'
import Setup from './components/Setup.vue'
import RenderComponent from './components/RenderComponent.vue'
import ScopeSlot from './components/ScopeSlot.vue'
import CustomInput from './components/CustomInput.vue'
import ComputedCustomInput from './components/ComputedCustomInput.vue'
import ExposeRef from './components/ExposeRef.vue'
import ModelMessage from './components/ModelMessage.vue'
import MittA from './components/MittA.vue'
import MittB from './components/MittB.vue'
import MSpace from './components/MSpace.vue'
import MButton from './components/MButton.vue'
import LifeCircle from './components/LifeCircle.vue'
export default {
  name: 'App',
  components: {
    TestNextTick,
    TestTeloport,
    WatchAndComputed,
    Setup,
    LifeCircle,
    ScopeSlot,
    RenderComponent,
    MSpace,
    MChild,
    CustomInput,
    ComputedCustomInput,
    ExposeRef,
    ModelMessage,
    MittA,
    MittB,
    MButton,
  },
  data() {
    return {
      setup: 'setup',
      myKey: 'name',
      myValue: '张三',
      title: '标题',
      color: 'red',
      size: 12,
      msg: '',
      loading: false,
    }
  },
  // beforeCreate() {
  //   console.log('beforeCreate')
  // },
  // created() {
  //   console.log('created')
  // },
  mounted() {
    this.$refs.setupRef.childMethod()
  },
  methods: {
    hanldeUpdate(n) {
      // console.log(n)
      this.setup = n
    },
    fetchData() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 2000)
    },
    handleNext() {
      console.log(this.$refs.h3Ref)
      this.$refs.formRef.valid()
    },
    handleChangeSize(size) {
      this.size += size
    },
  },
  provide() {
    return {
      myInject: this.title + 'inject',
    }
  },

  // 新的组合option
  setup() {
    // console.log('setup')
    const $t = getCurrentInstance()?.appContext?.config?.globalProperties?.$t
    // console.log($t)
  },
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
