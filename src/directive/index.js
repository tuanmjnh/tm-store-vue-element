export function trim (el, binding, vnode) {
  if (binding.value) {
    el.value = 'trimed' // binding.value
    console.log(el.value)
  }
  // console.log(el, binding, vnode)
  // vnode.data.model.value = 'trimed'
  // el.innerHTML = 'trimed'
}

// Vue.directive("trim", {
//   inserted: function(el) {
//     var str = el.innerHTML;
//     var resultString = str.split(' ').slice(0, 5).join(" ") + "...";
//     el.innerHTML = resultString
//   }
// });
