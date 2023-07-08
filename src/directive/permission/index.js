import { store } from '@/pinia'

export default (app) => {
  app.directive('permission', (el, binding) => {
    const { value } = binding
    if (!value) return
    const roles = store.getters.getPermissions
    if (value.length > 1) {
      let isRemove = true
      value.forEach((item) => {
        if (roles[item]) {
          isRemove = false
        }
      })
      isRemove && el.parentNode && el.parentNode.removeChild(el)
    } else {
      !roles[value[0]] && el.parentNode && el.parentNode.removeChild(el)
    }
  })
}
