import React, { useState } from "react";
import Message from "./Message";
import InputBox from "./InputBox";

function Chat() {
  const [messages, setMessages] = useState([]); // ✅ THIS LINE IS REQUIRED

  const sendMessage = async (text) => {
    const userMsg = { sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text }),
      });

      const data = await res.json();

      const botMsg = { sender: "bot", text: data.reply };
      setMessages((prev) => [...prev, botMsg]);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <Message key={index} msg={msg} />
        ))}
      </div>

      <InputBox sendMessage={sendMessage} />
    </div>
  );
}

export default Chat;