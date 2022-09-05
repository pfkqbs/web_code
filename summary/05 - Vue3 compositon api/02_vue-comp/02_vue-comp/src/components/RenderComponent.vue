<script>
import NewComp from './NewComp'
import { h, resolveComponent } from 'vue'
import JsxSlot from './JsxSlot'
export default {
  components: {
    ANewComp: NewComp,
  },
  props: {
    level: {
      type: Number,
      required: true,
    },
  },
  /*
  render() {
    return h(
      `h${this.level}`,
      {
        onClick: () => console.log('click'),
      },
      //   this.$slots.default() // 包含子节点的数据
      //   [
      //     `我是h${this.level}标题`,
      //     h('span', '我是一个span标签'),
      //     h(resolveComponent('ANewComp'), {
      //       title: '我是新组件的标题',
      //     }),
      //   ]
      Array.from({ length: 20 }).map(() => {
        return h('p', 'hai')
      })
    )
  },
  */

  render() {
    const TagName = `h${this.level}`
    const slots = {
      default: () => <div>Default A</div>,
      bar: () => <span>Bar NB</span>,
    }
    return (
      <TagName>
        {this.$slots.default && this.$slots.default()}
        {/*<ANewComp title='我是jsx的组件'></ANewComp>*/}
        <JsxSlot v-slots={slots}></JsxSlot>
      </TagName>
    )
  },
}
</script>

<style lang="less" scoped></style>
