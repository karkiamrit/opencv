import React, { useState } from 'react';
import {
  Container,
  VStack,
  Input,
  Button,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const accessToken = localStorage.getItem('access_token');
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log('access:',accessToken)
  const toast = useToast();
 
  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'New password and confirm password do not match.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const data = {
      old_password: currentPassword,
      password: newPassword,
      password2: newPassword,
    };

    axiosInstance
      .post('/api/user/changepassword/', data)
      .then((response) => {
        toast({
          title: 'Success',
          description: response.data.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      })
      .catch((error) => {
        toast({
          title: 'Error',
          description: 'Failed to change password. Please try again.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        console.error('Error:', error);
      });
  };

  return (
    <Container maxW={'container.xl'} h={'100vh'} p={'16'}>
      <form onSubmit={handleSubmit}>
        <VStack alignItems={'stretch'} spacing={'8'} w={['full', '96']} m={'auto'} my={'16'}>
          <Heading textAlign={'center'}>Change Password</Heading>
          <Input
            placeholder={'Current Password'}
            type={'password'}
            required
            focusBorderColor={'purple.500'}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <Input
            placeholder={'New Password'}
            type={'password'}
            required
            focusBorderColor={'purple.500'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            placeholder={'Confirm Password'}
            type={'password'}
            required
            focusBorderColor={'purple.500'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button colorScheme={'purple'} type={'submit'}>
            Change Password
          </Button>
          <Text textAlign={'right'}></Text>
        </VStack>
      </form>
    </Container>
  );
};

export default ChangePassword;
