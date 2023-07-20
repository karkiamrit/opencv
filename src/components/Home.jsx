import React from 'react';
import { Box, Container, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpg';
import img5 from '../assets/5.png';

const headingOptions = {
    pos: 'absolute',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    textTransform: 'uppercase',
    p: '4',
    fontSize: '4xl',



}

const Home = () => {
    return (

        <Box>
            <MyCarousel />
            <Container maxW={'container.xl'}
                minH={'100vh'}
                p={'16'}
            >
                <Heading textTransform={'uppercase'}
                    py={'2'}
                    m={'auto'}
                    w={'fit-content'}
                    borderBottom={'2px solid'}
                >
                    Services
                </Heading>
                <Stack h={'full'}
                    p={'4'}
                    alignItems={'center'}
                    direction={['column', 'row']}
                >
                    <Image src={img5} h={['40', '400']} filter={'hue-rotate(-130deg)'} />
                    <Text letterSpacing={'widest'} lineHeight={'190%'} p={['4','16']} textAlign={'center'}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores itaque dicta et esse, quibusdam animi vel totam eum. Ipsum, maiores! Ab nobis numquam in ducimus, eos at error ad possimus.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium libero adipisci, hic natus quod voluptate laboriosam suscipit dignissimos delectus temporibus nostrum optio rerum aliquam dicta accusantium perferendis id fuga. Excepturi.
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti repellat quis nisi excepturi facere error rem, vero quos animi iure numquam distinctio amet beatae commodi reprehenderit minus saepe consequatur doloremque.

                    </Text>
                </Stack>
            </Container>

        </Box>
    )
}

const MyCarousel = () => {
    return (
        <Carousel
            autoPlay
            infiniteLoop
            interval={1000}
            showStatus={false}
            showArrows={false}
            showThumbs={false}
        >
            <Box w='full' h={'100vh'}>
                <Image src={img1} />
                <Heading bgColor={'blackAlpha.600'} color={'white'} {...headingOptions} top={'50%'}>
                    Watch The Future
                </Heading>
            </Box>
            <Box w='full' h={'100vh'}>
                <Image src={img2} />
                <Heading bgColor={'whiteAlpha.900'} color={'black'} {...headingOptions} top={['50%','30%']}>
                    Future is Gaming
                </Heading>
            </Box>
            <Box w='full' h={'100vh'}>
                <Image src={img3} />
                <Heading bgColor={'whiteAlpha.600'} color={'black'} {...headingOptions} top={['50%','30%']}>
                    Gaming on Console
                </Heading>
            </Box>
            <Box w='full' h={'100vh'}>
                <Image src={img4} />
                <Heading bgColor={'whiteAlpha.600'} color={'black'} {...headingOptions} top={['50%','29%']}>
                    Night Life is Cool
                </Heading>
            </Box>
        </Carousel>)
}
export default Home
