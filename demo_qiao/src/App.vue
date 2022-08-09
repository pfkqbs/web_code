<template>
  <div>
    <component-one></component-one>
    <component-two></component-two>
    <component-three></component-three>
  </div>
</template>

<script>
// 导入子组件
import ComponentOne from "./views/FatherToChild/Parent.vue";
import ComponentTwo from "./views/ChildToFather/Parent.vue";
import ComponentThree from "./views/exposeRef/Parent.vue";

export default {
  name: "App",
  // 注册子组件
  components: {
    ComponentOne,ComponentTwo,ComponentThree
  },
  data() {
    return {

    };
  },
  methods: {},
};
</script>

<style>
</style>
