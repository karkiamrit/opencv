import React, { useEffect, useState } from 'react';
import { Container, VStack, Heading, Text, IconButton, useDisclosure, Modal, Box, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Button, useToast } from '@chakra-ui/react';
import { FaUser, FaEnvelope, FaUserSecret, FaPencilAlt } from 'react-icons/fa';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [randomIcon, setRandomIcon] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const toast = useToast();

  useEffect(() => {
    // Get the access token from local storage
    const accessToken = localStorage.getItem('access_token');

    // Create the Axios instance with the access token in the header
    const axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Fetch user data from the backend API using the custom Axios instance
    axiosInstance
      .get('/api/user/profile/')
      .then((response) => {
        setUser(response.data);
        setRandomIcon(getRandomIcon()); // Set random icon when user data is fetched
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const getRandomIcon = () => {
    const icons = [FaUser, FaEnvelope, FaUserSecret];
    const randomIndex = Math.floor(Math.random() * icons.length);
    return icons[randomIndex];
  };

  const handleEditProfile = () => {
    setName(user.name);
    setEmail(user.email);
    onOpen();
  };

  const handleSubmit = () => {
    // Update the user profile
    // Make an API call with the updated name and email
    const data = { name, email };

    // Get the access token from local storage
    const accessToken = localStorage.getItem('access_token');

    // Create the Axios instance with the access token in the header
    const axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Make the PUT request to update the user profile
    axiosInstance
      .put('/api/user/profile/update/', data)
      .then((response) => {
        toast({
          title: 'Success',
          description: response.data.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setUser({ ...user, name, email }); // Update the user object in state with the new name and email
        onClose();
      })
      .catch((error) => {
        console.error('Error:', error);
        toast({
          title: 'Error',
          description: 'Failed to update profile. Please try again.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Container maxW={'container.xl'} h={'100vh'} p={'16'}>
      <VStack alignItems={'stretch'} spacing={'8'} w={['full', '96']} m={'auto'} my={'16'}>
        <Heading>Profile</Heading>
        {user ? (
          <>
            <Box>
              {randomIcon && <randomIcon />} Name: {user.name}
            </Box>
            <Box>
              {randomIcon && <randomIcon />} Email: {user.email}
            </Box>
            <IconButton
              icon={<FaPencilAlt />}
              aria-label="Edit Profile"
              variant="outline"
              onClick={handleEditProfile}
              
            />

            {/* Edit Profile Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit Profile</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </FormControl>
                  <Button colorScheme="purple" mt={4} onClick={handleSubmit}>
                    Save Changes
                  </Button>
                </ModalBody>
              </ModalContent>
            </Modal>
          </>
        ) : (
          <Text>Loading user data...</Text>
        )}
      </VStack>
    </Container>
  );
};

export default Profile;
