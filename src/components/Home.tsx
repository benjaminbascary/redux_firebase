import { Box } from '@chakra-ui/react';
import React from 'react'
import { Header } from './Header';
import { useUserAuth } from '../contexts/userAuthContext'

export const Home = () => {

  const { user } = useUserAuth();
  console.log(user)
  return (
  <Box>
    <Header />
  </Box>

  )
}
