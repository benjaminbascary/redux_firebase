import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { Header } from './Header';
import { useUserAuth } from '../contexts/userAuthContext'
import { MyUserType } from '../types/myUserType';
import { IssueType } from '../types/issueType';
import { AddIssueForm } from './AddIssueForm';

export const Home = (): JSX.Element => {

  const { user } = useUserAuth();
  
  return (
  <Box>
    <Header />
    <AddIssueForm user={user} />
  </Box>

  )
}


