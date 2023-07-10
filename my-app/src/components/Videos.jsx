import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, VStack, Box, Input } from '@chakra-ui/react';

const Video = () => {
  const videoRef = useRef(null);
  const outputRef = useRef(null);
  const [outputMessage, setOutputMessage] = useState('');

  const handleDetect = () => {
    const videoElement = videoRef.current;
    const outputElement = outputRef.current;

    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoElement.srcObject = stream;
        const mediaRecorder = new MediaRecorder(stream);
        const socket = new WebSocket('ws://localhost:8000/ws/detection/');

        mediaRecorder.addEventListener('dataavailable', (event) => {
          if (event.data.size > 0) {
            socket.send(event.data);
          }
        });

        mediaRecorder.addEventListener('stop', () => {
          socket.close();
        });

        mediaRecorder.start();

        const stopButton = document.getElementById('stopButton');
        stopButton.addEventListener('click', () => {
          mediaRecorder.stop();
          stream.getTracks().forEach((track) => track.stop());
        });

        socket.addEventListener('message', (event) => {
          const response = JSON.parse(event.data);
          setOutputMessage(response.message);
          console.log(response.message);
        });
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
      });
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    videoElement.style.display = 'block'; // Show the video element
  }, []);

  return (
    <Container maxW="container.xl" h="100vh" p="16">
      <VStack alignItems="stretch" spacing="8" w={['full', '96']} m="auto" my="16">
        <Box position="relative" w="100%" h="auto">
          <video ref={videoRef} id="videoElement" playsInline autoPlay></video>
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            fontWeight="bold"
            fontSize="2xl"
            color="purple.500"
            ref={outputRef}
          >
            {outputMessage}
          </Box>
        </Box>
        <Input value={outputMessage} isReadOnly />
        <Button colorScheme="purple" onClick={handleDetect}>
          Detect
        </Button>
        <Button colorScheme="red" id="stopButton">
          Stop
        </Button>
      </VStack>
    </Container>
  );
};

export default Video;
