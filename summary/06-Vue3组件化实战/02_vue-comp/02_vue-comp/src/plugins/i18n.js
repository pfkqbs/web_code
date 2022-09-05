export default {
  install(app, options) {
    //   vue3
    app.config.globalProperties.$t = (key) => {
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }
    app.provide('i18n', options)
    
  },
}
