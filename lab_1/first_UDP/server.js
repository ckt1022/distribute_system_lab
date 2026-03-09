const dgram = require('dgram');
const udpSocket = dgram.createSocket('udp4')

// bind代表process開始監聽port
// 若成功，則會觸發sodket.on中的"listening" event.
udpSocket.bind({
  address: 'localhost',
  port: 20213,
});

// socket.on 是被動監聽，當監聽的port出現event 
// 如message代表收到訊息、listening代表監聽啟動
// () => {}代表call back function，會在前面的條件觸發後執行的函數
// 以下為 socket.on("event",callback function) 功能測試

// 1.listening 代表開始監聽
udpSocket.on("listening",() => {
    console.log("listening start")
})

// 2.message代表接收到訊息
// msg <Buffer> The message. | rinfo <Object> Remote address information
udpSocket.on(
    'message', 
    (msg, rinfo) => { 
        console.log(msg.toString())
        let process_msg = rinfo.port.toString() + ":" + msg.toString()
        udpSocket.send(process_msg,rinfo.port,rinfo.address,() => {
            udpSocket.close()
        })
    },
);

// 3.close
udpSocket.on("close",() => {
    console.log("listening close")
})

