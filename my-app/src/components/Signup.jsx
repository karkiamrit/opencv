import React, { useState } from 'react';
import { Container, VStack, Input, Heading, Button, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tc, setTc] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      name: name,
      email: email,
      password: password,
      password2:password,
      tc: tc,
    };

    axios
      .post('/api/user/register/', userData)
      .then((response) => {
        console.log('Registration successful');
        alert('Registration successful');
        window.location.href = '/login';
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <Container maxW={'container.xl'} h={'100vh'} p={'16'}>
      <form onSubmit={handleSubmit}>
        <VStack alignItems={'stretch'} spacing={'8'} w={['full', '96']} m={'auto'} my={'16'}>
          <Heading textAlign={'center'}>VIDEO LIBRARY</Heading>
          <Input
            placeholder={'Name'}
            type={'text'}
            required
            focusBorderColor={'purple.500'}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <label>
            <input
              type="checkbox"
              checked={tc}
              onChange={(e) => setTc(e.target.checked)}
            />
            Agree to Terms and Conditions
          </label>
          <Button colorScheme={'purple'} type={'submit'}>
            Sign Up
          </Button>
          <Text textAlign={'right'}>
            Already Signed Up?{' '}
            <Button variant={'link'} colorScheme={'purple'}>
              <Link to={'/login'}>Login In</Link>
            </Button>
          </Text>
        </VStack>
      </form>
    </Container>
  );
};

export default Signup;
