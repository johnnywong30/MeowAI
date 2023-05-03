import React, { useState, useEffect } from "react";
import '../App.css';
import Messages from './Messages';
// import ChatBox from "./ChatBox";
import { Flex, Input, Button, Heading } from "@chakra-ui/react";
import axios from 'axios'

const Chat = () => {
  const [inputMessage, setInputMessage] = useState(""); // holds input from user
  const [response, setResponse] = useState(''); // hold the response to the input message
  const [isWaiting, setIsWaiting] = useState(false)
  // holds message history
	const [messages, setMessages] = useState([ 
    { role: "system", content: "Hi, Go ahead and ask me to code anything!" },
    // { role: "me", content: "Hey there" },
    // { role: "me", content: "Myself beebo" },
    // {
    //   role: "system",
    //   content:
    //     "Nice to meet you. You can send me message and i'll reply you with same message."
    //   }
    ]);
  // use effect to update history TODO:
  
  // update messages after response has been updated
  useEffect(() => {
    if (response) {
      setMessages((old) => [...old, { role: 'system', content: response }]);
    }
  }, [response]);

  // handle the users inputted message
  const handleSendMessage = async () => {
    console.log(inputMessage)
    // set the new input message to the one received from the user
    if (!inputMessage.trim().length) {
      return;
    }
    setIsWaiting(true)
    // get the response from MeowAI
    const { data } = await axios.post('/code', { user_message: inputMessage});
    console.log(data)
    console.log(data.chat_msg)
    // get the response back from MeowAI
    setResponse(data.chat_msg);
    setMessages((old) => [...old, { role: "me", content: inputMessage }]);
    setInputMessage("");
    setIsWaiting(false)

    // setTimeout(() => {
    //   setMessages((old) => [...old, { role: "system", content: response }]);
    // }, 500);
  };

	return (
		<div>
			<Heading as='h2' size='sm'>Hello, I'm ChatBot! I am looking forward to talking with you!</Heading>

			<div>
				<Messages messages={messages} />
                <Flex w="100%" mt="5">
                <Input
                    placeholder="In ___ code the following..."
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
                    disabled={isWaiting}
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
                    disabled={inputMessage.trim().length <= 0 || isWaiting}
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
