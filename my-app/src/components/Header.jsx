import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  HStack,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { BiMenuAltLeft } from 'react-icons/bi';

const Header = ({ isLoggedIn }) => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // It's a hook

  const handleLogout = () => {
    // Perform logout logic here
  };

  return (
    <>
      <Button
        pos={'fixed'}
        zIndex={'overlay'}
        top={'4'}
        left={'4'}
        colorScheme={'purple'}
        p={'0'}
        w={'10'}
        h={'10'}
        borderRadius={'full'}
        onClick={onOpen}
      >
        <BiMenuAltLeft size={'20'} />
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader textAlign={'center'}>VIDEO LIBRARY</DrawerHeader>
          <DrawerBody>
            <VStack>
              <Button onClick={onClose} variant={'ghost'} colorScheme={'purple'}>
                <Link to={'/'}>Home</Link>
              </Button>
              <Button onClick={onClose} variant={'ghost'} colorScheme={'purple'}>
                <Link to={'/videos'}>Videos</Link>
              </Button>
              <Button onClick={onClose} variant={'ghost'} colorScheme={'purple'}>
                <Link to={'/videos?category=free'}>Free Videos</Link>
              </Button>
              <Button onClick={onClose} variant={'ghost'} colorScheme={'purple'}>
                <Link to={'/upload'}>Upload Video</Link>
              </Button>
            </VStack>
            <HStack
              pos={'absolute'}
              bottom={'10'}
              left={'0'}
              w={'full'}
              justifyContent={'space-evenly'}
            >
              {isLoggedIn ? (
                <Button onClick={handleLogout} colorScheme={'purple'}>
                  Logout
                </Button>
              ) : (
                <>
                  <Button onClick={onClose} colorScheme={'purple'}>
                    <Link to={'/login'}>Log In</Link>
                  </Button>
                  <Button onClick={onClose} colorScheme={'purple'} variant={'outline'}>
                    <Link to={'/signup'}>Sign Up</Link>
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
