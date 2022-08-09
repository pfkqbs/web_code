## <script setup> </script>基本语法

将 setup attribute 添加到 script 代码块上：
```js
<script setup>
console.log('hello script setup')
</script>
```
里面的代码会被编译成组件 setup() 函数的内容。这意味着与普通的 script 只在组件被首次引入的时候执行一次不同，有setup的script  中的代码会在每次组件实例被创建的时候执行。
### 顶层的绑定会被暴露给模板
当使用 <script setup> 的时候，任何在 <script setup> 声明的顶层的绑定 (包括变量，函数声明，以及 import 引入的内容) 都能在模板中直接使用

```vue
<template>
  <div @click="log">{{ msg }}</div>
</template>

<script setup>
// 变量
const msg = 'Hello!'

// 函数
function log() {
  console.log(msg)
}
</script>

```
import 导入的内容也会以同样的方式暴露
```vue
<script setup>
import { capitalize } from './helpers'
</script>

<template>
  <div>{{ capitalize('hello') }}</div>
</template>
```