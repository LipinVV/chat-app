const server = require('ws');

const serverAddress = 'wss://talk-a-lot.glitch.me/'
const ws = new WebSocket(serverAddress, {
    headers: {
        'user-agent': 'Mozilla'
    }
})

ws.on('open', function() {
    ws.send('Wow!');
});

ws.on('message', function(msg) {
    console.log('Received msg' + msg);
});