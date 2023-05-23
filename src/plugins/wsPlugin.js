import Websocket from '@/utils/websocket.js'

const wsPlugin = {
  install(app) {
    app.config.globalProperties.$websocket = new Websocket('ws://localhost:8080')
  }
}

export default wsPlugin
