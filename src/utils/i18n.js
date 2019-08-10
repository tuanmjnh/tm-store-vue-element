// translate router.meta.title, be used in breadcrumb sidebar tagsview
export function generateTitle(title) {
  const arr = title.split('/')
  title = ''
  for (let i = 0; i < arr.length; i++) {
    title += this.$t('route.' + arr[i])
    if (i < arr.length - 1) title += ' - '
  }
  // const hasKey = this.$te('route.' + title)

  // if (hasKey) {
  //   // $t :this method from vue-i18n, inject in @/lang/index.js
  //   const translatedTitle = this.$t('route.' + title)

  //   return translatedTitle
  // }
  return title
}
