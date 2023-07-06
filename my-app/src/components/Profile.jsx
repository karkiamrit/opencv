import React, { useEffect, useState } from 'react';
import { Container, VStack, Heading, Text } from '@chakra-ui/react';
import axios from 'axios';

const Profile = () => {
  // State variables to hold user data
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from the backend API
    axios.get('/api/user/profile/')
      .then((response) => {
        // Set the user data in the state
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <Container maxW={'container.xl'} h={'100vh'} p={'16'}>
      <VStack alignItems={'stretch'} spacing={'8'} w={['full', '96']} m={'auto'} my={'16'}>
        <Heading>Profile</Heading>
        {user ? (
          <>
            <Text>Name: {user.name}</Text>
            <Text>Email: {user.email}</Text>
            <Text>TC: {user.tc}</Text>
          </>
        ) : (
          <Text>Loading user data...</Text>
        )}
      </VStack>
    </Container>
  );
};

export default Profile;
