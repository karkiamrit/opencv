import { Stack, VStack, Text, Button, Heading, Box, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import ReactPlayer from 'react-player';

const Videos = () => {
  const videosArr = [
    'https://www.youtube.com/watch?v=zoUagacsu9s&ab_channel=AnuvJain-Topic',
    'https://www.youtube.com/watch?v=Fw-S8NCDsTY&ab_channel=RaghavKaushik',
    'https://www.youtube.com/watch?v=miXdVbIm5BY&ab_channel=PrateekKuhad',
    'https://www.youtube.com/watch?v=iOIF74Hk80A&ab_channel=PrateekKuhad',
    'https://www.youtube.com/watch?v=o2hbckOhAf4&ab_channel=GhostKidGamerez',
  ];
  const [videoSrc, setVideoSrc] = useState(videosArr[0]);
  const showMargin = useBreakpointValue({ base: false, md: true });

  return (
    <Stack direction={['column', 'row']} h={['auto', '100vh']}>
      <VStack
        w={['full', 'full', 'full', '1500px']}
        alignItems={['center', 'flex-start']}
        margin={showMargin ? '8' : '0'}
      >
        <Box
          w={['full', 'full', 'full', '100%']}
          h={['250px', '450px', '650px']}
        >
          <ReactPlayer
            controls
            url={videoSrc}
            width="100%"
            height="100%"
            playing={true}
          />
        </Box>
        <VStack alignItems={['center', 'flex-start']} p={'8'} w={'full'} overflowY={'auto'}>
          <Heading>Sample Video 1</Heading>
          <Text>This is a sample video.</Text>
        </VStack>
      </VStack>
      <VStack
        w={['full', 'xl']}
        alignItems={['center', 'stretch']}
        p={['4', '8']}
        spacing={['4', '8']}
        overflowY={'auto'}
      >
        {videosArr.map((item, index) => (
          <Button
            key={index}
            variant={'ghost'}
            colorScheme={'purple'}
            onClick={() => setVideoSrc(item)}
          >
            Song {index + 1}
          </Button>
        ))}
      </VStack>
    </Stack>
  );
};

export default Videos;
