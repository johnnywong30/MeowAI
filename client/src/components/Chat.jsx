import React, { useState } from "react";
import '../App.css';
import Messages from './Messages';
import ChatBox from "./ChatBox";

const Chat = () => {
	const [messages, setMessages] = useState([
    { role: "system", content: "Hi, My Name is sophiasaur" },
    { role: "me", content: "Hey there" },
    { role: "me", content: "Myself beebo" },
    {
      role: "system",
      content:
        "Nice to meet you. You can send me message and i'll reply you with same message."
    }
  ]);

	const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim().length) {
      return;
    }
    const data = inputMessage;

    setMessages((old) => [...old, { role: "me", content: data }]);
    setInputMessage("");

    setTimeout(() => {
      setMessages((old) => [...old, { role: "system", content: data }]);
    }, 1000);
  };

	return (
		<div>
			<h2>
				chat with me pleaseeeeeee
			</h2>
			<div>
				<Messages messages={messages} />
				<ChatBox
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
        />
			</div>
		</div>
	);
};

export default Chat;
