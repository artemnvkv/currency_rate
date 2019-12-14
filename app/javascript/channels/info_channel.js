import consumer from "./consumer"

consumer.subscriptions.create("InfoChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
    console.log('Connected to the room!')
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
    console.log('Disconnected to the room!')
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    console.log("Recieving:")
    console.log(data.content)
    if (document.querySelector('.rate_usd') != null) {
      document.querySelector('.rate_usd').lastChild.textContent = data.content.rate
    }
  }
});
