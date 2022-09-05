<template>
  <button @click="isOpen = true">调研组件</button>
  <teleport to="body">
    <div v-if="isOpen" class="modal">
      <div>
        我是传送门的teleport，我的父元素是body
        <button @click="isOpen = false"></button>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import {ref} from 'vue'
const isOpen = ref(false)
</script>

<style lang="less">
.modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 300px;
  height: 300px;
  padding: 5px;
}
</style>
