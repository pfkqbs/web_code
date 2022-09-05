const JsxSlot = (props, { slots }) => {
  return (
    <>
      <h1>{slots.default ? slots.default() : 'foo'}</h1>
      <h2>{slots.bar?.()}</h2>
    </>
  )
}
export default JsxSlot
