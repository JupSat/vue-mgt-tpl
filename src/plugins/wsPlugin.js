import Websocket from '@/utils/websocket.js'

const wsPlugin = {
  install(Vue) {
    Vue.prototype.$websocket = new Websocket('ws://localhost:8080')
  }
}

export default wsPlugin
