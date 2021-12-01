import Ws from 'App/Services/ws'

Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('shttp://localhost:8080/', (socket) => {
  socket.on('d', (data) => {
    console.log(data)
  })
})
