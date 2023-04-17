import React, { useState, useEffect } from "react";
import "../App.css";
import Messages from "./Messages";
// import ChatBox from "./ChatBox";
import { Flex, Input, Button, Heading } from "@chakra-ui/react";
import axios from "axios";

const Chat = () => {
  const [inputMessage, setInputMessage] = useState(""); // holds input from user
  const [response, setResponse] = useState(""); // hold the response to the input message
  // holds message history
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "Hi, my name is Coach Bot.",
    },
  ]);
  // use effect to update history TODO:

  // update messages after response has been updated
  useEffect(() => {
    if (response) {
      setMessages((old) => [
        ...old.filter(({ task }) => task !== "Loading"),
        { role: "system", content: response },
      ]);
    }
  }, [response]);

  // handle the users inputted message
  const handleSendMessage = async () => {
    console.log(inputMessage);
    // set the new input message to the one received from the user
    if (!inputMessage.trim().length) {
      return;
    }
    const msg = inputMessage;
    setInputMessage("");
    setMessages((old) => [
      ...old,
      { role: "me", content: msg },
      { role: "system", content: "...Loading response...", task: "Loading" },
    ]);
    // get the response from MeowAI
    const { data } = await axios.post("/chat", { user_message: msg });
    console.log(data);
    console.log(data.chat_msg);
    // get the response back from MeowAI
    setResponse(data.chat_msg);
  };

  return (
    <div>
      <Heading as="h2" size="sm">
        The virtual assistant for DigitalCoach.
      </Heading>

      <div>
        <Messages messages={messages} />
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
        {/* <ChatBox
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          // handleSendMessage={handleSendMessage}
        /> */}
      </div>
    </div>
  );
};

export default Chat;
