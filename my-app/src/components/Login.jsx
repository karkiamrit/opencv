import { Container, VStack, Input, Heading, Button, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  // State variables to hold form input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a data object with form input values
    const userData = {
      email: email,
      password: password,
    };

    // Send a POST request to your Django backend API endpoint for user authentication
    axios.post('/login/', userData)
      .then((response) => {
        // Handle the response data, e.g., show a success message or redirect to a protected page
        console.log('Login successful');
        // Show a success message
        alert('Login successful');
        // Redirect to a protected page
        window.location.href = '/videos';

        console.log(response.data);
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message to the user
        console.error('Error:', error);
      });
  };

  return (
    <Container maxW={'container.xl'} h={'100vh'} p={'16'}>
      <form onSubmit={handleSubmit}>
        <VStack
          alignItems={'stretch'}
          spacing={'8'}
          w={['full', '96']}
          m={'auto'}
          my={'16'}
        >
          <Heading>Welcome Back</Heading>
          <Input
            placeholder={'Email'}
            type={'email'}
            required
            focusBorderColor={'purple.500'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder={'Password'}
            type={'password'}
            required
            focusBorderColor={'purple.500'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant={'link'} alignSelf={'flex-end'}>
            <Link to={'/forgetpassword'}>Forgot Password?</Link>
          </Button>

          <Button colorScheme={'purple'} type={'submit'}>
            Log In
          </Button>

          <Text textAlign={'right'}>
            New User?{' '}
            <Button variant={'link'} colorScheme={'purple'}>
              <Link to={'/signup'}>Sign Up</Link>
            </Button>
          </Text>
        </VStack>
      </form>
    </Container>
  );
};

export default Login;
