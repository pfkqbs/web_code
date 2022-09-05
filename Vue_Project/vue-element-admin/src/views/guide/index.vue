<template>
  <div class="app-container">
    <aside>
      当人们第一次进入这个工程时，请查看指引页面，其基于driver.js实现  <br>
      The guide page is useful for some people who entered the project for the first time.
      <br> 
      You can briefly introduce the features of the project. Demo is based on
      <a 
      href="https://github.com/kamranahmedse/driver.js" 
      target="_blank">driver.js.</a>
    </aside>
    <el-button 
      icon="el-icon-question" 
      type="primary" 
      @click.prevent.stop="guide">
        查看指引
    </el-button>
  </div>
</template>

<script>
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import steps from './steps'

export default {
  name: 'Guide',
  data() {
    return {
      driver: null
    }
  },
  mounted() {
    this.driver = new Driver()
  },
  methods: {
    guide() {
      this.driver.defineSteps(steps)
      this.driver.start()
    }
  }
}
</script>
