import React, { useState, useEffect } from "react";
import "../App.css";
// import ChatBox from "./ChatBox";
import {
  Flex,
  Input,
  Button,
  Heading,
  Avatar,
  Text,
  Image,
  Box,
  Center,
} from "@chakra-ui/react";
import axios from "axios";

const Images = () => {
  const [inputMessage, setInputMessage] = useState(""); // holds input from user
  const [imageUrl, setImageUrl] = useState("../assets/beebo.webp");

  // handle the users inputted message
  const handleSendMessage = async () => {
    console.log(inputMessage);
    // set the new input message to the one received from the user
    if (!inputMessage.trim().length) {
      return;
    }
    // get the response from MeowAI in the form of an image url
    const { data } = await axios.post(
      "http://meowai.eba-pm8tsbpj.us-west-2.elasticbeanstalk.com/image",
      { image_prompt: inputMessage }
    );
    // console.log(data)
    // console.log(data.image_response)
    // get the response back from MeowAI
    setImageUrl(data.image_response);
    setInputMessage("");

    // setTimeout(() => {
    //   setImages((old) => [...old, { role: "system", content: response }]);
    // }, 500);
  };

  return (
    <div>
      <Heading as="h2" size="sm">
        Image Generator!
      </Heading>
      <Box w="50%" h="50%" p="3" alignContent="center">
        <Image src={imageUrl} alt="image generated" />
      </Box>
      <Input
        placeholder="Show me a picture of Meow the Cat"
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
    </div>
  );
};

export default Images;
