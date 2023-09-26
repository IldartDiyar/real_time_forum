export default function sendMsg(socket, messageText, ClientId, ReceiverId) {
    const messageStr = {
        to_user_id: ReceiverId,
        message: messageText,
    };
    let messageSend = JSON.stringify({ type: "message", body: messageStr, from_user_id: ClientId })
    console.log(messageSend);
    socket.send(messageSend);

}
// export default function sendRecieveMessage(socket) {
//     let messageSend = JSON.stringify({ type: "SendMessage", })
//     console.log(messageSend);
//     socket.send(messageSend);
// }
// export default function sendReadMessage(socket, message) {

// }