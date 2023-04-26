import React, { useState, useEffect } from "react";
import { Flex, Input, Button } from "@chakra-ui/react";

const ChatBox = () => {
  // const ChatBox = ({ inputMessage, setInputMessage }) => {
  // hold the response to the input message
  const [response, setResponse] = useState("");
  const [inputMessage, setInputMessage] = useState(inputMessage);
  // handle the users inputted message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    // set the new input message to the one received from the user
    setInputMessage(e.target.value);
    if (!inputMessage.trim().length) {
      return;
    }
    // hold the response from MeowAI
    const data = await fetch(
      "http://meowai.eba-pm8tsbpj.us-west-2.elasticbeanstalk.com/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_message: inputMessage,
        }),
      }
    );

    // get the response back from MeowAI
    const dataBack = await response.json();
    setResponse(dataBack.chat_msg);

    setMessages((old) => [...old, { role: "me", content: data }]);
    setInputMessage("");

    setTimeout(() => {
      setMessages((old) => [...old, { role: "system", content: data }]);
    }, 1000);
  };

  return (
    <Flex w="100%" mt="5">
      <Input
        placeholder="Type Something..."
        border="none"
        borderRadius="none"
        _focus={{
          border: "1px solid black",
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <Button
        bg="black"
        color="white"
        borderRadius="none"
        _hover={{
          bg: "white",
          color: "black",
          border: "1px solid black",
        }}
        disabled={inputMessage.trim().length <= 0}
        onClick={handleSendMessage}
      >
        Send
      </Button>
    </Flex>
  );
};

export default ChatBox;
