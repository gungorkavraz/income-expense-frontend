import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { ToastContainer, Zoom } from 'react-toastify';

export default function HomePage() {
  return (
    <Box justify='center' align='center'>
      <Text fontSize={'2xl'}>Hoşgeldiniz..</Text>
      <ToastContainer
        position='bottom-left'
        transition={Zoom}
        theme='colored'
        pauseOnFocusLoss={false}
      />
    </Box>
  );
}
