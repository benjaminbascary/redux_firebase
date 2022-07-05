import { Box, Divider } from '@chakra-ui/react';
import React from 'react'
import { Header } from './Header';
import { useUserAuth } from '../contexts/userAuthContext'

export const Home = () => {

  const {user} = useUserAuth();
  
  return (
  <Box>
    <Header />
  </Box>

  )
}
