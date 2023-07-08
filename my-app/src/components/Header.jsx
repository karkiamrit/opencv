import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, HStack, useDisclosure, VStack } from '@chakra-ui/react';
import { BiMenuAltLeft } from 'react-icons/bi';
// import axios from 'axios';

const Header = ({ isLoggedIn,setIsLoggedIn }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleLogout = (event) => {
        event.preventDefault();
        // Handle the successful logout, e.g., show a success message or redirect to the login page
        localStorage.removeItem('access_token');
    // Update the isLoggedIn state or perform any other necessary actions
        setIsLoggedIn(false);
        
  };
  return (
    <>
      <Button
        pos="fixed"
        zIndex="overlay"
        top="4"
        left="4"
        colorScheme="purple"
        p="0"
        w="10"
        h="10"
        borderRadius="full"
        onClick={onOpen}
      >
        <BiMenuAltLeft size="20" />
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader textAlign="center">VIDEO LIBRARY</DrawerHeader>
          <DrawerBody>
            <VStack>
              <Button onClick={onClose} variant="ghost" colorScheme="purple">
                <Link to="/">Home</Link>
              </Button>
              <Button onClick={onClose} variant="ghost" colorScheme="purple">
                <Link to="/videos">Videos</Link>
              </Button>
              <Button onClick={onClose} variant="ghost" colorScheme="purple">
                <Link to="/videos?category=free">Free Videos</Link>
              </Button>

              {isLoggedIn ? (<Button onClick={onClose} variant="ghost" colorScheme="purple">
                <Link to="/profile">Profile</Link>
              </Button>):('')}
            </VStack>

            <HStack pos="absolute" bottom="10" left="0" w="full" justifyContent="space-evenly">
              {isLoggedIn ? (
                <Button colorScheme="purple" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <>
                  <Button onClick={onClose} colorScheme="purple">
                    <Link to="/login">Log In</Link>
                  </Button>
                  <Button onClick={onClose} colorScheme="purple" variant="outline">
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
