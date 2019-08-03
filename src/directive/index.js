export const trim = {
  bind(el, binding, vnode) {
    // const handler = function(e) {
    //   if (e.target.value) e.target.value = e.target.value.trim()
    //   console.log(e.target.value)
    //   // if (e.target.value.length > maxChars) {
    //   // e.target.value = e.target.value.substr(0, maxChars)
    //   // vnode.elm.dispatchEvent(new CustomEvent('input')) // added this
    //   // }
    // }
    // el.addEventListener('input', handler)
    el.addEventListener('blur', (e) => {
      if (e.target.value) e.target.value = e.target.value.trim()
      // console.log(e.target.value)
    }, true)
  },
  update: function(el, binding, vnode) {
  }
}
