import { onMounted, ref } from 'vue'
export default useWatch = () => {
  const count = ref(0)
  const handleClick = () => {}
  onMounted(() => {})
  return {
    count,
    handleClick
  }
}
