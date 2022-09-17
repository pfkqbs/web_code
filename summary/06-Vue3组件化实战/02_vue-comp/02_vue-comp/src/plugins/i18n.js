export default {
  // options就是zh配置
  install(app, options) {
    //   vue3  配置全局属性  $t
    app.config.globalProperties.$t = (key) => {
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }
    app.provide('i18n', options)
    
  },
}
