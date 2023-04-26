import React, { useState, useEffect } from "react";
import '../App.css';
// import ChatBox from "./ChatBox";
import {NavLink} from 'react-router-dom';
import { Flex, Input, Button, Heading } from "@chakra-ui/react";

const Welcome = () => {
	return (
        <div>
            <Heading>Welcome to MeowAI! Please select what you would like to explore today!</Heading>
            <br/>
            <div>
                <p>
                    This application will allow you to chat with a friendly ChatBot, generate useful code,
                    or generate any image that you can think of!
                </p>
            </div>
        </div>
	);
};

export default Welcome;
