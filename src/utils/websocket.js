import WebSocket from 'ws'

class Websocket {
  constructor(url, options = {}) {
    this.url = url
    this.options = options
    this.ws = null
  }

  connect() {
    this.ws = new WebSocket(this.url, this.options)
    this.ws.onopen = () => {
      console.log('Websocket connection opened.')
    }
    this.ws.onmessage = (event) => {
      console.log('Websocket message received.', event.data)
    }
    this.ws.onerror = (error) => {
      console.error('Websocket error occurred.', error)
    }
    this.ws.onclose = () => {
      console.log('Websocket connection closed.')
    }
  }

  send(data) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(data)
    } else {
      console.error('Websocket connection not open.')
    }
  }

  close() {
    this.ws.close()
  }
}

export default Websocket
