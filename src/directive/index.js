import Vue from 'vue'
Vue.directive('trim', {
  bind(el, binding, vnode) {
    console.log(el.contains(event.target))
    console.log(vnode)
    console.log(binding)
    // Vue.set(vnode.context, vnode.data.model.expression, 'tm')
    vnode.context.$emit('update:' + vnode.data.model.expression, 'tm')
  },
  updated: function(el, binding, vnode) {

  }
})
// export function trim (el, binding, vnode) {
//   if (binding.value) {
//     el.value = 'trimed' // binding.value
//     console.log(binding.name, binding.value)
//   }
//   // console.log(el, binding, vnode)
//   // vnode.data.model.value = 'trimed'
//   // el.innerHTML = 'trimed'
// }

// export const trim = {
//   update: (el, binding, vnode, oldVnode, vModel) => {
//     console.log(vnode, el.value)
//     console.log(vnode.data.model.expression.split('.'))
//     // vnode.context.user.displayName = 'tm'
//     // vnode.context.set(vnode.data.model.expression, 'tm')
//     // Vue.set(vnode.context, binding.expression, date);
//     if (binding.value) {
//       el.value = 'trimed' // binding.value
//     }
//   }
//   // vnode.data.model.value = 'trimed'
//   // el.innerHTML = 'trimed'
// }

// Vue.directive("trim", {
//   inserted: function(el) {
//     var str = el.innerHTML;
//     var resultString = str.split(' ').slice(0, 5).join(" ") + "...";
//     el.innerHTML = resultString
//   }
// });
