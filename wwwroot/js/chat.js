"use strict";

const connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
const sendButton = document.getElementById("sendButton");
const messagesList = document.getElementById("messagesList");
const userInput = document.getElementById("userInput");

//Disable the send button until connection is established.
sendButton.disabled = true;

connection.on("ReceiveMessage", function (txid, valor) {
    const inputValue = userInput.value;

    if (inputValue !== txid) return;

    // envia a mensagem pra tela
    var li = document.createElement("li");
    messagesList.appendChild(li);
    li.textContent = `pix ${txid} recebido`;
});

connection.start().then(function () {
    sendButton.disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

sendButton.addEventListener("click", function (event) {
    event.preventDefault();

    var inputValue = userInput.value;

    userInput.disabled = true;
    sendButton.disabled = true;
    //connection.invoke("SendMessage", inputValue).catch(function (err) {
    //    return console.error(err.toString());
    //});
});