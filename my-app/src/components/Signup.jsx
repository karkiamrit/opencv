import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Avatar,
  Button,
  Checkbox,
  Container,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isTCAccepted, setIsTCAccepted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isTCAccepted) {
      // Show an error message if terms and conditions are not accepted
      alert('Please accept the terms and conditions');
      return;
    }

    const userData = {
      name,
      email,
      password,
      password2: confirmPassword,
      tc: isTCAccepted,
    };

    axios
      .post('/register/', userData)
      .then((response) => {
        console.log('Registration successful');
        alert('Registration successful');
        window.location.href = '/login';
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <Container maxW="container.xl" h="100vh" p="16">
      <form onSubmit={handleSubmit}>
        <VStack alignItems="stretch" spacing="8" w={['full', '96']} m="auto" my="16">
          <Heading textAlign="center">VIDEO LIBRARY</Heading>
          <Avatar alignSelf="center" boxSize="32" />

          <Input
            placeholder="Name"
            type="text"
            required
            focusBorderColor="purple.500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Email"
            type="email"
            required
            focusBorderColor="purple.500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            required
            focusBorderColor="purple.500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            required
            focusBorderColor="purple.500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Checkbox
            isChecked={isTCAccepted}
            onChange={(e) => setIsTCAccepted(e.target.checked)}
          >
            Accept Terms and Conditions
          </Checkbox>

          <Button colorScheme="purple" type="submit">
            Sign Up
          </Button>

          <Text textAlign="right">
            Already Signed Up?{' '}
            <Button variant="link" colorScheme="purple">
              <Link to="/login">Login In</Link>
            </Button>
          </Text>
        </VStack>
      </form>
    </Container>
  );
};

export default Signup;
