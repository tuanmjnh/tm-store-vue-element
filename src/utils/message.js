// Message
import { Message } from 'element-ui'
// i18n lang
import i18n from '@/lang'

// export function message(msg) {
//   Message({ message: i18n.t(msg.message), type: msg.type || null, showClose: msg.showClose || true })
// }

// export function success(msg) {
//   Message({ message: i18n.t(msg.message), type: 'success', showClose: msg.showClose || true })
// }

// export function warning(msg) {
//   Message({ message: i18n.t(msg.message), type: 'warning', showClose: msg.showClose || true })
// }

// export function error(msg) {
//   Message({ message: i18n.t(msg.message), type: 'error', showClose: msg.showClose || true })
// }

export default {
  message(msg) {
    Message({ message: i18n.t(msg.message), type: msg.type || null, showClose: msg.showClose || true })
  },
  success(msg) {
    Message({ message: i18n.t(msg.message), type: 'success', showClose: msg.showClose || true })
  },
  warning(msg) {
    Message({ message: i18n.t(msg.message), type: 'warning', showClose: msg.showClose || true })
  },
  error(msg) {
    Message({ message: i18n.t(msg.message), type: 'error', showClose: msg.showClose || true })
  }
}
